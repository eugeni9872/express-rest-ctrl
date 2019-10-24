"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const helpers_1 = require("./helpers");
require("./string.extensions");
const CTRL_FOLDER = `${process.cwd()}/controllers/`;
/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
const hasControllersFolder = function () {
    if (!fs.existsSync(CTRL_FOLDER)) {
        throw Error("The controllers folder not exist inside root project.");
    }
};
exports.hasControllersFolder = hasControllersFolder;
/**
 * @description Load the controller(Class) from controllers folder
 * @returns The controller class or false if no controller found
 */
const loadController = function (controllerName) {
    let ctrl = findController(controllerName, getAllControllers(CTRL_FOLDER, []));
    let ctrlClass = require(ctrl);
    if (!ctrlClass) {
        throw Error();
    }
    return {
        ctrl: getByTypeClass(ctrlClass, controllerName),
        method: getMethodName(controllerName)
    };
};
exports.loadController = loadController;
var getByTypeClass = function (cls, name) {
    let className = String(getName(name));
    return helpers_1.isObject(cls) === true ? cls[className.capitalize()] : cls;
};
var findController = function (ctrlName, controllers) {
    let ctrl = controllers.find(function (controller) {
        return getName(controller.name) === getName(ctrlName);
    });
    if (!ctrl) {
        throw Error("No controller named " + ctrlName + " was found");
    }
    return ctrl.path || '';
};
var getName = function (fullCtrlName) {
    try {
        return fullCtrlName.split('::')[0].trim().toLowerCase();
    }
    catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
};
exports.getName = getName;
var getMethodName = function (fullCtrlName) {
    try {
        return fullCtrlName.split('::')[1].trim().toLowerCase();
    }
    catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
};
exports.getMethodName = getMethodName;
var makeFileName = function (file) {
    return file.split('.')[0].trim().toLowerCase();
};
// List all files in a directory in Node.js recursively in a synchronous fashion
//https://gist.github.com/kethinov/6658166#gistcomment-1603591
var getAllControllers = function (dir, fileList) {
    var fs = fs || require('fs');
    var files = fs.readdirSync(dir);
    fileList = fileList || [];
    files.forEach(function (file) {
        let f = file;
        let fullPath = dir + '/' + file;
        if (fs.statSync(fullPath).isDirectory()) {
            fileList = getAllControllers(fullPath, fileList);
        }
        else {
            let pathFile = { name: makeFileName(f), path: fullPath };
            fileList.push(pathFile);
        }
    });
    return fileList;
};
//TODO: Find the best way to declare the middleware
var setControllerConfig = function (Controller, app) {
    if (Controller.config) { // If the controller has config object to apply it
        let { config } = Controller;
        if (config.middleware) { //See if middleware is set
            if (Array.isArray(config.middleware) || typeof config.middleware === 'function') {
                // app.use(path, config.middleware)
            }
        }
    }
    return app;
};
//# sourceMappingURL=utils.js.map