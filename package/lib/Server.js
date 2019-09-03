const express = require('express')

//Later we check if the controlelr has this methods
//if the class implements this methods, we register the route
// for example if the class has only get and post method, the resource will response only for post and get requests
let METHODS = ['put', 'post','delete', 'get']  

/**
 * @description Class that is responsible for creating the application, registering routes with their controllers.
 */
class Server{

    /**
     * @param {String} path The route path
     * @param {Class} Controller The class that control this router
     * @param {Object} config Object with config options
     * @returns Server
     */
    addRoute(path, Controller, config={}){
        if(!this.app) {
            throw Error("The app was not created, call create method for initialize the app")
        }
        
        try {
            let ctrl = new Controller()
            if(ctrl.config) { // If the controller has config object to apply it
                let {config} = ctrl;
                //See if middleware is set
                if(config.middleware) {
                    if(Array.isArray(config.middleware)) {
                        this.app.use(path, config.middleware)
                    }
                }
            }

            METHODS.forEach((method) => {
                if(ctrl[method]){
                    this.app[method](path, ctrl[method]) // Registry the path, method and they controller
                }
            })
            return this;
        } catch (error) {
            throw error;
        }
    }


    /**
     * @param {Express} app - Express instance
     * @returns Main
     */
    setupApp(app){
        if(!app){
            throw Error("No app instance found")
        }
        this.app = app;
        return this;
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
     * @description Enable body json parse
     */
    enableJSON(){
        this.app.use(express.json())
        return this;
    }


    /**
     * @description Enable body html parse
     */
    enableFORM(){
        this.app.use(express.urlencoded())
    }

    /**
     * @description Create the main app.
     */
    static create(){
        let app = express()
        let _Server = new Server()
        _Server.setupApp(app)
        return _Server
    }
}

module.exports = Server;