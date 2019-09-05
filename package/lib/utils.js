const fs = require('fs')

const CTRL_FOLDER = `${process.cwd()}/controllers`

exports.hasControllersFolder = function() {
    if(!fs.existsSync(process.cwd() + '/controllers')){
        throw Error("The controllers folder not exist inside root project.")
    }
}

exports.loadController = function(ControllerName) {
    try {
        let ctrl =  require(`${CTRL_FOLDER}/${ControllerName}.controller.js`)
        return ctrl
    } catch(ModuleError){
        return false
    }
}