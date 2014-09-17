define(function(require, exports, module){

    const inherit = require("../tools/inherit");

    const event = require("./base/event");
    const style = require("./base/style");


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

    node.prototype.innerText = "";

    node.prototype.update = function(){
        //更新需要重新绘制的block状态
        var prevBlock = this.parent;
        while(prevBlock && !prevBlock.waitDrawing){
            prevBlock.waitDrawing = true;
            prevBlock = prevBlock.parent;
        }
    };

    node.prototype.css = function(a, b){
        switch(arguments.length){
            case 2:
                css2Argument(this, a, b);
                break;
            case 1:
                css1Argument(this, a);
                break;
        }

        this.update();
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
    };

    inherit(node, event);

    module.exports = node;

});