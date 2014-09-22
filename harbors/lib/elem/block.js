define(function(require, exports, module){

    const inherit = require("../tools/inherit");
    const node = require("./node");
    const childList = require("./base/childList");

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
        this.children = new childList;
    };
    inherit(block, node);

    var updateActive = function(node, bool){
        node.active = bool;
        var children = node.children;
        if(children){
            for(var i=0; i<children.length; i++){
                updateActive(children[i], bool);
            }
        }
    };

    /**
     * 在block内部插入一个元素
     * @param node
     */
    block.prototype.append = function(node){
        updateActive(node, true);
        node.parent = this;
        for(var i=0; i<this.children.length; i++){
            if(this.children[i] === node){
                return;
            }
        }
        this.children.push(node);
        this.waitDrawing = true;
        this.update();
    };

    /**
     * 在block内部删除一个元素
     * @param node
     */
    block.prototype.remove = function(node){
        node.parent = this;
        for(var i=0; i<this.children.length; i++){
            if(this.children[i] === node){
                //更新所有被删除元素的状态
                updateActive(node, false);
                this.children.splice(i, 1);
                break;
            }
        }
        this.waitDrawing = true;
        this.update();
    };

    module.exports = block;
});