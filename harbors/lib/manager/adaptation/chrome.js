(function(){

    var chrome = function(){};

    /**
     * 获取屏幕可见区域的宽度
     * @returns {number}
     */
    chrome.prototype.visibleWidth = function(){
        return document.documentElement.clientWidth;
    };

    /**
     * 获取屏幕可见区域的高度
     * @returns {number}
     */
    chrome.prototype.visibleHeight = function(){
        return document.documentElement.clientHeight;
    };

    /**
     * 获取一个元素距离页面左边的距离
     * @param elem
     * @returns {*}
     */
    chrome.prototype.marginLeft = function(elem){
        return elem.offsetParent ? arguments.callee(elem.offsetParent)+elem.offsetLeft : elem.offsetLeft;
    };

    /**
     * 获取一个元素距离页面顶部的距离
     * @param elem
     * @returns {*}
     */
    chrome.prototype.marginTop = function(elem){
        return elem.offsetParent ? arguments.callee(elem.offsetParent)+elem.offsetTop : elem.offsetTop;
    };

    //统一事件命名
    chrome.prototype.mouseDown = "mousedown";
    chrome.prototype.mouseMove = "mousemove";
    chrome.prototype.mouseIn = "mouseover";
    chrome.prototype.mouseOut = "mouseout";
    chrome.prototype.mouseUp = "mouseup";
    chrome.prototype.touchDown = "touchstart";
    chrome.prototype.touchMove = "touchmove";
    chrome.prototype.touchUp = "touchend";

    /**
     * 将鼠标事件对象解析成需要的格式
     * @param {MouseEvent} event
     */
    chrome.prototype.mouseEvent = function(event){

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

    if(!HSOption.getter){
        HSOption.getter = new chrome();
    }
})();