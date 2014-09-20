define(function(require, exports, module){

    const elements = require("./elements");
    const options = require("./options");
    const event = require("./event");
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
        var name = selector.substr(1);

        switch(str){
            case "#"://id选择器
                return elements.idToElem[name];
                break;

            case "."://class选择器
                break;

            case "@"://创建元素
                return elements.create(name);
                break;

            case "$": //name选择器
                break;
        }
        return null;
    };

    //延迟运行的数组
    var task = [];

    /**
     * 延迟运行函数，传入单位为毫秒
     * @param {Function} callback
     * @param {Number} delayTime
     */
    harbors.delay = function(callback, delayTime){
        var delayItem = {
            time: loop.getLine() + delayTime,
            callback: callback
        };
        var length = task.length;
        for(var i=0; i<length; i++){
            if(task[i].time > delayItem.time){
                task.splice(i, 0, delayItem);
                return;
            }
        }
        task.push(delayItem);
    };

    /**
     * 间隔执行函数，传入单位为毫秒
     * @param {Function} callback
     * @param {Number} delayTime
     */
    harbors.interval = function(callback, delayTime){
        var fn = function(){
            callback();
            harbors.interval(callback, delayTime);
        };
        fn.ctor = callback;
        harbors.delay(fn, delayTime);
    };

    /**
     * 傳入正在隊列中的callback函數
     * 將他從隊列中刪除
     * @param {Function} callback
     */
    harbors.clearDelay = function(callback){
        for(var i=0; i<task.length; i++){
            if((task[i].callback.ctor || task[i].callback) === callback){
                task.splice(i, 1);
                break;
            }
        }
    };

    /**
     * 重置设置选项等
     * @param opt
     */
    harbors.setOption = function(opt){
        opt.id && ( options.id = opt.id );
    };
    //暴露配置信息
    harbors.option = options;

    //定义h.canvas画板对象
    var gameCanvas = document.getElementById(options.id);
    harbors.canvas = harbors("@block");
    harbors.canvas.style.width = gameCanvas.width;
    harbors.canvas.style.height = gameCanvas.height;
    harbors.canvas.cache = gameCanvas;
    harbors.canvas.id = "canvas";

    /**
     * 自適應屏幕
     * @param {Number} mode
     */
    harbors.adaptive = function(mode){
        if(mode != null)
            options.adaptive = mode;
        var style = {
            padding: 0,
            margin: 0,
            overflow: "hidden",
            height: options.system.visibleSize.height + "px",
            width: options.system.visibleSize.width + "px"
        };
        for(var p in style){
            document.body.style[p] = style[p];
        }
        if(options.adaptive === 1){
            gameCanvas.style.width =  options.system.visibleSize.width + "px";
            gameCanvas.style.height =  options.system.visibleSize.height + "px";
        }
        gameCanvas.changeInit && gameCanvas.changeInit();
    };

    //主循环
    loop.start(function(dt){
        //查找任务队列
        while(task[0] && task[0].time < loop.getLine()){
            task.shift().callback();
        }
        drawManager.parse(harbors.canvas, canvas.ctx(gameCanvas));
    });

    event.init();
    module.exports = harbors;

});