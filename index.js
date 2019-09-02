const express = require('express')

let METHODS = ['put', 'post','delete', 'get']

/**
 * Represents a book.
 * @constructor
 */
class Main{

    /**
     * 
     * @param {String} path - The route path
     * @param {*} Controller - The class that controll this router
     */
    addRoute(path, Controller){
        if(!this.app) {
            throw Error("The app was not created, call create method for initialize the app")
        }

        try {
            let ctrl = new Controller()
            METHODS.forEach((method) => {
                if(ctrl[method]){
                    this.app[method](path, ctrl[method])
                }
            })
            return this;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {Express} app - Express instance
     */
    setupApp(app){
        if(!app){
            throw Error("No app instance found")
        }
        this.app = app;
        return this;
    }

    /**
     * 
     * @param {Number} port The port for listen requests
     */
    runServer(port=3001) {
        this.app.listen(port, function(){
            console.log(`App run in ${port}`)
        })
        return this;
    }

    /**
     * @description Create the main app.
     */
    static create(){
        let app = express()
        let MainClass = new Main()
        MainClass.setupApp(app)
        return MainClass
    }
}

module.exports = Main;