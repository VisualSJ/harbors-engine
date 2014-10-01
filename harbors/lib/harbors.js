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
    var define = function(selector){
        if(!selector)
            return define.canvas;

        var str = selector.substr(0, 1);

        if(baseSelect[str]){
            arguments[0] = selector.substr(1);
            return baseSelect[str].apply(this, arguments);
        }else if(selector === 'canvas'){
            return define.canvas;
        }

        return null;
    };
    var baseSelect = {
        "#": function(){  return HSElementManager.getNodeWithId.apply(this, arguments); },
        "@": function(){ return HSElementManager.createNode.apply(this, arguments); }
    };

    //复制对象
    define.utils = HSUtils;
    define.options = HSOption;

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
            time: HSLoop.line + delayTime,
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
        opt.id && ( HSOption.id = opt.id );
        opt.debug && ( HSOption.debug = opt.debug );
    };

    /**
     * 自適應屏幕
     * @param {Number} mode
     */
    define.adaptive = function(mode){
        if(mode != null)
            HSOption.adaptive = mode;
        var style = {
            padding: 0,
            margin: 0,
            overflow: "hidden",
            height: HSOption.system.visibleSize.height + "px",
            width: HSOption.system.visibleSize.width + "px"
        };
        for(var p in style){
            document.body.style[p] = style[p];
        }

        if(HSOption.adaptive === 1) {
            HSViewManager.full(gameCanvas);
        }else if(HSOption.adaptive === 2){
            HSViewManager.width(gameCanvas);
        }else if(HSOption.adaptive === 3){
            HSViewManager.height(gameCanvas);
        }else if(HSOption.adaptive === 4){
            HSViewManager.min(gameCanvas);
        }else if(HSOption.adaptive === 5){
            HSViewManager.max(gameCanvas);
        }
    };

    /**
     * 初始化引擎
     */
    define.init = function(callback){
        //定义h.canvas画板对象
        gameCanvas = document.getElementById(HSOption.id);
        define.canvas = new HSBlockElement();
        define.canvas.style.width = gameCanvas.width;
        define.canvas.style.height = gameCanvas.height;
        define.canvas.cache = gameCanvas;
        define.canvas.active = true;

        //初始化配置
        HSOption.setCanvas(gameCanvas);
        HSOption.initOption();

        //开始主循环
        HSLoop.start(function(dt){
            //查找任务队列
            while(task[0] && task[0].time < HSLoop.line){
                task.shift().callback();
            }
            var drawNum = HSDrawManager.parse(define.canvas, HSDrawManager.drawer.ctx(gameCanvas));
            define._getDebugInfo(task.length, drawNum);
        });

        HSEventManager.init();

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