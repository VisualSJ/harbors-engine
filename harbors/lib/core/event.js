define(function(require, exports, module){

    const options = require("./options");

    var canvas;//canvas对象
    var getter = options.getter;

    //绑定了touchDown事件的元素队列
    var touchDownList = [];
    //绑定了touchMove事件的元素队列
    var touchMoveList = [];
    //绑定了touchUp事件的元素队列
    var touchUpList = [];

    var event = function(p, type){
        this.type = type || "unknown";
        this.x = (p.x - options.system.margin.left) / options.system.scale.x;
        this.y = (p.y - options.system.margin.top) / options.system.scale.y;
    };

    //todo 过滤隐藏元素
    var findNode = function(e, array, callback){
        var result = [];
        var i;
        var x = e.x;
        var y = e.y;
        for(i=0; i<array.length; i++){
            var node = array[i];
            //点击点位于node左上角定点右下方向
            if(node.style.left < x && node.style.top < y){
                //点击点位于node右下角左上方向
                if(x < node.style.left + node.style.width && y < node.style.top + node.style.height){
                    result.push(node);
                }
            }
        }

        //触发事件，并判断是否冒泡
       callback(result);
    };

    /**
     * 绑定触摸点击
     * @param e
     */
    var mouseDown = function(e){
        var ev = new event(getter.mouseEvent(e), "touchDown");
        findNode(ev, touchDownList, function(result){
            for(var i=0; i<result.length; i++){
                if(!result[i].touchDown(null, ev)){
                    break;
                }
            }
        });
    };

    /**
     * 绑定触摸移动
     * @param e
     */
    var mouseMove = function(e){
        var ev = new event(getter.mouseEvent(e), "touchMove");
        findNode(ev, touchMoveList, function(result){
            for(var i=0; i<result.length; i++){
                if(!result[i].touchMove(null, ev)){
                    break;
                }
            }
        });
    };

    /**
     * 绑定触摸抬起
     * @param e
     */
    var mouseUp =  function(e){
        var ev = new event(getter.mouseEvent(e), "touchUp");
        findNode(ev, touchUpList, function(result){
            for(var i=0; i<result.length; i++){
                if(!result[i].touchUp(null, ev)){
                    break;
                }
            }
        });
    };

    exports.init = function(){
        canvas = document.getElementById(options.id);
        if(options.system.isMobile){
            canvas.addEventListener(getter.touchDown, mouseDown);
            canvas.addEventListener(getter.touchMove, mouseMove);
            canvas.addEventListener(getter.touchUp, mouseUp);
        }else{
            canvas.addEventListener(getter.mouseDown, mouseDown);
            canvas.addEventListener(getter.mouseMove, mouseMove);
            canvas.addEventListener(getter.mouseUp, mouseUp);
        }
    };

    /**
     * 添加node到touch down队列
     * @param node
     */
    exports.addTouchDown = function(node){
        //循环查找插入点
        for(var i=0; i<touchDownList.length; i++){
            if(node.uniqueNumber > touchDownList[i].uniqueNumber){
                touchDownList.splice(i, 0, node);
                return;
            }
        }
        //没有插入点，插入队列末尾
        touchDownList.push(node);
    };

    /**
     * 添加node到touch move队列
     * @param node
     */
    exports.addTouchMove = function(node){
        //循环查找插入点
        for(var i=0; i<touchMoveList.length; i++){
            if(node.uniqueNumber > touchMoveList[i].uniqueNumber){
                touchMoveList.splice(i, 0, node);
                return;
            }
        }
        //没有插入点，插入队列末尾
        touchMoveList.push(node);
    };

    /**
     * 添加node到touch up队列
     * @param node
     */
    exports.addTouchUp = function(node){
        //循环查找插入点
        for(var i=0; i<touchUpList.length; i++){
            if(node.uniqueNumber > touchUpList[i].uniqueNumber){
                touchUpList.splice(i, 0, node);
                return;
            }
        }
        //没有插入点，插入队列末尾
        touchUpList.push(node);
    };

    /**
     * 从touch down队列删除node
     * @param node
     */
    exports.removeTouchDown = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchDownList.length; i++){
            if(node.uniqueNumber == touchDownList[i].uniqueNumber){
                touchDownList.splice(i, 0);
                return;
            }
        }
    };

    /**
     * 从touch move队列删除node
     * @param node
     */
    exports.removeTouchMove = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchMoveList.length; i++){
            if(node.uniqueNumber == touchMoveList[i].uniqueNumber){
                touchMoveList.splice(i, 0);
                return;
            }
        }
    };

    /**
     * 从touch up队列删除node
     * @param node
     */
    exports.removeTouchUp = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchUpList.length; i++){
            if(node.uniqueNumber == touchUpList[i].uniqueNumber){
                touchUpList.splice(i, 0);
                return;
            }
        }
    };

});