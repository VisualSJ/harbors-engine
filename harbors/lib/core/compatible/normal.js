define(function(require, exports, module){

    //////////
    //Chrome//
    //////////

    exports.visibleWidth = function(){
        return document.documentElement.clientWidth;
    };
    exports.visibleHeight = function(){
        return document.documentElement.clientHeight;
    };

});