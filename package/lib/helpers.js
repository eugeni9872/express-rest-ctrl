var isObject = function(item){
    return (typeof item === 'object' && Array.isArray(item) === false)
}

var makePrototype = function() {
    String.prototype.capitalize = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
      }
}


module.exports = {
    isObject: isObject,
    makePrototype:makePrototype,
    log: console.log
}