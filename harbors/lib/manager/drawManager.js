var HSDrawManager = (function(){

    var manager = {};
    var piToRe = Math.PI / 180;

    /**
     * 绘制背景颜色
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawBGColor = function(x, y, style, ctx){
        manager.drawer.drawRect(
            style.storage.background,
            x,
            y,
            style.width,
            style.height,
            ctx
        );
    };

    /**
     * 绘制背景图片
     * @param x
     * @param y
     * @param style
     * @param ctx
     */
    var drawBGImage = function(x, y, style, ctx){
        var width = style.width,
               height = style.height;

        var drawElem = style.storage.image.canvas || style.storage.image.image;
        if(width !=0 || height !=0)
            manager.drawer.drawImage(
                drawElem,
                style.imagePositionLeft,
                style.imagePositionTop,
                width,
                height,
                x,
                y,
                style.imageSizeWidth,
                style.imageSizeHeight,
                ctx
            );
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
        var storage = style.storage;
        var i, txt,
            len = txtArr.length,

            width = style.width,
            size = style.fontSize,
            align = storage.align,
            lineHeight = style.lineHeight;

        var tmp = (lineHeight - size) / 2;

        if(storage.width){
            //宽度被限定，自动换行
            if(align === "right")
                x += width;
            if(align === "center")
                x += width / 2;
        }else{
            //宽度自动撑大
            if(align === "right")
                x += storage.innerTextWidth;
            if(align === "center")
                x += storage.innerTextWidth / 2;
        }

        for(i = 0; i < len; i ++){
            txt = txtArr[i];
            manager.drawer.drawFont(
                txt,
                size,
                style.color,
                x,
                y + i * lineHeight + tmp,
                ctx
            );
        }
    };

    /**
     * 設置文本樣式
     * @param style
     * @param ctx
     */
    var setFont = function(style, ctx){
        manager.drawer.setFont(
            style.fontStyle,
            style.fontSize,
            style.fontFamily,
            style.align,
            ctx
        );
    };

    /**
     * 绘制过程集合
     * @param style
     * @param ctx
     */
    var drawAll = function(style, ctx){
        if(!style)
            return;
        var storage = style.storage;

        var txt, len;
        var txtArr = storage.innerTextArray;

        //透明度
        if(ctx.globalAlpha !== style.opacity)
            ctx.globalAlpha = style.opacity;

        //文字存在，判斷是否需要重置width和height
        if(storage.innerTextArray){
            txt = [];
            len = txtArr.length;
            setFont(style, ctx);

            var i;
            if(storage.width){
                //限定宽度
                var j, tmpTxt, totalIndex, currentWidth, strIndex,
                    width = storage.width;
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

                if(storage.innerTextRow !== j){
                    storage.innerTextRow = j;
                }
            }else{
                //没有限定宽度
                if(!storage.innerTextWidth){
                    var tmpWidth = 0;
                    var t;
                    for(i=0, len=storage.innerTextArray.length; i<len; i++){
                        t = ctx.measureText(storage.innerTextArray[i]).width;
                        if(t > tmpWidth)
                            tmpWidth = t;
                    }
                    storage.innerTextWidth = tmpWidth;
                }
                txt = storage.innerTextArray;
            }
        }
        var left = style.left,
            top = style.top;

        var x, y;
        var Cos = 1, Sin = 0;
        if(storage.rotate || storage.scaleX || storage.scaleY){
            var rotate = style.rotate;

            ctx.save();
            x = -style.width/2;
            y = -style.height/2;
            Cos = Math.cos(rotate * piToRe) * style.scaleX;
            Sin = Math.sin(rotate * piToRe) * style.scaleY;
            ctx.transform(
                Cos,
                Sin,
                -Sin,
                Cos,
                left - x,//left + style.width/2
                top - y
            );
        }else{
            x = left;
            y = top;
        }

        //绘制背景
        if(storage.image){
            drawBGImage(x, y, style, ctx);
        }else if(storage.background){
            drawBGColor(x, y, style, ctx);
        }

        //绘制文字
        if(storage.innerTextArray){
            drawText(txt, x, y, style, ctx);
        }

        if(storage.rotate || storage.scaleX || storage.scaleY){
            ctx.restore();
        }
    };

    /**
     * 绘制block
     * @param style
     * @param ctx
     */
    var drawBlock = function(style, ctx){

        var storage = style.storage;

        //透明度
        ctx.globalAlpha = style.opacity;
        var x, y;
        var Cos = 1, Sin = 0;
        if(storage.rotate || storage.scaleX || storage.scaleY){
            var rotate = style.rotate;
            ctx.save();
            x = -style.width/2;
            y = -style.height/2;
            Cos = Math.cos(rotate * piToRe) * style.scaleX;
            Sin = Math.sin(rotate * piToRe) * style.scaleY;
            ctx.transform(
                Cos,
                Sin,
                -Sin,
                Cos,
                style.left - x,//style.left + style.width / 2
                style.top - y
            );
        }else{
            x = style.left;
            y = style.top;
        }

        //绘制背景
        if(storage.background){
            drawBGColor(x, y, style, ctx);
        }

        if(storage.rotate || storage.scaleX || storage.scaleY){
            ctx.restore();
        }
    };

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
            if(node.waitDrawing){//等待重新绘制
                //清除画板
                nodeCtx.clearRect(0, 0, style.width, style.height);

                //循环子元素
                var children = node.children;
                var length = children.length;
                for(var i=0; i<length; i++){
                    drawNum += manager.parse(children[i], nodeCtx);
                }
                node.waitDrawing = false;
            }
            if(node.parent){
                drawBlock(style, ctx);
                manager.drawer.drawImage(
                    cache,
                    0,
                    0,
                    cache.width,
                    cache.height,
                    style.left,
                    style.top,
                    cache.width,
                    cache.height,
                    ctx
                );
            }
        }else{//node类型元素
            drawAll(style, ctx);
        }
        return ++drawNum;
    };

    return manager;

})();