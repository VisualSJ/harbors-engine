var HSFontStyleClass = (function(){

    var fontStyle = function(node){
        HSNodeStyleClass.call(this, node);

        this.storage.align = "left";
        this.storage.lineHeight = 14;
        this.storage.fontStyle = "Normal";
        this.storage.fontSize = 14;
        this.storage.fontFamily = "Arial";
        this.storage.innerText = "";//文本对象(字符串)
        this.storage.innerTextWidth = 0;//文本宽度，最长一行的宽

        this.cache.lineHeight = null;
        this.cache.font = null;
        this.cache.innerText = null;//文本数组，每行为一个字符串(数组)
        this.cache.innerTextWidth = 0;//文本宽度，最长一行的宽
    };
    HSUtils.inherit(fontStyle, HSNodeStyleClass);

    fontStyle.prototype.getLeft = function(){
        var storage = this.storage;
        var cache = this.cache;
        var innerTextWidth = cache.innerTextWidth !== null ? cache.innerTextWidth : this.getInnerTextWidth();
        if(storage.align === "center"){
            return cache.left = storage.left  - innerTextWidth/ 2;
        }else if(storage.align === "right"){
            return cache.left = storage.left - innerTextWidth;
        }
        return cache.left = storage.left;
    };

    fontStyle.prototype.getHeight = function(){
        var storage = this.storage;
        var cache = this.cache;
        if(storage.height)
            return cache.height = storage.height;
        if(storage.innerText){
            var txtArr = cache.innerText !== null ? cache.innerText : this.getInnerText();
            var lineHeight = cache.lineHeight !== null ? cache.lineHeight : this.getLineHeight();
            return cache.height = lineHeight * txtArr.length + 4;
        }
        return cache.height = 0;
    };

    fontStyle.prototype.getWidth = function(){
        var storage = this.storage;
        var cache = this.cache;
        if(storage.width !== null)
            return cache.width = storage.width;
        var innerTextWidth = cache.innerTextWidth !== null ? cache.innerTextWidth : this.getInnerTextWidth();
        return cache.width = innerTextWidth;
    };

    fontStyle.prototype.align = function(val){
        var cache = this.cache;
        var storage = this.storage;
        cache.left = null;
        if(storage.width === null){
            cache.width = null;
        }
        storage.align = val;
    };

    fontStyle.prototype.getLineHeight = function(){
        return this.cache.lineHeight = this.storage.lineHeight || this.storage.fontSize;
    };
    fontStyle.prototype.lineHeight = function(val){
        this.cache.lineHeight = null;
        this.storage.lineHeight = val;
    };

    fontStyle.prototype.getFont = function(){
        var storage = this.storage;
        return this.cache.font = storage.fontStyle + " " + storage.fontSize + "px " + storage.fontFamily;
    };
    fontStyle.prototype.font = function(val){
        this.cache.font = null;
        var arg = val.split(" ");
        switch(arg.length){
            case 1:
                this.fontSize(arg[0]);
                break;
            case 2:
                this.fontStyle(arg[0]);
                this.fontSize(arg[1]);
                break;
            case 3:
                this.fontStyle(arg[0]);
                this.fontSize(arg[1]);
                this.fontFamily(arg[2]);
                break;
        }
    };

    fontStyle.prototype.fontStyle = function(val){
        this.cache.font = null;
        this.storage.fontStyle = val;
    };
    fontStyle.prototype.fontSize = function(val){
        this.cache.font = null;
        this.storage.fontSize = val;
    };
    fontStyle.prototype.fontFamily = function(val){
        this.cache.font = null;
        this.storage.fontFamily = val;
    };

    fontStyle.prototype.getInnerText = function(){
        var cache = this.cache;
        var storage = this.storage;
        var ctx = HSDrawManager.drawer.ctx(this.node.parent.cache);
        var txtArr = (""+storage.innerText).split("\n");
        if(storage.width){
            var txt = [];
            var i, j, tmpTxt, totalIndex, currentWidth, strIndex,
                len = txtArr.length,
                width = cache.width !== null ? cache.width : this.getWidth();

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
            return cache.innerText = txt;
        }else{
            //没有限定宽度
            return cache.innerText = txtArr;
        }
    };
    fontStyle.prototype.innerText = function(val){
        var cache = this.cache;
        cache.innerText = null;
        cache.innerTextWidth = null;
        this.storage.innerText = val;
    };

    fontStyle.prototype.getInnerTextWidth = function(){
        var storage = this.storage;
        var cache = this.cache;
        var ctx = HSDrawManager.drawer.ctx(this.node.parent.cache);
        var  width = storage.width;
        if(width){
            return cache.innerTextWidth = width;
        }else{
            var i, len, t;
            var tmpWidth = 0;
            var innerText = cache.innerText !== null ? cache.innerText : this.getInnerText();
            for(i=0, len=innerText.length; i<len; i++){
                t = ctx.measureText(innerText[i]).width;
                if(t > tmpWidth)
                    tmpWidth = t;
            }
            return storage.innerTextWidth = tmpWidth;
        }
    };
    fontStyle.prototype.innerTextWidth = function(val){
        var cache = this.cache;
        cache.innerText = null;
        cache.innerTextWidth = null;
        this.storage.innerText = val;
    };

    return fontStyle;
})();