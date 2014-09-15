define(function(require, exports, module){

    const canvas = require('./canvas');
    canvas.init();

    /**
     * 绘制背景颜色
     * @param style
     * @param ctx
     */
    var drawColor = function(style, ctx){
        canvas.drawRect(style.color, style.left, style.top, style.width, style.height, ctx);
    };

    /**
     * 绘制背景图片
     * @param style
     * @param ctx
     */
    var drawImage = function(style, ctx){
        if(style.image.canvas){
            //从canvasTexture绘制图形
            canvas.drawImage(style.image.image, 0, 0, style.width, style.height,  style.left, style.top, style.width, style.height,  ctx);
        }else{
            //从imageTexture绘制图形
            canvas.drawImage(style.image.image, 0, 0, style.width, style.height,  style.left, style.top, style.width, style.height,  ctx);
        }
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;

        if(style.image){
            //style中图形存在
            drawImage(style, ctx);
        }else{
            //仅绘制颜色
            drawColor(style, ctx);
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