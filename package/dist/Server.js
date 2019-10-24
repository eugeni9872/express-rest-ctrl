"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const interfances_1 = require("./interfances");
/**
 * @description Class that is responsible for creating the application, registering routes with their controllers.
 */
class Server {
    /**
     *
     * @param {Express} ExpressApp
     */
    constructor() {
        this.METHODS = Server.METHODS;
        utils_1.hasControllersFolder(); // Will throw a error if no folder
        this.app = express_1.default();
    }
    /**
     * @description Add a new route, with its controller and configuration
     * @param {String} path The route path
     * @param {String} ControllerName The name of controller class
     * @returns Server
     */
    addRoute({ path, controller, method }) {
        try {
            if (!path || !controller) {
                throw Error("The path or controller parameters are not defined");
            }
            let ctx = utils_1.loadController(controller);
            let Controller = new ctx.ctrl();
            if (Controller.config) { // If the controller has config object to apply it
                let { config } = Controller;
                if (config.middleware) { //See if middleware is set
                    if (Array.isArray(config.middleware) || typeof config.middleware === 'function') {
                        this.app.use(path, config.middleware);
                    }
                }
            }
            //Check if the controller has the method
            if (typeof Controller[ctx.method] !== 'function') {
                throw Error("The method " + ctx.method
                    + " was not found inside "
                    + utils_1.getName(controller)
                    + ".controller.js");
            }
            this.app[method](path, Controller[ctx.method]);
            return this;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * @param {number} [port=3001] The port for running the application
     */
    run(port = 3001) {
        this.app.listen(port, function () {
            console.log(`You server  run in: http://localhost:${port}`);
        });
        return this;
    }
    /**
     * @description Enable body json parser
     * @returns Server
     */
    enableJSON() {
        this.app.use(express_1.default.json());
        return this;
    }
    /**
     * @description Enable body form parser
     * @returns Server
     */
    enableFORM() {
        this.app.use(express_1.default.urlencoded());
        return this;
    }
    /**
     * @param {String} [path=null] The path where apply the middleware(if path is null will apply to all routes)
     * @param {Function} middleware The middleware function.
     * @returns Server
     */
    setMiddleware(path, middleware) {
        if (typeof middleware !== 'function') {
            throw Error("The middleware is not a function");
        }
        if (!path) {
            this.app.use(middleware);
        }
        else {
            this.app.use(path, middleware);
        }
        return this;
    }
    /**
     * @description Return the express instance
     */
    getApp() {
        return this.app;
    }
}
Server.METHODS = interfances_1.HttpMethods;
exports.default = Server;
//# sourceMappingURL=Server.js.map