var node = (function(){

    var unique = 0;

    /**
     * @class
     * @extend event
     *
     * @property {number} uniqueNumber node元素唯一的标示符
     * @property {node} parent node元素的父节点
     * @property {style} style 样式存放对象
     * @property {boolean} active 是否活动
     * @property {boolean} animate 是否正在播放动画
     *
     * @property {function} update 更新block节点的绘制属性
     * @property {function} set 更改style的快捷方法
     * @property {function} get 获取style的快捷方法
     * @property {function} to 执行动画
     * @property {function} frame 帧动画
     * @property {function} stop 停止动画
     */
    var node = function(){

        this.uniqueNumber = unique++;

        this.parent = null;
        this.style = new styleList(this);
        this.active = false;
        this.animate = false;
    };
    utils.inherit(node, event);

    /**
     * 设置style的方法
     * @param {node} node
     * @param {object} obj
     * @private
     */
    var css1Argument = function(node, obj){
        for(var p in obj){
            css2Argument(node, p, obj[p]);
        }
    };

    /**
     * 设置style的方法
     * @param {node} node
     * @param {string} key
     * @param {string} value
     * @private
     */
    var css2Argument = function(node, key, value){
        node.style[key] = value;
    };

    node.prototype.update = function(){
        //更新需要重新绘制的block状态
        var prevBlock = this.parent;
        while(prevBlock && !prevBlock.waitDrawing){
            prevBlock.waitDrawing = true;
            prevBlock = prevBlock.parent;
        }
    };

    node.prototype.get = function(a){
        return this.style[a];
    };

    node.prototype.set = function(a, b){
        switch(arguments.length){
            case 2:
                css2Argument(this, a, b);
                break;
            case 1:
                css1Argument(this, a);
                break;
        }

        this.update();
        return this;
    };

    /**
     * 设置node中的文字对象
     * @param str
     */
    node.prototype.text = function(str){
        str = str.toString();
        this.innerText = str;

        this.update();
        return this;
    };

    /**
     * @param frames 帧列表
     * @param loop 循环次数
     */
    node.prototype.frame = function(frames, loop){
        var currentNum = 0,
            length = frames.length,
            node = this;

        node.animate = true;

        var anim = function(){
            var frameItem = frames[currentNum++];

            for(var p in frameItem){
                if(p !== "time")
                    node.style[p] = frameItem[p];
            }

            if(node.active && node.animate)
                h.delay(anim, frameItem.time);

            if(currentNum >= length){
                currentNum = 0;
            }
            node.update();
        };

        var frameItem = frames[currentNum++];

        for(var p in frameItem){
            if(p !== "time")
                node.style[p] = frameItem[p];
        }

        h.delay(anim, frameItem.time);
        this.update();
    };

    /**
     * 停止to或者frame
     */
    node.prototype.stop = function(){
        this.animate = false;
    };

    /**
     * 动画支持
     * @param {Object} style 更改的样式参数
     * @param {Number} duration 持续时间
     * @param {Function} [callback=] 执行完毕的回调
     * @param {Function} [easing=] 缓动处理函数
     */
    node.prototype.to = function(style, duration, callback, easing, ln){
        var t, p,
            s = this.style;

        var cache = {};

        for(p in style){
            t = style[p] - s[p];
            if(isNaN(t)){
                console.log("动画不支持设置 " + p + " 属性");
            }else{
                style[p] = t;
                cache[p] = s[p];
            }
        }
        var node = this;
        node.animate = true;
        //记录起始时间
        var start = loop.line;
        //添加运动任务
        var anim = function(){

            //元素处于活动状态
            if(node.active && node.animate){

                //间隔的时间
                var time = loop.line - start;
                //间隔的比例（运动进行的百分比）
                var proportion = time / duration;

                //缓动处理
                if(easing){
                    proportion = easing(proportion);
                }

                if(proportion >= 1){
                    proportion = 1;
                    typeof callback === "function" && callback();
                }else{
                    h.delay(anim, 1);
                }

                for(p in style){
                    node.style[p] = cache[p] + style[p] * proportion;
                }
                node.update();
            }
        };
        h.delay(anim, 1);
        return this;
    };

    /*
     文字支持
     */
    node.prototype.__defineGetter__("innerText", function(){
        var text = this.style.storage.innerTextArray;
        if(text)
            return text.split("\n");
        else
            return "";
    });
    node.prototype.__defineSetter__("innerText", function(a){
        if(a)
            this.style.storage.innerTextArray = a.toString().split("\n");
        else
            this.style.storage.innerTextArray = undefined;
        this.style.storage.innerTextWidth = 0;
    });

    return node;
})();