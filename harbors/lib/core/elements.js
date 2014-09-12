define(function(require, exports, module){

    //定义元素元素列表
    exports.define = {
        node: require('../elem/node'),
        block: require('../elem/block')
    };

    //元素管理器
    //id对应的元素
    exports.idToElem = {};

    //class对应的元素
    exports.classToElem = {};

    //所有在canvas中的元素
    exports.elem = {};
});