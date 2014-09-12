define(function(require, exports, module){

    const inherit = require("../tools/inherit");
    const node = require("./node");

    /**
     * @class
     * @extend node
     *
     * @property append 添加一个子元素到block
     * @property remove 删除一个子元素
     */
    var block = function(){
        node.call(this);
        this.cache = document.createElement("canvas");
        this.cache.width = this.style.width;
        this.cache.height = this.style.height;
        this.waitDrawing = false;
        this.children = [];
    };

    /**
     * 在block内部插入一个元素
     * @param node
     */
    block.prototype.append = function(node){
        node.parent = this;
        this.children.push(node);
        this.waitDrawing = true;
    };

    /**
     * 在block内部删除一个元素
     * @param node
     */
    block.prototype.remove = function(node){
        node.parent = this;
        for(var i=0; i<this.children.length; i++){
            if(this.children[i] === node){
                this.children.splice(i, 1);
                break;
            }
        }
        this.waitDrawing = true;
    };

    inherit(block, node);

    module.exports = block;
});