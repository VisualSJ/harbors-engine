var HSChildListClass = (function(){
    /**
     * 子元素列表
     * 拥有原生数组的一些方法
     *
     * @property {function} push 插入一个元素到排序位置
     * @property {function} splice 在指定地点插入一个元素
     * @property {function} sortIndex 手动排序
     */
    var childList = function(){};

    childList.prototype.splice = Array.prototype.splice;

    /**
     * 在子元素列表中插入元素
     * @param node
     */
    childList.prototype.push = function(node){
        var zIndex = node.style.zIndex;
        for(var i=this.length; i>0; i--){
            if(this[i - 1].style.zIndex <= zIndex){
                break;
            }
        }
        this.splice(i, 0, node);
    };

    /**
     * 根据zIndex值手动排序
     */
    childList.prototype.sortIndex = function(){
        var i = 1, j,
            len = this.length;
        for(i; i<len; i++){
            j = i;
            while(--j >= 0){
                if(this[j].style.zIndex < this[i].style.zIndex){
                    break;
                }
            }
            if(j !== i-1){
                this.splice(j+1, 0, this.splice(i, 1)[0]);
            }
        }
    };

    return childList;
})();

