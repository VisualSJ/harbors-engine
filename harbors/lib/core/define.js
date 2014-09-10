define(function(require, exports, module){

    var elements = require("./elements");

    /**
     * 定义基础选择以及创建器
     *
     * @example
     * h("node") - 创建一个node元素，返回元素
     * h(".node") - 查找所有class为node的元素，返回元素数组
     * h("#node") - 查找id为node的元素，id不能重复，如果重复，则取第一个id
     *
     * @param {string} selector
     *
     * @return {array|elem}
     */
    module.exports = function(selector){

        var str = selector.substr(0, 1);

        switch(str){
            case "#":
                break;
            case ".":
                break;
            default:
                return create(selector);
        }
    };

    var create = function(name){
        var elem = elements.define[name];
        return elem ? new elem : null;
    };

    var getId = function(){

    };

});