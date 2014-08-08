var harbors;
(function(harbors){

    harbors.bodys = {};

    harbors.run = (function(){

        return function(callback, options){

            harbors.bodys[options["id"]] = new harbors.Class.body(options["id"]);

            callback();
        };
    })();

    harbors.create = function(name){
        if(harbors.Class[name]){
            return new harbors.Class[name]();
        }
    };

})(harbors = harbors || {});
