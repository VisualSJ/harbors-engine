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
        this.children = new HSChildListClass;
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

    ///////////////////////////////
    //block节点的自我管理对象//
    ///////////////////////////////
    var manager = {
        idToElem: {},
        create: function(){
            return new block();
        }
    };
    block.manager  = manager;

    block.prototype.__defineGetter__("id", function(){return this.__managerId__; });
    block.prototype.__defineSetter__("id", function(a){
        a = a.toString();

        //原id存在，则删除管理对象内的元素
        if(this.__managerId__ != "" && manager.idToElem[a]){
            delete manager.idToElem[a];
        }

        //传入id存在，则在对象内新增id对应元素
        if(a !== ""){
            manager.idToElem[a] = this;
        }
        this.__managerId__ = a;
    });

    return block;
})();