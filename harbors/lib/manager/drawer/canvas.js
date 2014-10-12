(function(){

    var piToRe = Math.PI / 180;

    /**
     * 绘制模式
     *
     * @property {function} init 初始化一些必要的数据
     * @property {function} ctx 获取一个画布元素的上下文
     * @property {function} drawRect 绘制一个实体的正方形
     * @property {function} drawLine 绘制一条直线
     * @property {function} drawImage 绘制一张图片
     * @property {function} setFont 设置文字的样式等
     * @property {function} drawFont 绘制文字
     */
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

    canvas.prototype.drawImage = function(image, sx, sy, swidth, sheight, x, y, width, height, ctx){
        ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
    };

    canvas.prototype.drawAll = function(style, ctx){

        var storage = style.storage;
        var cache = style.cache;

        //透明度
        if(ctx.globalAlpha !== storage.opacity)
            ctx.globalAlpha = storage.opacity;

        //设置文本样式以及检查是否要绘制文本
        if(style.innerText){
            var font = cache.font !== null ? cache.font : style.getFont();
            if(ctx.font !== font)
                ctx.font = font;
            if(ctx.textAlign !== storage.align)
                ctx.textAlign = storage.align;

            var text = cache.innerText !== null ? cache.innerText : style.getInnerText();
        }

        var left = cache.left !== null ? cache.left : style.getLeft(),
            top = cache.top !== null ? cache.top : style.getTop(),
            width = cache.width !== null ? cache.width : style.getWidth(),
            height = cache.height !== null ? cache.height : style.getHeight();

        var x, y;
        var Cos = 1, Sin = 0;
        var isTranform = storage.rotate%360 !== 0 || storage.scaleX !== 1 || storage.scaleY !== 1;
        if(isTranform){
            var rotate = storage.rotate;

            ctx.save();
            x = -width * storage.anchorX;
            y = -height * storage.anchorY;
            Cos = Math.cos(rotate * piToRe) * storage.scaleX;
            Sin = Math.sin(rotate * piToRe) * storage.scaleY;
            ctx.transform(
                Cos,
                Sin,
                -Sin,
                Cos,
                    left - x - width * (1-storage.scaleX)/2,//left + style.width/2
                    top - y - height * (1-storage.scaleY)/2
            );
        }else{
            x = left;
            y = top;
        }


        //绘制背景颜色
        if(storage.background){
            if(ctx.fillStyle !== storage.background)
                ctx.fillStyle = storage.background;
            ctx.fillRect(x, y, width, height);
        }

        //绘制图片元素
        if(storage.image && (width > 0 || height > 0) ){
            var drawElem = style.storage.image.canvas || style.storage.image.image;
            var imageWidth = cache.imageSizeWidth !== null ? cache.imageSizeWidth : style.getImageSizeWidth();
            var imageHeight = cache.imageSizeHeight !== null ? cache.imageSizeHeight : style.getImageSizeHeight();
            ctx.drawImage(
                drawElem,
                storage.imagePositionLeft,
                storage.imagePositionTop,
                width,
                height,
                x,
                y,
                imageWidth - 0,
                imageHeight - 0
            );

        }

        //绘制文字
        if(style.innerText) {
            var size = storage.fontSize,
                lineHeight = storage.lineHeight,
                align = storage.align;
            var tmp = (lineHeight - size) / 2;

            if (storage.width) {
                //宽度被限定，自动换行
                if (align === "right")
                    x += width;
                if (align === "center")
                    x += width / 2;
            } else {
                //宽度自动撑大
                if (align === "right")
                    x += storage.innerTextWidth;
                if (align === "center")
                    x += storage.innerTextWidth / 2;
            }
            for (var i = 0; i < text.length; i++) {
                if (ctx.fillStyle !== storage.color)
                    ctx.fillStyle = storage.color;
                // 设置字体内容，以及在画布上的位置
                text[i] && ctx.fillText(text[i], x, y + i * lineHeight + tmp + size);
            }
        }

        if(isTranform){
            ctx.restore();
        }

    };

    if(!HSDrawManager.drawer){
        HSDrawManager.drawer = new canvas();
    }
})();