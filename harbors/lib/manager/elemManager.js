var elemManager = (function(){


    //定义元素元素列表
    var define = {
        node: node,
        block: block,
        texture: imageTexture
    };

    var manager = {};

    /**
     * 元素管理器
     * key = id, value = elem
     * 存放id到元素的对应列表，id应该是唯一的，如果重复，则会替换先前的对应关系。
     * @namespace
     */
    manager.idToElem = {};

    /**
     * 创建一个元素
     * @param {string} name
     * @returns {*}
     */
    manager.create = function(name){
        var elem = define[name];

        if(elem){
            var id = "";
            elem = new elem();
            elem.__defineGetter__("id", function(){
                return id;
            });
            elem.__defineSetter__("id", function(a){
                a = a.toString();

                //原id存在，则删除管理对象内的元素
                if(id != "" && manager.idToElem[a]){
                    delete manager.idToElem[a];
                }

                //传入id存在，则在对象内新增id对应元素
                if(a !== ""){
                    manager.idToElem[a] = elem;
                }
                id = a;
            });
            return elem;
        }
        return null;
    }

    return manager;
})();