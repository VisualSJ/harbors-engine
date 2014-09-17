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
    exports.touchDown = "touchBegin";
    exports.touchMove = "touchMove";
    exports.touchUp = "touchEnd";

    /**
     * 将鼠标事件对象解析成需要的格式
     * @param {MouseEvent} event
     */
    exports.mouseEvent = function(event){
        return {
            x: event.x,
            y: event.y
        };
    };

});