define(function(require, exports, module){

    const options = require("../core/options");

    /**
     * 执行canvas初始化
     */
    exports.init = function(){

    };

    /**
     * 获取一个画布元素的上下文
     * @param canvas
     * @returns {CanvasRenderingContext2D}
     */
    exports.ctx = function(canvas){
        return canvas.getContext('2d');
    };

    /**
     * 绘制一个实体的正方形
     * @param color
     * @param left
     * @param top
     * @param width
     * @param height
     * @param ctx
     */
    exports.drawRect = function(color, left, top, width, height, ctx){
        ctx.fillStyle = color;
        ctx.fillRect(left, top, width, height);
    };

    /**
     * 绘制一条指向
     * @param color
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     * @param ctx
     */
    exports.drawLine = function(color, startX, startY, endX, endY, ctx){

    };

    /**
     * 绘制一张图片
     * @param image
     * @param sx
     * @param sy
     * @param swidth
     * @param sheight
     * @param x
     * @param y
     * @param width
     * @param height
     * @param ctx
     */
    exports.drawImage = function(image, sx, sy, swidth, sheight, x, y, width, height, ctx){
        ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
    };

    /**
     * 绘制部分文字
     * @param font
     * @param size
     * @param name
     * @param align
     * @param color
     * @param string
     * @param x
     * @param y
     */
    exports.drawFont = function(font, size, name, align, color, string, x, y){
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