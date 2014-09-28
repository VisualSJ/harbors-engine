(function(){

    var canvas = function(){};

    /**
     * 执行canvas初始化
     */
    canvas.prototype.init = function(){

    };

    /**
     * 获取一个画布元素的上下文
     * @param canvas
     * @returns {CanvasRenderingContext2D}
     */
    canvas.prototype.ctx = function(canvas){
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
    canvas.prototype.drawRect = function(color, left, top, width, height, ctx){
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
    canvas.prototype.drawLine = function(color, startX, startY, endX, endY, ctx){

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
    canvas.prototype.drawImage = function(image, sx, sy, swidth, sheight, x, y, width, height, ctx){
        ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
    };

    /**
     * 設置文字樣式
     * @param style
     * @param size
     * @param family
     * @param align
     * @param ctx
     */
    canvas.prototype.setFont = function(style, size, family, align, ctx){
        // 设置字体
        ctx.font = style + " " + size + "px " + family;//"Bold 20px Arial"
        // 设置对齐方式
        ctx.textAlign = align || "left";
    };
    /**
     * 绘制部分文字
     * @param string
     * @param size
     * @param color
     * @param x
     * @param y
     * @param ctx
     */
    canvas.prototype.drawFont = function(string, size, color, x, y, ctx){
        // 设置填充颜色
        ctx.fillStyle = color;
        // 设置字体内容，以及在画布上的位置
        string && ctx.fillText(string, x, y + size);
        // 绘制空心字
        //ctx.strokeText("Hello!", 10, 100);
    };



    if(!harbors.drawManager.drawer){
        harbors.drawManager.drawer = new canvas();
    }
})();