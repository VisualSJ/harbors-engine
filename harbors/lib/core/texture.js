define(function(require, exports, module){

    const texture = require("../elem/texture");

    /**
     * image管理对象
     * 所有新建的imageTexture元素都会注册到这里
     * @namespace
     *
     * {
     *   "http://test.com/test.png": {imageTexture}
     * }
     */
    var imageManager = {};

    /**
     * 获取缓存中的imageTexture
     * @param path
     * @returns {*}
     */
    exports.getImageTexture = function(path){
        if(imageManager[path]){
            return imageManager[path];
        }else{
            return null;
        }
    };

    /**
     * 从一个地址，创建一个新的texture
     * @param path
     * @returns {*}
     */
    exports.createImageTexture = function(path){
        if(imageManager[path]){
            return imageManager[path];
        }else{
            var tex = new texture(path);
            imageManager[path] = tex;
            return tex;
        }
    };

});