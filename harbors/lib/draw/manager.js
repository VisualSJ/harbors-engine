define(function(require, exports, module){

    const canvas = require('./canvas');
    canvas.init();

    /**
     * 绘制背景颜色
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawBGColor = function(x, y, style, ctx){
        canvas.drawRect(style.storage.backgroundColor, x, y, style.width, style.height, ctx);
    };

    /**
     * 绘制背景图片
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawBGImage = function(x, y, style, ctx){
        var drawElem = style.storage.backgroundImage.canvas || style.storage.backgroundImage.image;
        canvas.drawImage(drawElem, 0, 0, style.width, style.height, x, y, style.backgroundSizeWidth, style.backgroundSizeHeight,  ctx);
    };

    /**
     * 绘制文字
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawText  = function(x, y, style, ctx){
        canvas.drawFont(style.fontStyle, style.fontSize, style.fontFamily, style.align, style.color, style.node.innerText, x, y, ctx);
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;

        var x, y;
        var Cos = 1, Sin = 0;
        if(style.rotate){
            ctx.save();
            x = -style.width/2;
            y = -style.height/2;
            Cos = Math.cos(style.rotate * Math.PI / 180) * style.scaleX;
            Sin = Math.sin(style.rotate * Math.PI / 180) * style.scaleY;
            ctx.transform(Cos, Sin, -Sin, Cos, style.left + style.width/2, style.top + style.height/2);
        }else{
            x = style.left;
            y = style.top;
        }

        //绘制背景
        if(style.storage.backgroundImage){
            drawBGImage(x, y, style, ctx);
        }else if(style.storage.backgroundColor){
            drawBGColor(x, y, style, ctx);
        }

        //绘制文字
        if(style.node.innerText){
            drawText(x, y, style, ctx);
        }

        if(style.rotate){
            ctx.restore();
        }
    };

    /**
     * 循环解析node元素
     * @param node
     * @param ctx
     */
    exports.parse = function(node, ctx){
        if(node.cache){//block类型的元素
            if(node.waitDrawing){//等待重新绘制
                //清除画板
                canvas.ctx(node.cache).clearRect(0, 0, node.style.width, node.style.height);

                //循环子元素
                var children = node.children;
                var length = children.length;
                for(var i=0; i<length; i++){
                    exports.parse(children[i], canvas.ctx(node.cache));
                }
                node.waitDrawing = false;
            }
            node.parent && canvas.drawImage(node.cache, 0, 0, node.cache.width, node.cache.height, node.style.left, node.style.top, node.cache.width, node.cache.height,  ctx);
        }else{//node类型元素
            drawAll(node.style, ctx);
        }
    };

    /**
     * 返回绘制的上下文对象
     * @param canvas
     * @returns {*|CanvasRenderingContext2D}
     */
    exports.ctx = function(canvas){
        return canvas.ctx(canvas);
    };

    /**
     * 返回绘制封装
     * @returns {*|exports}
     */
    exports.drawCTX = function(){
        return canvas;
    };
});