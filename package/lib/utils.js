const fs = require('fs');
const {
    isObject,
    makePrototype
} = require('./helpers');
const CTRL_FOLDER = `${process.cwd()}/controllers/`;

makePrototype()

/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
hasControllersFolder = function() {
    if (!fs.existsSync(CTRL_FOLDER)) {
        throw Error("The controllers folder not exist inside root project.");
    }
}

/**
 * @description Load the controller(Class) from controllers folder
 * @returns The controller class or false if no controller found
 */
loadController = function(controllerName) {
    let ctrl = findController(controllerName, getAllControllers(CTRL_FOLDER));
    let ctrlClass = require(ctrl);
    if (!ctrlClass) {
        throw Error();
    }

    return {
        ctrl: getByTypeClass(ctrlClass, controllerName),
        method: getMethodName(controllerName)
    };
}

var getByTypeClass = function(cls, name) {
    return isObject(cls) === true ? cls[String(getName(name)).capitalize()]: cls;
}

var findController = function(ctrlName, controllers) {
    let ctrl = controllers.find(function(controller) {
        return getName(controller.name) === getName(ctrlName);
    });
    if (!ctrl) {
        throw Error("No controller named " + ctrlName + " was found");
    }
    return ctrl.path;
}

var getName = function(fullCtrlName) {
    try {
        return fullCtrlName.split('::')[0].trim().toLowerCase();
    } catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
}

var getMethodName = function(fullCtrlName) {
    try {
        return fullCtrlName.split('::')[1].trim().toLowerCase();
    } catch (error) {
        throw Error("The controller " + fullCtrlName + " has a invalid name");
    }
}


var makeFileName = function(file) {
    return file.split('.')[0].trim().toLowerCase();
}

// List all files in a directory in Node.js recursively in a synchronous fashion
//https://gist.github.com/kethinov/6658166#gistcomment-1603591
var getAllControllers = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = getAllControllers(dir + '/' + file, filelist);
        } else {
            filelist.push({
                name: makeFileName(file),
                path: dir + '/' + file
            });
        }
    });
    return filelist;
};

module.exports = {
    hasControllersFolder,
    loadController,
    getName
}