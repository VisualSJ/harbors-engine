var HSEventManager = (function(){

    var manager = {};

    var canvas;//canvas对象

    //绑定了touchDown事件的元素队列
    var touchDownList = [];
    //绑定了touchMove事件的元素队列
    var touchMoveList = [];
    //绑定了touchUp事件的元素队列
    var touchUpList = [];

    var event = function(p, type){
        this.type = type || "unknown";
        this.x = (p.x - HSOption.system.margin.left) / HSOption.system.scale.x;
        this.y = (p.y - HSOption.system.margin.top) / HSOption.system.scale.y;
    };

    var findNode = function(e, array, callback){
        var result = [];
        var i;
        var x = e.x;
        var y = e.y;
        for(i=0; i<array.length; i++){
            var node = array[i];
            if(!node.active)
                continue;
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
        var ev = new event(HSOption.getter.mouseEvent(e), "touchDown");
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
        var ev = new event(HSOption.getter.mouseEvent(e), "touchMove");
        findNode(ev, touchMoveList, function(result){
            for(var i=0; i<result.length; i++){
                if(!result[i].touchMove(null, ev)){
                    break;
                }
            }
        });
        if ( e && e.preventDefault )
        //阻止默认浏览器动作(W3C)
            e.preventDefault();
        else
        //IE中阻止函数器默认动作的方式
            window.event.returnValue = false;
        return false;
    };

    /**
     * 绑定触摸抬起
     * @param e
     */
    var mouseUp =  function(e){
        var ev = new event(HSOption.getter.mouseEvent(e), "touchUp");
        findNode(ev, touchUpList, function(result){
            for(var i=0; i<result.length; i++){
                if(!result[i].touchUp(null, ev)){
                    break;
                }
            }
        });
    };

    manager.init = function(){
        canvas = document.getElementById(HSOption.id);
        if(HSOption.system.isMobile){
            canvas.addEventListener(HSOption.getter.touchDown, mouseDown);
            canvas.addEventListener(HSOption.getter.touchMove, mouseMove);
            canvas.addEventListener(HSOption.getter.touchUp, mouseUp);
        }else{
            canvas.addEventListener(HSOption.getter.mouseDown, mouseDown);
            canvas.addEventListener(HSOption.getter.mouseMove, mouseMove);
            canvas.addEventListener(HSOption.getter.mouseUp, mouseUp);
        }
    };

    /**
     * 添加node到touch down队列
     * @param node
     */
    manager.addTouchDown = function(node){
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
    manager.addTouchMove = function(node){
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
    manager.addTouchUp = function(node){
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
    manager.removeTouchDown = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchDownList.length; i++){
            if(node.uniqueNumber == touchDownList[i].uniqueNumber){
                touchDownList.splice(i, 1);
                return;
            }
        }
    };

    /**
     * 从touch move队列删除node
     * @param node
     */
    manager.removeTouchMove = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchMoveList.length; i++){
            if(node.uniqueNumber == touchMoveList[i].uniqueNumber){
                touchMoveList.splice(i, 1);
                return;
            }
        }
    };

    /**
     * 从touch up队列删除node
     * @param node
     */
    manager.removeTouchUp = function(node){
        //循环寻找删除元素
        for(var i=0; i<touchUpList.length; i++){
            if(node.uniqueNumber == touchUpList[i].uniqueNumber){
                touchUpList.splice(i, 1);
                return;
            }
        }
    };

    return manager;
})();