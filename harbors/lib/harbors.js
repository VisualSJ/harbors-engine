window.h = (function(){

    var gameCanvas;
    //延迟运行的数组
    var task = [];
    //初始化执行的自定义任务列表
    var customInit = [];

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
        if(!selector)
            return harbors.canvas;

        var str = selector.substr(0, 1);
        var name = selector.substr(1);

        if(baseSelect[str])
            return baseSelect[str](name);

        return null;
    };
    var baseSelect = {
        "#": function(name){  return elemManager.idToElem[name]; },
        "@": function(name){ return elemManager.createNode(name); },
        "!": function(name){ return elemManager.createElem(name); }
    };

    /**
     * 打印log信息到页面上
     */
    harbors.log = function(){};

    /**
     * 延迟运行函数，传入单位为毫秒
     * @param {Function} callback
     * @param {Number} delayTime
     */
    harbors.delay = function(callback, delayTime){
        var delayItem = {
            time: loop.line + delayTime,
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
        opt.debug && ( options.debug = opt.debug );
    };

    harbors.option = options;

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

        if(options.adaptive === 1) {
            viewManager.full(gameCanvas);
        }else if(options.adaptive === 2){
            viewManager.width(gameCanvas);
        }else if(options.adaptive === 3){
            viewManager.height(gameCanvas);
        }else if(options.adaptive === 4){
            viewManager.min(gameCanvas);
        }else if(options.adaptive === 5){
            viewManager.max(gameCanvas);
        }
    };

    /**
     * 初始化引擎
     */
    harbors.init = function(callback){
        //定义h.canvas画板对象
        gameCanvas = document.getElementById(options.id);
        harbors.canvas = harbors("@block");
        harbors.canvas.style.width = gameCanvas.width;
        harbors.canvas.style.height = gameCanvas.height;
        harbors.canvas.cache = gameCanvas;
        harbors.canvas.id = "canvas";
        harbors.canvas.active = true;

        //初始化配置
        options.initOption();

        //开始主循环
        loop.start(function(dt){
            //查找任务队列
            while(task[0] && task[0].time < loop.line){
                task.shift().callback();
            }
            var drawNum = drawManager.parse(harbors.canvas, drawManager.drawer.ctx(gameCanvas));
            harbors._getDebugInfo(task.length, drawNum);
        });

        eventManager.init();

        customInit.forEach(function(item){
            item();
        });

        typeof callback === "function" && callback();
    };

    harbors.addInitTask = function(func){
        if(typeof func === 'function')
            customInit.push(func);
    };

    ////////////////////
    //以下为私有接口//
    ////////////////////

    //传递每次循环的具体信息的hack接口
    harbors._getDebugInfo = function(){};

    return harbors;
})();