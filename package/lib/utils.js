const fs = require('fs')
const CTRL_FOLDER = `${process.cwd()}/controllers`


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
loadController = function(ControllerName) {
    try {
        let ctrl =  require(`${CTRL_FOLDER}/${ControllerName}.controller.js`)
        return ctrl
    } catch(ModuleError){
        throw Error("No controller " + ControllerName +' found')
    }
}

module.exports = {
    hasControllersFolder,
    loadController
}