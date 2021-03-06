var HSViewManager = (function(){

    /**
     * 屏幕适配方案
     * @constructor
     */
    var ViewManager = function(){};

    ViewManager.prototype.full = function(canvas){
        canvas.style.width = HSOption.system.visibleSize.width + "px";
        canvas.style.height = HSOption.system.visibleSize.height + "px";
        var scaleX = HSOption.system.visibleSize.width / canvas.width;
        var scaleY = HSOption.system.visibleSize.height / canvas.height;
        HSOption.initOption(scaleX, scaleY);
    };

    /**
     * 以宽度为基准等比缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.width = function(canvas){
        var scale = HSOption.system.visibleSize.width / canvas.width;
        canvas.style.width =  HSOption.system.visibleSize.width + "px";
        canvas.style.height = canvas.height * scale + "px";
        HSOption.initOption(scale, scale);
    };

    /**
     * 以高度为基准缩放或者拉伸屏幕
     * @param canvas
     */
    ViewManager.prototype.height = function(canvas){
        var scale = HSOption.system.visibleSize.height / canvas.height;
        canvas.style.width =  canvas.width * scale + "px";
        canvas.style.height = HSOption.system.visibleSize.height + "px";
        HSOption.initOption(scale, scale);
    };

    /**
     * 宽或高按比例小的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.min = function(canvas){
        var scaleX = HSOption.system.visibleSize.width / canvas.width;
        var scaleY = HSOption.system.visibleSize.height / canvas.height;
        if(scaleX < scaleY){
            canvas.style.width =  HSOption.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            HSOption.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = HSOption.system.visibleSize.height + "px";
            HSOption.initOption(scaleY, scaleY);
        }
    };

    /**
     * 宽或高按比例大的等比缩放或者拉升
     * @param canvas
     */
    ViewManager.prototype.max = function(canvas){
        var scaleX = HSOption.system.visibleSize.width / canvas.width;
        var scaleY = HSOption.system.visibleSize.height / canvas.height;
        if(scaleX > scaleY){
            canvas.style.width =  HSOption.system.visibleSize.width + "px";
            canvas.style.height = canvas.height * scaleX + "px";
            HSOption.initOption(scaleX, scaleX);
        }else{
            canvas.style.width =  canvas.width * scaleY + "px";
            canvas.style.height = HSOption.system.visibleSize.height + "px";
            HSOption.initOption(scaleY, scaleY);
        }
    };

    return new ViewManager();

})();