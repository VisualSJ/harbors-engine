(function(utils){

    utils.inherit = function(ctor, superCtor){
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false
            }
        });
    }

})(harbors.utils = harbors.utils || {});