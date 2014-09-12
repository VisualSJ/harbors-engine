define(function(require, exports){

    const options = require("./options");

    var timer = null;

    var frameTime,//每一帧的间隔时间
        prevTime,//上一帧的开始绘制时间
        thisTime;//当前帧的开始绘制时间

    exports.init = function(){
        frameTime = 1000 / options.fps;
    };

    exports.init();


    var num = 0;
    setInterval(function(){
        console.log(num);
        num = 0;
    }, 1000);

    exports.start = function(callback){
        prevTime = new Date();
        var loop = function(){
            num++;
            thisTime = new Date();
            var dt = (thisTime - prevTime) / frameTime;
            prevTime = thisTime;
            callback(dt);
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

        loop();
    };

});