define(function(require, exports, module){

    //定义元素元素列表
    exports.define = {
        node: require('../elem/node'),
        block: require('../elem/block')
    };

    //元素管理器
    //插入canvas后的元素将被存放在这里
    exports.elemTrees = [];
});