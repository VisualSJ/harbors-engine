define(function(require, exports, module){

    /**
     * TODO
     * 检查元素是否在node树中，不存在则删除。
     * 插入树的同时在添加回来
     */
    const ev = require("../../core/event");

    /**
     * @class
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

    event.prototype.accessEvent = {
        "touchDown": function(event, on){
            if(!this.touchDownEventList){
                this.touchDownEventList = [];
            }
            if(on){
                ev.addTouchDown(this);
                this.touchDownEventList.push(event);
            }else{
                for(var i=0; i<this.touchDownEventList.length; i++){
                    if(this.touchDownEventList[i] === event){
                        this.touchDownEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchDownEventList.length === 0){
                    ev.removeTouchDown(this);
                }
            }
        },
        "touchMove": function(event, on){
            if(!this.touchMoveEventList){
                this.touchMoveEventList = [];
            }
            if(on){
                ev.addTouchMove(this);
                this.touchMoveEventList.push(event);
            }else{
                for(var i=0; i<this.touchMoveEventList.length; i++){
                    if(this.touchMoveEventList[i] === event){
                        this.touchMoveEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchMoveEventList.length === 0){
                    ev.removeTouchMove(this);
                }
            }
        },
        "touchUp": function(event, on){
            if(!this.touchUpEventList){
                this.touchUpEventList = [];
            }
            if(on){
                ev.addTouchUp(this);
                this.touchUpEventList.push(event);
            }else{
                for(var i=0; i<this.touchUpEventList.length; i++){
                    if(this.touchUpEventList[i] === event){
                        this.touchUpEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchUpEventList.length === 0){
                    ev.removeTouchUp(this);
                }
            }
        },
        "load": function(event, on){
            if(!this.loadEventList){
                this.loadEventList = [];
            }
            if(on){
                this.loadEventList.push(event);
            }else{
                for(var i=0; i<this.loadEventList.length; i++){
                    if(this.loadEventList[i] === event){
                        this.loadEventList.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };

    event.prototype.on = function(event, callback){
        if(typeof event !== 'string'){
            console.error("传入事件名错误");
            return this;
        }
        if(this.accessEvent[event]){
            this.accessEvent[event].call(this, callback, true);
        }
        return this;
    };

    event.prototype.off = function(event, callback){
        if(typeof event !== 'string'){
            console.error("传入事件名错误");
            return this;
        }
        if(this.accessEvent[event]){
            this.accessEvent[event].call(this, callback, false);
        }
        return this;
    };


    event.prototype.touchDown = function(callback, ev){
        if(callback){
            this.on('touchDown', callback);
            return this;
        }

        this.touchDownEventList && this.touchDownEventList.forEach(function(eventItem){
            eventItem(ev);
        });
        return this;
    };
    event.prototype.touchDownEventList = null;


    event.prototype.touchMove = function(callback, ev){
        if(callback){
            this.on('touchMove', callback);
            return this;
        }

        this.touchMoveEventList && this.touchMoveEventList.forEach(function(eventItem){
            eventItem(ev);
        });
        return this;
    };
    event.prototype.touchMoveEventList = null;


    event.prototype.touchUp = function(callback, ev){
        if(callback){
            this.on('touchUp', callback);
            return this;
        }

        this.touchUpEventList && this.touchUpEventList.forEach(function(eventItem){
            eventItem(ev);
        });
        return this;
    };
    event.prototype.touchUpEventList = null;


    event.prototype.load = function(callback){
        if(callback){
            this.on('load', callback);
            return this;
        }

        this.loadEventList && this.loadEventList.forEach(function(eventItem){
            eventItem();
        });
        return this;
    };
    event.prototype.loadEventList = null;


    module.exports = event;
});