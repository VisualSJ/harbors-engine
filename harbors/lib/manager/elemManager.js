harbors.elemManager = (function(){

    //定义显示元素元素列表
    var defineNode = {
        node: harbors.BASENODE.node,
        block: harbors.BASENODE.block,
        texture: harbors.BASENODE.texture,
        audio: harbors.BASENODE.audio
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
            if(elem.manager.create)
                elem = elem.manager.create.apply(elem.manager, Array.prototype.splice.call(arguments, 1));
            else
                elem = new elem();
            return elem;
        }
        return null;
    };

    /**
     * 通过id查找每个元素自带的管理器内是否有该元素存在
     * @param id
     * @returns {*}
     */
    manager.getNodeWithId = function(id){
        var p, ElemM;

        for(p in defineNode){
            ElemM = defineNode[p].manager;
            if(ElemM && ElemM.idToElem && ElemM.idToElem[id]){
                return ElemM.idToElem[id];
            }
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