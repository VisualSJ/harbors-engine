var HSNodeElement = (function(){

    /**
     * NODE节点，最基础的显示元素
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
        this.uniqueNumber = HSuniqueId++;

        this.parent = null;
        this.style = new HSNodeStyleClass(this);
        this.active = false;
        this.animate = false;
    };
    HSUtils.inherit(node, HSEventClass);

    /**
     * 设置style的方法
     * @param {object} obj
     * @private
     */
    var css1Argument = function(obj){
        for(var p in obj){
            css2Argument.call(this, p, obj[p]);
        }
    };

    /**
     * 设置style的方法
     * @param {string} key
     * @param {string} value
     * @private
     */
    var css2Argument = function(key, value){
        if(this.style[key])
            this.style[key](value);
    };

    /**
     * 更新绘制状态
     * 在更改节点的样式后需要调用的函数
     */
    node.prototype.update = function(){
        //更新需要重新绘制的block状态
        var prevBlock = this.parent;
        while(prevBlock && !prevBlock.waitDrawing){
            prevBlock.waitDrawing = true;
            prevBlock = prevBlock.parent;
        }
    };

    /**
     * 获取一个style样式
     * @param a
     * @returns {*}
     */
    node.prototype.get = function(a){
        return this.style.storage[a];
    };

    /**
     * 设置一个style样式
     * @param a 样式名字
     * @param b 样式的值
     * @returns {HSNodeElement}
     */
    node.prototype.set = function(a, b){
        switch(arguments.length){
            case 2:
                css2Argument.call(this, a, b);
                break;
            case 1:
                css1Argument.call(this, a);
                break;
        }

        this.update();
        return this;
    };

    /**
     * 帧动画
     * @param frames 帧列表
     *
     * @param loop 循环次数
     */
    node.prototype.frame = function(frames, loop){
        loop = loop || Number.MAX_VALUE;
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

            if(node.active && frameItem.time && node.animate && loop > 0)
                h.delay(anim, frameItem.time);
            else
                node.animate = false;

            if(currentNum >= length){
                currentNum = 0;
                loop--;
            }
            node.update();
        };

        var frameItem = frames[currentNum++];

        for(var p in frameItem){
            if(p !== "time")
                node.style[p](frameItem[p]);
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
     * 基础动画支持
     * @param {Object} style 更改的样式参数
     * @param {Number} duration 持续时间
     * @param {Function} [callback=] 执行完毕的回调
     * @param {Function} [easing=] 缓动处理函数
     */
    node.prototype.to = function(style, duration, callback, easing){
        var t, p,
            s = this.style;

        var cache = {};

        for(p in style){
            t = style[p] - s.storage[p];
            style[p] = t;
            cache[p] = s.storage[p];
        }
        var node = this;
        node.animate = true;
        //记录起始时间
        var start = HSLoop.line;
        //添加运动任务
        var anim = function(){

            //元素处于活动状态
            if(node.active && node.animate){

                //间隔的时间
                var time = HSLoop.line - start;
                //间隔的比例（运动进行的百分比）
                var proportion = time / duration;

                //缓动处理
                if(easing){
                    proportion = easing(proportion);
                    if(proportion < 0)
                        proportion = -proportion;
                }

                if(proportion >= 1){
                    proportion = 1;
                    typeof callback === "function" && callback();
                }else{
                    h.delay(anim, 1);
                }

                for(p in style){
                    node.style[p](cache[p] + style[p] * proportion);
                }
                node.update();
            }
        };
        h.delay(anim, 1);
        return this;
    };

    return node;
})();