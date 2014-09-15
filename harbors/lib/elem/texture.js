define(function(require, exports, module){

    const inherit = require("../tools/inherit");
    const event = require("./base/event");

    /**
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
    var imageTexture = function(imagePath){
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

    imageTexture.prototype.loaded = false;
    imageTexture.prototype.imagePath = "";
    imageTexture.prototype.image = null;
    imageTexture.prototype.width = 0;
    imageTexture.prototype.height = 0;

    imageTexture.prototype.setImage = function(imagePath){
        this.imagePath = imagePath;
        this.image = document.createElement("img");
        var self = this;
        this.image.addEventListener("load", function(){
            self.load();
        });
        this.image.src = imagePath;
        return this;
    };

    inherit(imageTexture, event);

    module.exports = imageTexture;
});