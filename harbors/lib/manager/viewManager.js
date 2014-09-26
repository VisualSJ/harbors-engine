var viewManager = (function(){

    /**
     * 屏幕适配方案
     * @constructor
     */
    var ViewManager = function(){};

    ViewManager.prototype.full = function(canvas){
        canvas.style.width = options.system.visibleSize.width + "px";
        canvas.style.height = options.system.visibleSize.height + "px";
        var scaleX = options.system.visibleSize.width / canvas.width;
        var scaleY = options.system.visibleSize.height / canvas.height;
        options.initOption(scaleX, scaleY);
    };

    /**
     * 以宽度为基准等比缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.width = function(canvas){
        var scale = options.system.visibleSize.width / canvas.width;
        canvas.style.width =  options.system.visibleSize.width + "px";
        canvas.style.height = canvas.height * scale + "px";
        options.initOption(scale, scale);
    };

    /**
     * 以高度为基准缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.height = function(canvas){
        var scale = options.system.visibleSize.height / canvas.height;
        canvas.style.width =  canvas.width * scale + "px";
        canvas.style.height = options.system.visibleSize.height + "px";
        options.initOption(scale, scale);
    };

    /**
     * 宽或高按比例小的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.min = function(canvas){
        var scaleX = options.system.visibleSize.width / canvas.width;
        var scaleY = options.system.visibleSize.height / canvas.height;
        if(scaleX < scaleY){
            canvas.style.width =  options.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            options.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = options.system.visibleSize.height + "px";
            options.initOption(scaleY, scaleY);
        }
    };

    /**
     * 宽或高按比例大的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.max = function(canvas){
        var scaleX = options.system.visibleSize.width / canvas.width;
        var scaleY = options.system.visibleSize.height / canvas.height;
        if(scaleX > scaleY){
            canvas.style.width =  options.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            options.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = options.system.visibleSize.height + "px";
            options.initOption(scaleY, scaleY);
        }
    };

    return new ViewManager();

})();