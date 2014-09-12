define(function(require, exports, module){

    var texture = function(imagePath){
        if(imagePath)
            this.setImage(imagePath);
    };

    texture.prototype.hostNode = null;
    texture.prototype.imagePath = "";
    texture.prototype.image = null;
    texture.prototype.width = 0;
    texture.prototype.height = 0;
    texture.prototype.setImage = function(imagePath){
        this.imagePath = imagePath;
        this.image = document.createElement("img");
        var self = this;
        this.image.addEventListener("load", function(){
            self.onload && self.onload();
        });
    };

    module.exports = texture;
});