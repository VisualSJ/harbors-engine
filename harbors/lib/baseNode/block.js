var HSBlockElement = (function(){

    /**
     * 一个块元素
     * @class
     * @extend node
     *
     * @property append 添加一个子元素到block
     * @property remove 删除一个子元素
     */
    var block = function(){
        HSNodeElement.call(this);
        this.cache = document.createElement("canvas");
        this.cache.width = this.style.width;
        this.cache.height = this.style.height;
        this.waitDrawing = false;
        this.children = [];
    };
    HSUtils.inherit(block, HSNodeElement);

    /**
     * 更新元素的活动状态
     * 在执行插入删除子元素后会调用
     * @param node
     * @param bool
     */
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
        var i, len;
        var children = this.children;
        for(i=0, len=children.length; i<len; i++){
            if(this.children[i] === node){
                return;
            }
        }
        var zIndex = node.style.zIndex;
        for(i=children.length; i>0; i--){
            if(children[i - 1].style.zIndex <= zIndex){
                break;
            }
        }
        children.splice(i, 0, node);
        this.waitDrawing = true;
        this.update();
    };

    /**
     * 在block内部删除一个元素
     * @param node
     */
    block.prototype.remove = function(node){
        node.parent = this;
        var i, len;
        var children = this.children;
        for(i=0, len=children.length; i<len; i++){
            if(children[i] === node){
                //更新所有被删除元素的状态
                updateActive(node, false);
                children.splice(i, 1);
                break;
            }
        }
        this.waitDrawing = true;
        this.update();
    };

    return block;
})();