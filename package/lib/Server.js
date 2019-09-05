const express = require('express')
const {hasControllersFolder, loadController} = require('./utils')
//Later we check if the controlelr has this methods
//if the class implements this methods, we register the route
// for example if the class has only get and post method, the resource will response only for post and get requests
let METHODS = ['get','post', 'put', 'delete', 'connect', 'options', 'trace', 'path', 'head']

/**
 * @description Class that is responsible for creating the application, registering routes with their controllers.
 */
class Server{
    constructor(ExpressApp){
        this.app = ExpressApp;
        hasControllersFolder()
    }
    /**
     * @param {String} path The route path
     * @param {String} ControllerName The class that control this router
     * @param {Object} config Object with config options
     * @returns Server
     */
    addRoute(path, ControllerName, config={}){
        if(!this.app) {
            throw Error("The app was not created, call create method for initialize the app")
        }
        
        try {
            let Controller =  loadController(ControllerName)
            if(!Controller) {
                throw Error("The " + Controller  + " controller not found inside controllers folder")
            }
            Controller = new Controller()
            if(Controller.config) { // If the controller has config object to apply it
                let {config} = Controller;
                //See if middleware is set
                if(config.middleware) {
                    if(Array.isArray(config.middleware) || typeof config.middleware === 'function') {
                        this.app.use(path, config.middleware)
                    }
                }
            }

            METHODS.forEach((method) => {
                if(Controller[method]){
                    this.app[method](path, Controller[method]) // Registry the path, method and they controller
                }
            })
            return this;
        } catch (error) {
            throw error;
        }
    }



    /**
     * @param {Number} port The port for listen requests
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
     * @description Enable body html parser
     * @returns Server
     */
    enableFORM(){
        this.app.use(express.urlencoded())
        return this;
    }

    /**
     * @param {String} path
     * @param {Function} middleware
     * @returns Server
     */
    setMiddleware(path, middleware) {
        if(!path) {
            this.app.use(middleware)
        } else{
            this.app.use(path, middleware)
        }
        return this;
    }

    /**
     * @description Create the main app.
     */
    static create(){
        let app = express()
        let _Server = new Server(app)
        return _Server
    }
}

module.exports = Server;