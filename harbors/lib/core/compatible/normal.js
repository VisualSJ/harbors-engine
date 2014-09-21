define(function(require, exports, module){

    //////////
    //Chrome//
    //////////

    /**
     * 获取屏幕可见区域的宽度
     * @returns {number}
     */
    exports.visibleWidth = function(){
        return document.documentElement.clientWidth;
    };

    /**
     * 获取屏幕可见区域的高度
     * @returns {number}
     */
    exports.visibleHeight = function(){
        return document.documentElement.clientHeight;
    };

    /**
     * 获取一个元素距离页面左边的距离
     * @param elem
     * @returns {*}
     */
    exports.marginLeft = function(elem){
        return elem.offsetParent ? arguments.callee(elem.offsetParent)+elem.offsetLeft : elem.offsetLeft;
    };

    /**
     * 获取一个元素距离页面顶部的距离
     * @param elem
     * @returns {*}
     */
    exports.marginTop = function(elem){
        return elem.offsetParent ? arguments.callee(elem.offsetParent)+elem.offsetTop : elem.offsetTop;
    };

    //统一事件命名
    exports.mouseDown = "mousedown";
    exports.mouseMove = "mousemove";
    exports.mouseIn = "mouseover";
    exports.mouseOut = "mouseout";
    exports.mouseUp = "mouseup";
    exports.touchDown = "touchstart";
    exports.touchMove = "touchmove";
    exports.touchUp = "touchend";

    /**
     * 将鼠标事件对象解析成需要的格式
     * @param {MouseEvent} event
     */
    exports.mouseEvent = function(event){

        var ev = {
            point: []
        };

        if(event.changedTouches){
            ev.x = event.changedTouches[0].clientX;
            ev.y = event.changedTouches[0].clientY;
            for(var i=0; i<event.changedTouches.length; i++){
                var item = event.changedTouches[i]
                ev.point.push({
                    x: item.clientX,
                    y: item.clientY
                });
            }
        }else{
            ev.x = event.x;
            ev.y = event.y;
            ev.point.push({
                x: event.x,
                y: event.y
            });
        }

        return ev;
    };

});