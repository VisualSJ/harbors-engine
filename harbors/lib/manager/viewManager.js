harbors.viewManager = (function(){

    /**
     * 屏幕适配方案
     * @constructor
     */
    var ViewManager = function(){};

    ViewManager.prototype.full = function(canvas){
        canvas.style.width = harbors.options.system.visibleSize.width + "px";
        canvas.style.height = harbors.options.system.visibleSize.height + "px";
        var scaleX = harbors.options.system.visibleSize.width / canvas.width;
        var scaleY = harbors.options.system.visibleSize.height / canvas.height;
        harbors.options.initOption(scaleX, scaleY);
    };

    /**
     * 以宽度为基准等比缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.width = function(canvas){
        var scale = harbors.options.system.visibleSize.width / canvas.width;
        canvas.style.width =  harbors.options.system.visibleSize.width + "px";
        canvas.style.height = canvas.height * scale + "px";
        harbors.options.initOption(scale, scale);
    };

    /**
     * 以高度为基准缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.height = function(canvas){
        var scale = harbors.options.system.visibleSize.height / canvas.height;
        canvas.style.width =  canvas.width * scale + "px";
        canvas.style.height = harbors.options.system.visibleSize.height + "px";
        harbors.options.initOption(scale, scale);
    };

    /**
     * 宽或高按比例小的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.min = function(canvas){
        var scaleX = harbors.options.system.visibleSize.width / canvas.width;
        var scaleY = harbors.options.system.visibleSize.height / canvas.height;
        if(scaleX < scaleY){
            canvas.style.width =  harbors.options.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            harbors.options.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = harbors.options.system.visibleSize.height + "px";
            harbors.options.initOption(scaleY, scaleY);
        }
    };

    /**
     * 宽或高按比例大的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.max = function(canvas){
        var scaleX = harbors.options.system.visibleSize.width / canvas.width;
        var scaleY = harbors.options.system.visibleSize.height / canvas.height;
        if(scaleX > scaleY){
            canvas.style.width =  harbors.options.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            harbors.options.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = harbors.options.system.visibleSize.height + "px";
            harbors.options.initOption(scaleY, scaleY);
        }
    };

    return new ViewManager();

})();