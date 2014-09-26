var event = (function(){
    /**
     * 基础事件类
     * 所有的node都继承自这个类
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
                eventManager.addTouchDown(this);
                this.touchDownEventList.push(event);
            }else{
                for(var i=0; i<this.touchDownEventList.length; i++){
                    if(this.touchDownEventList[i] === event){
                        this.touchDownEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchDownEventList.length === 0){
                    eventManager.removeTouchDown(this);
                }
            }
        },
        "touchMove": function(event, on){
            if(!this.touchMoveEventList){
                this.touchMoveEventList = [];
            }
            if(on){
                eventManager.addTouchMove(this);
                this.touchMoveEventList.push(event);
            }else{
                for(var i=0; i<this.touchMoveEventList.length; i++){
                    if(this.touchMoveEventList[i] === event){
                        this.touchMoveEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchMoveEventList.length === 0){
                    eventManager.removeTouchMove(this);
                }
            }
        },
        "touchUp": function(event, on){
            if(!this.touchUpEventList){
                this.touchUpEventList = [];
            }
            if(on){
                eventManager.addTouchUp(this);
                this.touchUpEventList.push(event);
            }else{
                for(var i=0; i<this.touchUpEventList.length; i++){
                    if(this.touchUpEventList[i] === event){
                        this.touchUpEventList.splice(i, 1);
                        break;
                    }
                }
                if(this.touchUpEventList.length === 0){
                    eventManager.removeTouchUp(this);
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

    return event;
})();