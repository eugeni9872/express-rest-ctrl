const fs = require('fs')
const CTRL_FOLDER = `${process.cwd()}/controllers/`

/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
hasControllersFolder = function() {
    if(!fs.existsSync(CTRL_FOLDER)){
        throw Error("The controllers folder not exist inside root project.")
    }
}

/**
 * @description Load the controller(Class) from controllers folder
 * @returns The controller class or false if no controller found
 */
loadController = function(controllerName) {
       let ctrl = findController(controllerName, getAllControllers(CTRL_FOLDER))
       let ctrlClass = require(ctrl)
       return {ctrl: ctrlClass, method: getMethodName(controllerName)}
}

var findController = function(ctrlName, controllers){
    let ctrl = controllers.find(function(controller){
        return getName(controller.name) === getName(ctrlName)
    })
    if(!ctrl){
        throw Error("No controller named " + ctrlName + " was found")
    }
    return ctrl.path
}

var getName = function(fullCtrlName) {
    try {
        return fullCtrlName.split('::')[0].trim().toLowerCase()
    } catch (error) {
        throw Error("No controller named " + fullCtrlName + " was found")
    }
}

var getMethodName = function(fullCtrlName) {
    try {
        return fullCtrlName.split('::')[1].trim().toLowerCase()
    } catch (error) {
        throw Error("No controller named " + fullCtrlName + " was found")
    }
}


var makeFileName = function(file){
    return file.split('.')[0].trim().toLowerCase()
}

// List all files in a directory in Node.js recursively in a synchronous fashion
//https://gist.github.com/kethinov/6658166#gistcomment-1603591
var getAllControllers = function(dir, filelist) {
    var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push({name: makeFileName(file), path:dir + '/'+ file});
      }
    });
    return filelist;
  };

module.exports = {
    hasControllersFolder,
    loadController,
    getName
}