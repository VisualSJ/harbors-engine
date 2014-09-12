define(function(require, exports, module){

    module.exports = function(ctor){
        var prototypes = Array.prototype.slice.call(arguments, 1);
        prototypes.forEach(function(proto){
            for(var p in proto.prototype){
                if(!ctor.prototype[p]){
                    ctor.prototype[p] = proto.prototype[p];
                }
            }
        });
    };
});