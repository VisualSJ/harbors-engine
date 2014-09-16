define(function(require, exports, module){

    const canvas = require('./canvas');
    canvas.init();

    /**
     * 绘制背景颜色
     * @param style
     * @param ctx
     */
    var drawBGColor = function(style, ctx){
        canvas.drawRect(style.storage.backgroundColor, style.left, style.top, style.width, style.height, ctx);
    };

    /**
     * 绘制背景图片
     * @param style
     * @param ctx
     */
    var drawBGImage = function(style, ctx){
        if(style.storage.backgroundImage.canvas){
            //从canvasTexture绘制图形
            canvas.drawImage(style.storage.backgroundImage.canvas, 0, 0, style.width, style.height,  style.left, style.top, style.backgroundSizeWidth, style.backgroundSizeHeight,  ctx);
        }else{
            //从imageTexture绘制图形
            canvas.drawImage(style.storage.backgroundImage.image, 0, 0, style.width, style.height,  style.left, style.top, style.backgroundSizeWidth, style.backgroundSizeHeight,  ctx);
        }
    };

    var drawText  = function(style, ctx){
        canvas.drawFont(style.fontStyle, style.fontSize, style.fontFamily, style.align, style.color, style.node.innerText, style.left, style.top, ctx);
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;

        //绘制背景
        if(style.storage.backgroundImage){
            drawBGImage(style, ctx);
        }else{
            drawBGColor(style, ctx);
        }

        //绘制文字
        if(style.node.innerText){
            drawText(style, ctx);
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