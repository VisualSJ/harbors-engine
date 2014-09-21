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
        if(style.width !=0 || style.height !=0)
            canvas.drawImage(drawElem, style.backgroundPositionLeft, style.backgroundPositionTop, style.width, style.height, x, y, style.backgroundSizeWidth, style.backgroundSizeHeight,  ctx);
    };

    /**
     * 绘制文字
     * @param txtArr
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawText  = function(txtArr, x, y, style, ctx){
        var i, j, txt,
            len = txtArr.length,

            width = style.width,
            size = style.fontSize,
            align = style.storage.align;

        var tmp = (style.lineHeight - style.fontSize) / 2;

        if(style.storage.width){
            var currentWidth, totalIndex, strIndex;
            //宽度被限定，自动换行
            if(align === "right")
                x += width;
            if(align === "center")
                x += width / 2;
        }else{
            //宽度自动撑大
            if(align === "right")
                x += style.storage.innerTextWidth;
            if(align === "center")
                x += style.storage.innerTextWidth / 2;
        }

        for(i = 0; i < len; i ++){
            txt = txtArr[i];
            canvas.drawFont(txt, size, style.color, x, y + i * style.lineHeight + tmp, ctx);
        }
    };

    /**
     * 設置文本樣式
     * @param style
     * @param ctx
     */
    var setFont = function(style, ctx){
        canvas.setFont(style.fontStyle, style.fontSize, style.fontFamily, style.align, ctx);
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;

        var txt, len;
        var txtArr = style.storage.innerTextArray;

        //文字存在，判斷是否需要重置width和height
        if(style.storage.innerTextArray){
            txt = [];
            len = txtArr.length;
            setFont(style, ctx);

            if(style.storage.width){
                //限定宽度
                var i, j, tmpTxt, totalIndex, currentWidth, strIndex,
                    width = style.storage.width;
                for(i = 0, j = 0; i < len; i ++){
                    tmpTxt = txtArr[i];//需要分段的文字
                    totalIndex = 0;

                    do{
                        strIndex = tmpTxt.length;
                        currentWidth = ctx.measureText(tmpTxt).width;//文字总长度

                        //按比例缩小文字长度
                        while(currentWidth > width && strIndex > 1){
                            var tmpIndex = width / currentWidth * strIndex | 0;
                            //预防进入死循环
                            if(tmpIndex === strIndex){
                                strIndex -= 1;
                            }else if(tmpIndex === 0){
                                strIndex = 1;
                            }else{
                                strIndex = tmpIndex;
                            }
                            tmpTxt = tmpTxt.substr(0, strIndex);
                            currentWidth = ctx.measureText(tmpTxt).width;
                        }

                        j++;
                        txt.push(tmpTxt);
                        totalIndex += strIndex;
                        tmpTxt = txtArr[i].substr(totalIndex);
                        strIndex = 0;
                    }while(tmpTxt && tmpTxt !== "");

                }

                if(style.storage.innerTextRow !== j){
                    style.storage.innerTextRow = j;
                }
            }else{
                //没有限定宽度
                if(!style.storage.innerTextWidth){
                    var tmpWidth = 0;
                    style.storage.innerTextArray.forEach(function(text){
                        var t = ctx.measureText(text).width;
                        if(t > tmpWidth)
                            tmpWidth = t;
                    });
                    style.storage.innerTextWidth = tmpWidth;
                }
                txt = style.storage.innerTextArray;
            }
        }

        var x, y;
        var Cos = 1, Sin = 0;
        if(style.storage.rotate || style.storage.scaleX || style.storage.scaleY){
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
        if(style.storage.innerTextArray){
            drawText(txt, x, y, style, ctx);
        }

        if(style.storage.rotate || style.storage.scaleX || style.storage.scaleY){
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