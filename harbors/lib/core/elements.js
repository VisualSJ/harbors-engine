define(function(require, exports, module){

    //定义元素元素列表
    var define = {
        node: require('../elem/node'),
        block: require('../elem/block'),
        texture: require('../elem/texture')
    };

    //元素管理器
    //id对应的元素
    exports.idToElem = {};

    exports.create = function(name){
        var elem = define[name];

        var id = "";
        elem.__defineGetter__("id", function(){
            return id;
        });
        elem.__defineSetter__("id", function(a){
            a = a.toString();
            if(a !== ""){
                exports.idToElem[a] = elem;
            }else{
                if(exports.idToElem[a])
                    delete exports.idToElem[a];
            }
            id = a;
        });

        return elem ? new elem : null;
    }
});