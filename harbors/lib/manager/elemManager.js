var HSElementManager = (function(){

    //定义显示元素元素列表
    var defineNode = {
        node: HSNodeElement,
        block: HSBlockElement,
        texture: HSTextureElement,
        audio: HSAudioElement,
        font: HSFontElement
    };

    var manager = {};

    /**
     * 创建一个元素
     * @param {string} name
     * @returns {*}
     */
    manager.createNode = function(name){
        var elem = defineNode[name];
        if(elem){
            return new elem();
        }
        return null;
    };

    /**
     * 通过id查找每个元素自带的管理器内是否有该元素存在
     * @param id
     * @returns {*}
     */
    manager.getNodeWithId = function(id){
        return findId(h.canvas, id);
    };
    var findId = function(node, id){
        if(node.id === id){
            return node;
        }
        var i, len , elem;
        var children = node.children;
        if(!children || children.length === 0){
            return null;
        }
        for(i=0, len=children.length; i<len; i++){
            elem = findId(children[i], id);
            if(elem)
                return elem;
        }
        return null;
    };

    /**
     * 自定义一个node
     * 需要自定义一个manager等。参考node内部实现
     */
    manager.defineNode = function(name, ctor){
        defineNode[name] = ctor;
    };

    return manager;
})();