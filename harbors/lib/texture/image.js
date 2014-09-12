define(function(require, exports, module){

    /**
     * @class
     * @param {string} imagePath
     *
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
    };

    imageTexture.prototype.imagePath = "";
    imageTexture.prototype.image = null;
    imageTexture.prototype.width = 0;
    imageTexture.prototype.height = 0;
    imageTexture.prototype.onLoad = function(){
        this.nodeList.forEach(function(node){
            node.update();
        });
    };

    imageTexture.prototype.setImage = function(imagePath){
        this.imagePath = imagePath;
        this.image = document.createElement("img");
        var self = this;
        this.image.addEventListener("load", function(){
            self.onLoad();
        });
        this.image.src = imagePath;
        return this;
    };

    module.exports = imageTexture;
});