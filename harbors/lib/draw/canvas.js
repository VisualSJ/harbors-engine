define(function(require, exports, module){

    const options = require("../core/options");

    exports.init = function(){

    };

    exports.ctx = function(canvas){
        return canvas.getContext('2d');
    };

    exports.drawRect = function(color, left, top, width, height, ctx){
        ctx.fillStyle = color;
        ctx.fillRect(left, top, width, height);
    };

    exports.drawLine = function(color, startX, startY, endX, endY, ctx){

    };

    exports.drawImage = function(image, x, y, ctx){
        ctx.drawImage(image, x, y)
    };

    exports.drawFont = function(){
        // 设置字体
        ctx.font = "Bold 20px Arial";
        // 设置对齐方式
        ctx.textAlign = "left";
        // 设置填充颜色
        ctx.fillStyle = "#008600";
        // 设置字体内容，以及在画布上的位置
        ctx.fillText("Hello!", 10, 50);
        // 绘制空心字
        //ctx.strokeText("Hello!", 10, 100);
    };
});