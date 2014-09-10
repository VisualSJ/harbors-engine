define(function(require, exports, module){

    var event = function(){};

    event.prototype.accessEvent = {
        "onTouchBegin": true,
        "touchBegin": true,

        "onTouchMove": true,
        "touchMove": true,

        "onTouchEnd": true,
        "touchEnd": true
    };

    /**
     * 绑定事件方法
     * @param {string} event
     * @param {function} callback
     */
    event.prototype.addEventListener = function(event, callback){

    };

    //触摸开始事件
    event.prototype.touchBegin = function(){

        this.onTouchBegin && this.onTouchBegin();
    };
    event.prototype.onTouchBegin = null;

    //触摸移动事件
    event.prototype.touchMove = function(){

        this.onTouchMove && this.onTouchMove();
    };
    event.prototype.onTouchMove = null;

    //触摸结束事件
    event.prototype.touchEnd = function(){

        this.onTouchEnd && this.onTouchEnd();
    };
    event.prototype.onTouchEnd = null;

    //点击事件
    event.prototype.click = function(){

        this.touchBegin();
        this.touchEnd();

        this.onClick && this.onClick();
    };
    event.prototype.onClick = null;

    //获得焦点
    event.prototype.focus = function(){

        this.onFocus && this.onFocus();
    };
    event.prototype.onFocus = null;



    module.exports = event;
});