const fs = require('fs')
const CTRL_FOLDER = `${process.cwd()}/controllers/`

/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
hasControllersFolder = function() {
    if(!fs.existsSync(process.cwd() + '/controllers')){
        throw Error("The controllers folder not exist inside root project.")
    }
}

/**
 * @description Load the controller(Class) from controllers folder
 * @returns The controller class or false if no controller found
 */
loadController = function(controllerName) {
    try {
        let ctrl = undefined; //Controller to return
        let controllers = walkSync(CTRL_FOLDER) //Get all files and they path from controller folder.

        controllers.forEach(function(controller) {
            let ctrlName = controller.name.split('.')[0] // Name of controller
            if(controllerName.trim().toLowerCase() === ctrlName.trim().toLowerCase()) {//Math controller
                ctrl =  require(controller.path+controller.name)
            }
        });

        if(typeof ctrl === 'undefined'){
            throw Error() //Throw errro if no controller found
        }
        return ctrl // Return the controller

    } catch(ModuleError){
        throw Error("No controller " + controllerName +' found')
    }
}


// List all files in a directory in Node.js recursively in a synchronous fashion
//https://gist.github.com/kethinov/6658166#gistcomment-1603591
var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push({name: file, path:dir + '/'});
      }
    });
    return filelist;
  };

module.exports = {
    hasControllersFolder,
    loadController
}