define(function(require, exports){

    const options = require("./options");

    var timer = null;

    //引擎启动以来的时间轴
    var line = 0;

    var frameTime,//每一帧的间隔时间
        delayTime,//当前帧与上一帧的间隔时间
        prevTime,//上一帧的开始绘制时间
        thisTime;//当前帧的开始绘制时间

    /**
     * 初始化loop需要的数值
     * @function
     */
    exports.init = function(){
        delayTime = 0;
        frameTime = 1000 / options.fps;
    };
    //执行初始化（以后如需更改配置等，需要手动执行一次）
    exports.init();

    /**
     * 主循环
     * 负责计算当前帧与下一帧的时间，以及计算时间比率、调度回调函数等
     * @function
     * @param callback
     */
    exports.start = function(callback){
        //第一帧，初始化上一帧时间
        prevTime = new Date();

        var loop = function(){
            //记录当前时间
            thisTime = new Date();
            delayTime = thisTime - prevTime;
            //更新时间轴
            line += delayTime;
            //计算当前帧与上一帧的间隔与正常间隔的比例
            var dt = delayTime / frameTime;
            //时间交替
            prevTime = thisTime;
            //执行循环任务
            callback(dt);
            //计算下一帧任务的开始时间
            var time = new Date();
            var interval = time - thisTime;
            if(interval > frameTime){
                timer = setTimeout(function(){
                    loop();
                }, 0);
            }else{
                timer = setTimeout(function(){
                    loop();
                }, frameTime - interval);
            }
        };

        //启动循环
        loop();
    };

    /**
     * 获取引擎运行时间轴
     * @returns {number}
     */
    exports.getLine = function(){
        return line;
    };

});