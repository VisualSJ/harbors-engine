define(function(require, exports, module){

    const elements = require("./elements");
    const options = require("./options");
    const canvas = require('../draw/canvas');
    const loop = require("./loop");

    const drawManager = require("../draw/manager");

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
     * @return {*}
     */
    var harbors = function(selector){

        var str = selector.substr(0, 1);

        switch(str){
            case "#":
                break;
            case ".":
                break;
            default:
                return elements.create(selector);
        }
    };

    /**
     * 重置设置选项等
     * @param opt
     */
    harbors.options = function(opt){
        opt.id && ( options.id = opt.id );
    };

    var gameCanvas = document.getElementById(options.id);
    harbors.canvas = harbors("block");
    harbors.canvas.style.width = gameCanvas.width;
    harbors.canvas.style.height = gameCanvas.height;
    harbors.canvas.cache = gameCanvas;

    loop.start(function(dt){
        drawManager.parse(harbors.canvas, canvas.ctx(gameCanvas));
    });

    module.exports = harbors;

});