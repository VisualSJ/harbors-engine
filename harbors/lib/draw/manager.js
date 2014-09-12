define(function(require, exports, module){

    const canvas = require('./canvas');
    canvas.init();

    /**
     * 绘制背景颜色
     * @param style
     * @param ctx
     */
    var drawBG = function(style, ctx){
        canvas.drawRect(style.backgroundColor, style.left, style.top, style.width, style.height, ctx);
    };

    /**
     * 绘制背景图片
     * @param style
     * @param ctx
     */
    var drawBGIMG = function(style, ctx){
        canvas.drawImage(style.backgroundImage.image, style.left, style.top, ctx);
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;
        if(style.backgroundImage)
            drawBGIMG(style, ctx);
        else
            drawBG(style, ctx);
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
            canvas.drawImage(node.cache, node.style.left, node.style.top, ctx);
        }else{//node类型元素
            drawAll(node.style, ctx);
        }
    };

});