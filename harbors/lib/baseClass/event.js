var HSEventClass = (function(){

    /**
     * 基础事件类
     * 所有的node都继承自这个类
     * @class
     * @property {Object} accessEvent 允许操作的事件方法
     *
     * @property {Function} on 绑定事件
     * @property {Function} off 解绑事件
     *
     * @property {Function} touchDown
     * @property {Array} touchDownEventList
     *
     * @property {Function} touchMove
     * @property {Array} touchMoveEventList
     *
     * @property {Function} touchUp
     * @property {Array} touchUpEventList
     */
    var event = function(){};

    /**
     * 允许操作的事件
     *
     * @property {Object} touchDown
     * @property {Object} touchMove
     * @property {Object} touchUp
     * @property {Object} load
     */
    event.prototype.accessEvent = {
        "touchDown": {
            bind: function(callback){
                if(!this.touchDownEventList)
                    this.touchDownEventList = [];

                HSEventManager.addTouchDown(this);
                this.touchDownEventList.push(callback);
            },
            unbind: function(callback){
                var touchDownEventList = this.touchDownEventList;
                if(!touchDownEventList)
                    return;

                for(var i=0; i<touchDownEventList.length; i++){
                    if(touchDownEventList[i] === callback){
                        touchDownEventList.splice(i, 1);
                        break;
                    }
                }
                if(touchDownEventList.length === 0){
                    HSEventManager.removeTouchDown(this);
                }
            }
        },
        "touchMove": {
            bind: function(callback){
                if(!this.touchMoveEventList)
                    this.touchMoveEventList = [];

                HSEventManager.addTouchMove(this);
                this.touchMoveEventList.push(callback);
            },
            unbind: function(callback){
                var touchMoveEventList = this.touchMoveEventList;
                if(!touchMoveEventList)
                    return;
                for(var i=0; i<touchMoveEventList.length; i++){
                    if(touchMoveEventList[i] === callback){
                        touchMoveEventList.splice(i, 1);
                        break;
                    }
                }
                if(touchMoveEventList.length === 0){
                    HSEventManager.removeTouchMove(this);
                }
            }
        },
        "touchUp": {
            bind: function(callback){
                if(!this.touchUpEventList)
                    this.touchUpEventList = [];

                HSEventManager.addTouchUp(this);
                this.touchUpEventList.push(callback);
            },
            unbind: function(callback){
                var touchUpEventList = this.touchUpEventList;
                if(!touchUpEventList)
                    return;
                for(var i=0; i<touchUpEventList.length; i++){
                    if(touchUpEventList[i] === callback){
                        touchUpEventList.splice(i, 1);
                        break;
                    }
                }
                if(touchUpEventList.length === 0){
                    HSEventManager.removeTouchUp(this);
                }
            }
        },
        "load": {
            bind: function(callback){
                if(!this.loadEventList)
                    this.loadEventList = [];

                this.loadEventList.push(callback);
            },
            unbind: function(callback){
                var loadEventList = this.loadEventList;
                if(!loadEventList)
                    return;
                for(var i=0; i<loadEventList.length; i++){
                    if(loadEventList[i] === callback){
                        loadEventList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    /**
     * 绑定一个事件
     * @param event
     * @param callback
     * @returns {HSEventClass}
     */
    event.prototype.on = function(event, callback){
        if(this.accessEvent[event]){
            this.accessEvent[event].bind.call(this, callback);
        }else{
            h.log("传入事件名错误")
        }
        return this;
    };

    /**
     * 解绑一个事件
     * @param event
     * @param callback
     * @returns {HSEventClass}
     */
    event.prototype.off = function(event, callback){
        if(this.accessEvent[event]){
            this.accessEvent[event].unbind.call(this, callback);
        }else{
            h.log("传入事件名错误")
        }
        return this;
    };

    /**
     * touchDown事件的绑定与执行
     * @param callback
     * @param ev
     * @returns {HSEventClass}
     */
    event.prototype.touchDown = function(callback, ev){
        if(callback){
            this.accessEvent['touchDown'].bind.call(this, callback);
            return this;
        }

        var touchDownEventList = this.touchDownEventList;
        if(touchDownEventList){
            var i, len;
            for(i=0, len=touchDownEventList.length; i<len; i++){
                touchDownEventList[i](ev);
            }
        }
        return this;
    };
    event.prototype.touchDownEventList = null;

    /**
     * touchMove事件的绑定与执行
     * @param callback
     * @param ev
     * @returns {HSEventClass}
     */
    event.prototype.touchMove = function(callback, ev){
        if(callback){
            this.accessEvent['touchMove'].bind.call(this, callback);
            return this;
        }

        var touchMoveEventList = this.touchMoveEventList;
        if(touchMoveEventList){
            var i, len;
            for(i=0, len=touchMoveEventList.length; i<len; i++){
                touchMoveEventList[i](ev);
            }
        }
        return this;
    };
    event.prototype.touchMoveEventList = null;

    /**
     * touchUp事件的绑定与执行
     * @param callback
     * @param ev
     * @returns {HSEventClass}
     */
    event.prototype.touchUp = function(callback, ev){
        if(callback){
            this.accessEvent['touchUp'].bind.call(this, callback);
            return this;
        }

        var touchUpEventList = this.touchUpEventList;
        if(touchUpEventList){
            var i, len;
            for(i=0, len=touchUpEventList.length; i<len; i++){
                touchUpEventList[i](ev);
            }
        }
        return this;
    };
    event.prototype.touchUpEventList = null;

    /**
     * load事件的绑定与执行
     * @param callback
     * @returns {HSEventClass}
     */
    event.prototype.load = function(callback){
        if(callback){
            this.accessEvent['load'].bind.call(this, callback);
            return this;
        }

        var loadEventList = this.loadEventList;
        if(loadEventList){
            var i, len;
            for(i=0, len=loadEventList.length; i<len; i++){
                loadEventList[i]();
            }
        }
        return this;
    };
    event.prototype.loadEventList = null;

    return event;
})();