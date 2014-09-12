define(function(require, exports, module){

    const canvas = require('./canvas');
    canvas.init();

    var drawBG = function(style, c){
        canvas.drawRect(style.backgroundColor, style.left, style.top, style.width, style.height, c);
    };

    var drawBGIMG = function(style, c){
        canvas.drawImage(style.backgroundImage, style.left, style.top, c);
    };

    var drawAll = function(style, c){
        if(!style)
            return;
        if(style.backgroundImage)
            drawBGIMG(style, c);
        else
            drawBG(style, c);
    };

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