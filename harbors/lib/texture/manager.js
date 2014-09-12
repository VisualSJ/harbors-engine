define(function(require, exports, module){

    const image = require("./image");

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

    exports.createImageTexture = function(path){
        if(imageManager[path]){
            return imageManager[path];
        }else{
            var texture = new image(path);
            imageManager[path] = texture;
            return texture;
        }
    };

    /**
     * 缓存管理对象
     * 当image被node元素更改了颜色等值后，则会创建一个单独的新的texture，存放在这里
     * @namespace
     *
     * {
     *   uniqueNumber: {node}
     * }
     */
    var cacheManager = {};

});