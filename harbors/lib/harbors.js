window.h = (function(){

    var viewManager = harbors.viewManager;
    var drawManager = harbors.drawManager;
    var eventManager = harbors.eventManager;

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
    var define = function(selector){
        if(!selector)
            return define.canvas;

        var str = selector.substr(0, 1);
        var name = selector.substr(1);

        if(baseSelect[str])
            return baseSelect[str](name);

        return null;
    };
    var baseSelect = {
        "#": function(name){  return harbors.elemManager.getNodeWithId(name); },
        "@": function(name){ return harbors.elemManager.createNode(name); }
    };

    //复制对象
    for(var p in harbors){
        define[p] = harbors[p];
    }

    /**
     * 打印log信息到页面上
     */
    define.log = function(){};

    /**
     * 延迟运行函数，传入单位为毫秒
     * @param {Function} callback
     * @param {Number} delayTime
     */
    define.delay = function(callback, delayTime){
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
    define.interval = function(callback, delayTime){
        var fn = function(){
            callback();
            define.interval(callback, delayTime);
        };
        fn.ctor = callback;
        define.delay(fn, delayTime);
    };

    /**
     * 傳入正在隊列中的callback函數
     * 將他從隊列中刪除
     * @param {Function} callback
     */
    define.clearDelay = function(callback){
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
    define.setOption = function(opt){
        opt.id && ( harbors.options.id = opt.id );
        opt.debug && ( harbors.options.debug = opt.debug );
    };

    /**
     * 自適應屏幕
     * @param {Number} mode
     */
    define.adaptive = function(mode){
        if(mode != null)
            harbors.options.adaptive = mode;
        var style = {
            padding: 0,
            margin: 0,
            overflow: "hidden",
            height: harbors.options.system.visibleSize.height + "px",
            width: harbors.options.system.visibleSize.width + "px"
        };
        for(var p in style){
            document.body.style[p] = style[p];
        }

        if(harbors.options.adaptive === 1) {
            viewManager.full(gameCanvas);
        }else if(harbors.options.adaptive === 2){
            viewManager.width(gameCanvas);
        }else if(harbors.options.adaptive === 3){
            viewManager.height(gameCanvas);
        }else if(harbors.options.adaptive === 4){
            viewManager.min(gameCanvas);
        }else if(harbors.options.adaptive === 5){
            viewManager.max(gameCanvas);
        }
    };

    /**
     * 初始化引擎
     */
    define.init = function(callback){
        //定义h.canvas画板对象
        gameCanvas = document.getElementById(harbors.options.id);
        define.canvas = define("@block");
        define.canvas.style.width = gameCanvas.width;
        define.canvas.style.height = gameCanvas.height;
        define.canvas.cache = gameCanvas;
        define.canvas.id = "canvas";
        define.canvas.active = true;

        //初始化配置
        harbors.options.initOption();

        //开始主循环
        loop.start(function(dt){
            //查找任务队列
            while(task[0] && task[0].time < loop.line){
                task.shift().callback();
            }
            var drawNum = drawManager.parse(define.canvas, drawManager.drawer.ctx(gameCanvas));
            define._getDebugInfo(task.length, drawNum);
        });

        eventManager.init();

        customInit.forEach(function(item){
            item(callback);
        });

        typeof callback === "function" && callback();
    };

    define.addInitTask = function(func){
        if(typeof func === 'function')
            customInit.push(func);
    };

    ////////////////////
    //以下为私有接口//
    ////////////////////

    //传递每次循环的具体信息的hack接口
    define._getDebugInfo = function(){};

    return define;
})();