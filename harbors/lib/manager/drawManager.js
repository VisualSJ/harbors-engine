var HSDrawManager = (function(){

    var manager = {};
    /**
     * 循环解析node元素
     * @param node
     * @param ctx
     */
    manager.parse = function(node, ctx){
        var drawNum = 0;

        var style = node.style,
            cache = node.cache;

        if(cache){//block类型的元素
            var nodeCtx = manager.drawer.ctx(cache);
            var styleCache = style.cache;
            if(node.waitDrawing){//等待重新绘制
                //清除画板
                var width = styleCache.width !== null ? styleCache.width : style.getWidth();
                var height = styleCache.height !== null ? styleCache.height : style.getHeight();
                nodeCtx.clearRect(0, 0, width, height);

                //循环子元素
                var children = node.children;
                var length = children.length;
                for(var i=0; i<length; i++){
                    drawNum += manager.parse(children[i], nodeCtx);
                }
                node.waitDrawing = false;
            }
            var left = styleCache.left !== null ? styleCache.left : style.getLeft();
            var top = styleCache.top !== null ? styleCache.top : style.getTop();
            if(node.parent){
                manager.drawer.drawAll(style, ctx);
                manager.drawer.drawImage(
                    cache,
                    0,
                    0,
                    cache.width,
                    cache.height,
                    left,
                    top,
                    cache.width,
                    cache.height,
                    ctx
                );
            }
        }else{//node类型元素
            manager.drawer.drawAll(style, ctx);
        }
        return ++drawNum;
    };

    return manager;

})();