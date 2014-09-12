define(function(require, exports, module){

    const inherit = require("../tools/inherit");

    const node = require("./node");

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
     */
    block.prototype.append = function(node){
        node.parent = this;
        this.children.push(node);
        this.waitDrawing = true;
    };

    inherit(block, node);

    module.exports = block;
});