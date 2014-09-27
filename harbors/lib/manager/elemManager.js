var elemManager = (function(){

    //定义显示元素元素列表
    var defineNode = {
        node: {
            ctor: node
        },
        block: {
            ctor: block
        }
    };

    //定义非现实元素列表
    var defineElem = {
        texture: {
            create: textureManager.createImageTexture,
            ctor: imageTexture
        },
        audio: {
            create: audioManager.createAudio,
            ctor: audio
        }
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
     * 创建一个显示元素
     * @param {string} name
     * @returns {*}
     */
    manager.createNode = function(name){
        var elem = defineNode[name];

        if(elem){
            var id = "";

            if(elem.create)
                elem = elem.create();
            else
                elem = new elem.ctor();

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
    };

    /**
     * 创建一个非显示元素
     * @param name
     * @returns {*}
     */
    manager.createElem = function(name){
        var elem = defineElem[name];

        if(elem){

            if(elem.create)
                elem = elem.create();
            else
                elem = new elem.ctor();

            return elem;
        }
        return null;
    };

    /**
     * 自定义一个可显示的节点
     */
    manager.defineNode = function(name, ctor){
        defineNode[name] = ctor;
    };

    /**
     * 自定义一个不可可显示的元素
     * @param name 名字
     * @param create
     */
    manager.defineElem = function(name, create){
        defineElem[name] = create;
    };

    return manager;
})();