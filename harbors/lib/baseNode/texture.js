harbors.BASENODE.texture = (function(){
    /**
     * 纹理对象
     * @class
     * @extend event
     * @param {string} imagePath
     *
     * @property {boolean} loaded 是否加载完成
     * @property {Array} nodeList 引用了这个texture的元素
     * @property {string} imagePath 图片元素地址
     * @property {*} image IMAGE元素
     * @property {number} width
     * @property {number} height
     * @property {function} onLoad 加载完成后执行的回调（更新所有包含了这个texture的node）
     *
     */
    var texture = function(imagePath){
        if(imagePath)
            this.setImage(imagePath);

        this.nodeList = [];

        //绑定一个load事件
        var self = this;
        this.on("load", function(){
            self.width = self.image.width;
            self.height = self.image.height;
            //更新是否已经加载完成的标志
            self.loaded = true;
            //更新所有引用了这个texture的元素
            self.nodeList.forEach(function(node){
                node.update();
            });
        });
    };
    harbors.utils.inherit(texture, harbors.BASECLASS.event);

    texture.prototype.loaded = false;
    texture.prototype.imagePath = "";
    texture.prototype.image = null;
    texture.prototype.width = 0;
    texture.prototype.height = 0;

    texture.prototype.setImage = function(path){
        this.path = path;
        this.image = document.createElement("img");
        var self = this;
        this.image.addEventListener("load", function(){
            self.load();
        });
        this.image.src = path;
        return this;
    };

    ///////////////////////////////
    //node节点的自我管理对象//
    ///////////////////////////////
    var manager = {
        pathToElem: {},
        create: function(path){
            if(manager.pathToElem[path])
                return manager.pathToElem[path];

            var node = new texture(path);
            manager.pathToElem[path] = node;
            return node;
        }
    };

    texture.manager  = manager;

    return texture;
})();