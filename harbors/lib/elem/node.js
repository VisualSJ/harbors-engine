define(function(require, exports, module){

    const inherit = require("../tools/inherit");

    const event = require("./base/event");
    const style = require("./base/style");
    const loop = require("../core/loop");

    var unique = 0;

    /**
     * @class
     * @extend event
     *
     * @property {number} uniqueNumber node元素唯一的标示符
     * @property {node} parent node元素的父节点
     * @property {style} style 样式存放对象
     *
     * @property {function} update 更新block节点的绘制属性
     * @property {function} css 更改style的快捷方法
     *
     * @property {string} innerText node中包含的文字
     *
     */
    var node = function(){

        this.uniqueNumber = unique++;

        this.parent = null;
        this.style = new style(this);
    };
    inherit(node, event);

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
     * todo node应该根据文字自动撑大元素，居中排列应该在元素正中间，而不是以开头为原点
     */
    node.prototype.text = function(str){
        str = str.toString();
        this.innerText = str;

        this.update();
        return this;
    };

    /**
     * 动画支持
     * @param {Object} style 更改的样式参数
     * @param {Number} duration 持续时间
     * @param {Function} [easing=] 缓动处理函数
     */
    node.prototype.to = function(style, duration, easing){
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
        //记录起始时间
        var start = loop.getLine();
        //添加运动任务
        var anim = function(){
            //间隔的时间
            var time = loop.getLine() - start;
            //间隔的比例（运动进行的百分比）
            var proportion = time / duration;

            //缓动处理
            if(easing){
                proportion = easing(proportion);
            }

            if(proportion >= 1){
                proportion = 1;
            }else{
                h.delay(anim, 1);
            }
            for(p in style){
                node.style[p] = cache[p] + style[p] * proportion;
            }
            node.update();
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

    module.exports = node;

});