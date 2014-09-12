define(function(require, exports, module){

    /**
     * @class
     * @property {Function} on 绑定事件
     * @property {Function} off 解绑事件
     *
     * @property {Function} touchBegin
     * @property {Array} touchBeginEventList
     *
     * @property {Function} touchMove
     * @property {Array} touchMoveEventList
     *
     * @property {Function} touchEnd
     * @property {Array} touchEndEventList
     */
    var event = function(){};

    event.prototype.accessEvent = {
        "touchBegin": function(event, on){
            if(!this.touchBeginEventList){
                this.touchBeginEventList = [];
            }
            if(on){
                this.touchBeginEventList.push(event);
            }else{
                for(var i=0; i<this.touchBeginEventList.length; i++){
                    if(this.touchBeginEventList[i] === event){
                        this.touchBeginEventList.splice(i, 1);
                        break;
                    }
                }
            }
        },
        "touchMove": function(event, on){
            if(!this.touchMoveEventList){
                this.touchMoveEventList = [];
            }
            if(on){
                this.touchMoveEventList.push(event);
            }else{
                for(var i=0; i<this.touchMoveEventList.length; i++){
                    if(this.touchMoveEventList[i] === event){
                        this.touchMoveEventList.splice(i, 1);
                        break;
                    }
                }
            }
        },
        "touchEnd": function(event, on){
            if(!this.touchEndEventList){
                this.touchEndEventList = [];
            }
            if(on){
                this.touchEndEventList.push(event);
            }else{
                for(var i=0; i<this.touchEndEventList.length; i++){
                    if(this.touchEndEventList[i] === event){
                        this.touchEndEventList.splice(i, 1);
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


    event.prototype.touchBegin = function(callback){
        if(callback){
            this.on('touchBegin', callback);
            return this;
        }

        this.touchBeginEventList && this.touchBeginEventList.forEach(function(eventItem){
            eventItem();
        });
        return this;
    };
    event.prototype.touchBeginEventList = null;


    event.prototype.touchMove = function(callback){
        if(callback){
            this.on('touchMove', callback);
            return this;
        }

        this.touchMoveEventList && this.touchMoveEventList.forEach(function(eventItem){
            eventItem();
        });
        return this;
    };
    event.prototype.touchMoveEventList = null;


    event.prototype.touchEnd = function(callback){
        if(callback){
            this.on('touchEnd', callback);
            return this;
        }

        this.touchMoveEventList && this.touchMoveEventList.forEach(function(eventItem){
            eventItem();
        });
        return this;
    };
    event.prototype.touchEndEventList = null;


    module.exports = event;
});