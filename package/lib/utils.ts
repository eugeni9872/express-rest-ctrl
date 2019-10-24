const fs = require('fs');
import {isObject} from './helpers';
import './string.extensions';
import {Express} from 'express'
import {PathFile, AllControllersParams, GetOrCreate} from './interfances';
const CTRL_FOLDER = `${process.cwd()}/controllers/`;



/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
const hasControllersFolder = function() {
    if (!fs.existsSync(CTRL_FOLDER)) {
        throw Error("The controllers folder not exist inside root project.");
    }
}

/**
 * @description Load the controller(Class) from controllers folder
 * @returns The controller class or false if no controller found
 */
const loadController = function(controllerName : string) {
    let ctrl : string = findController(controllerName, getAllControllers(CTRL_FOLDER, []));
    let ctrlClass = require(ctrl);
    if (!ctrlClass) {
        throw Error();
    }

    return {
        ctrl: getByTypeClass(ctrlClass, controllerName),
        method: getMethodName(controllerName)
    };
}

var getByTypeClass = function(cls: any, name: string ) {
    let className = String(getName(name))
    return isObject(cls) === true ? cls[className.capitalize()]: cls;
}

var findController = function(ctrlName : string, controllers: Array<PathFile>) : string {
    let ctrl = controllers.find(function(controller) {
        return getName(controller.name) === getName(ctrlName);
    });
    if (!ctrl) {
        throw Error("No controller named " + ctrlName + " was found");
    }
    return ctrl.path || '';
}

var getName = function(fullCtrlName: string) {
    try {
        return fullCtrlName.split('::')[0].trim().toLowerCase();
    } catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
}

var getMethodName = function(fullCtrlName : string ) {
    try {
        return fullCtrlName.split('::')[1].trim().toLowerCase();
    } catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
}


var makeFileName = function(file : string ) {
    return file.split('.')[0].trim().toLowerCase();
}

// List all files in a directory in Node.js recursively in a synchronous fashion
//https://gist.github.com/kethinov/6658166#gistcomment-1603591
var getAllControllers = function(dir: string, fileList: Array<[any]>): Array<any> {
    var fs: any = fs || require('fs');
    var files = fs.readdirSync(dir);
    fileList  = fileList || []
    files.forEach(function(file : string) {
        let f:string = file;
        let fullPath: string = dir + '/' + file
        if (fs.statSync(fullPath).isDirectory()) {
            fileList = getAllControllers(fullPath, fileList);
        } else {
            let pathFile : any = {name: makeFileName(f), path: fullPath}
            fileList.push(pathFile);
        }
    });
    return fileList;
};

//TODO: Find the best way to declare the middleware
var setControllerConfig = function(Controller: GetOrCreate, app: Express) {
    if(Controller.config) { // If the controller has config object to apply it
        let {config} = Controller;
        if(config.middleware) { //See if middleware is set
            if(Array.isArray(config.middleware) || typeof config.middleware === 'function') {
                // app.use(path, config.middleware)
            }
        }
    }

    return app;
}



export {
    hasControllersFolder,
    loadController,
    getMethodName,
    getName
} 
