"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.isObject = function (item) {
    return (typeof item === 'object' && Array.isArray(item) === false);
};
class ControllerClass {
    constructor(params) { }
}
exports.ControllerClass = ControllerClass;
/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
exports.hasControllersFolder = function (CTRL_FOLDER) {
    if (!fs.existsSync(CTRL_FOLDER)) {
        throw Error("The controllers folder not exist inside root project.");
    }
};
exports.log = console.log;
//# sourceMappingURL=helpers.js.map