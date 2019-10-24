"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interfances_1 = require("./interfances");
const utils_1 = require("./utils");
/**
 * @description Class that is responsible for creating the application, registering routes with their controllers.
 */
class Server {
    /**
     *
     * @param {Express} ExpressApp
     */
    constructor() {
        this.currentControllers = [];
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
            let ctrlName = utils_1.getMethodName(controller);
            let Controller = this.getOrCreateController(controller);
            //Check if the controller has the method
            if (typeof Controller[ctrlName] !== 'function') {
                throw Error("The method " + ctrlName +
                    " was not found inside " +
                    utils_1.getName(controller) +
                    ".controller.js");
            }
            this.app[method](path, Controller[ctrlName]);
            return this;
        }
        catch (error) {
            throw error;
        }
    }
    getOrCreateController(fullControllerName) {
        let ctrlName = utils_1.getName(fullControllerName); //Get the controller name.
        //Find the controller with they name.
        let controller = this.currentControllers.find((ctrl) => utils_1.getName(ctrl.name) === ctrlName);
        if (!controller) {
            //We have no load this controller, so let's load it
            let loadedController = utils_1.loadController(fullControllerName);
            let controllerClass = new loadedController.ctrl();
            this.currentControllers.push({
                cls: controllerClass,
                name: ctrlName
            });
            return controllerClass;
        }
        return controller.cls; //Here we have the controller, so return it
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