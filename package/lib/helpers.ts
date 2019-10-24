const fs = require('fs');
export const isObject = function(item : object) : boolean {
    return (typeof item === 'object' && Array.isArray(item) === false);
}

interface Ctrl {
  middleware: () =>void;
}

export class ControllerClass{
  constructor(params: Ctrl){}
}
/**
 * @description Check if the controllers folder has been create
 * @throws
 * @returns void
 */
export const hasControllersFolder = function(CTRL_FOLDER: string) {
  if (!fs.existsSync(CTRL_FOLDER)) {
      throw Error("The controllers folder not exist inside root project.");
  }
}

export const log = console.log;

