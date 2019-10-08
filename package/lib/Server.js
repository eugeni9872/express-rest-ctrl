const express = require('express')
const {hasControllersFolder, loadController, getName} = require('./utils')


/**
 * @description Class that is responsible for creating the application, registering routes with their controllers.
 */
class Server{

    /**
     *
     * @param {Express} ExpressApp
     */
    constructor(ExpressApp){
        if(!ExpressApp) {
            throw Error("The app was not created, call create method for initialize the app")
        }
        this.app = ExpressApp;
        this.METHODS = Object.freeze({ 
            GET: 'get',
            POST: 'post',
            PUT: 'put',
            DELETE: 'delete',
            CONNECT: 'connect',
            OPTIONS: 'options',
            TRACE: 'trace',
            PATH: 'path',
            HEAD: 'head' 
        })
    }


    /**
     * @description Add a new route, with its controller and configuration
     * @param {String} path The route path
     * @param {String} ControllerName The name of controller class
     * @returns Server
     */
    addRoute(path, ControllerName, method='get'){
        try {
            let ctx = loadController(ControllerName)
            let Controller = new ctx.ctrl()
            if(Controller.config) { // If the controller has config object to apply it
                let {config} = Controller;
                if(config.middleware) { //See if middleware is set
                    if(Array.isArray(config.middleware) || typeof config.middleware === 'function') {
                        this.app.use(path, config.middleware)
                    }
                }
            }

            //Check if the controller has the method
            if(typeof Controller[ctx.method] !== 'function'){
                throw Error(
                    "The method " + ctx.method 
                    + " was not found inside "
                    + getName(ControllerName) 
                    + ".controller.js"
                )
            }
            this.app[method](path, Controller[ctx.method])
            return this;
        } catch (error) {
            throw error;
        }
    }



    /**
     * @param {number} [port=3001] The port for running the application
     */
    run(port=3001) {
        this.app.listen(port, function(){
            console.log(`App run in ${port}`)
        })
        return this;
    }


    /**
     * @description Enable body json parser
     * @returns Server
     */
    enableJSON(){
        this.app.use(express.json())
        return this;
    }


    /**
     * @description Enable body form parser
     * @returns Server
     */
    enableFORM(){
        this.app.use(express.urlencoded())
        return this;
    }

    /**
     * @param {String} [path=null] The path where apply the middleware(if path is null will apply to all routes)
     * @param {Function} middleware The middleware function.
     * @returns Server
     */
    setMiddleware(path, middleware) {

        if(typeof middleware !== 'function') {
            throw Error("The middleware is not a function")
        }

        if(!path) {
            this.app.use(middleware)
        } else{
            this.app.use(path, middleware)
        }
        return this;
    }


    /**
     * @description Return the express instance
     */
    getApp(){
        return this.app
    }

    /**
     * @description Create the main app.
     */
    static create(){
        hasControllersFolder() // Will throw a error if no folder
        let app = express()
        let _Server = new Server(app)
        return _Server
    }
}

module.exports = Server;