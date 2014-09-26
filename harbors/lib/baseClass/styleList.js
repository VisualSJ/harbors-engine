var styleList = (function(){
    /**
     * node元素中自带的style构造方法
     * @param node
     *
     * @property {node} node 包含这个style的元素
     * @property {object} storage 存放实际的style属性
     */
    var styleList = function(node){
        this.node = node;

        /**
         * 样式支持列表
         * @namespace
         * @property {number} width 元素的宽度
         * @property {number} height 元素的高度
         * @property {number} left 元素的左边距，存在时会覆盖右边距
         * @property {number} top 元素的上边距，存在时会覆盖下边距
         * @property {number} right 元素的右边距
         * @property {number} bottom 元素的下边距
         *
         * @property {string} color 颜色值
         * @property {number} opacity 透明度
         * @property {number} zIndex 层级
         *
         * @property {number} rotate 元素的旋转角度
         * @property {number} scaleX 元素的缩放比例
         * @property {number} scaleY 元素的缩放比例
         *
         * @property {string} backgroundColor 元素的背景颜色
         * @property {string|texture} backgroundImage 元素的背景图片
         * @property {number} backgroundSizeWidth 元素的背景图片缩放宽度
         * @property {number} backgroundSizeHeight 元素的背景图片缩放高度
         * @property {number} backgroundPositionLeft 元素的背景图片裁剪的左边距
         * @property {number} backgroundPositionTop 元素的背景图片裁剪的上边距
         *
         * @property {string} align 对齐方式
         * @property {number} lineHeight 对齐方式
         * @property {string} fontFamily 文字的字体名
         * @property {string} fontStyle 文字的样式
         * @property {number} fontSize 文字的大小
         * @property {number} innerTextWidth 文字的寬度（在draw的時候自動填充的值）(没有接口调用)
         * @property {Array} innerTextArray 需要绘制的文字（按行为单位存放）(没有接口调用)
         * @property {Array} innerTextRow 文字的行数（在限定宽度的情况下自动填写）(没有接口调用)
         *
         * @property {number} borderLeftWidth 左边框宽度
         * @property {string} borderLeftStyle 左边框样式
         * @property {string} borderLeftColor 左边框颜色
         * @property {number} borderTopWidth 上边框宽度
         * @property {string} borderTopStyle 上边框样式
         * @property {string} borderTopColor 上边框颜色
         * @property {number} borderRightWidth 右边框宽度
         * @property {string} borderRightStyle 右边框样式
         * @property {string} borderRightColor 右边框颜色
         * @property {number} borderBottomWidth 下边框宽度
         * @property {string} borderBottomstyleList 下边框样式
         * @property {string} borderBottomColor 下边框颜色
         *
         */
        this.storage = {};
    };

    styleList.prototype = {
        constructor: styleList,


        get left(){
            if(this.storage.align === "center"){
                return (this.storage.left || 0)  - this.storage.innerTextWidth/ 2;
            }else if(this.storage.align === "right"){
                return this.storage.left - this.storage.innerTextWidth;
            }
            return this.storage.left || 0;
        },
        set left(a){
            this.storage.left = a;
        },


        get top(){return this.storage.top || 0;},
        set top(a){
            this.storage.top = a;
        },


        get x(){return this.storage.left || 0;},
        set x(a){
            return this.storage.left = a;
        },


        get y(){return this.storage.top || 0;},
        set y(a){
            this.storage.top = a;
        },

        get rotate(){
            return this.storage.rotate || 0;
        },
        set rotate(a){
            this.storage.rotate = parseFloat(a);
        },

        get scale(){
            if(this.storage.scaleX === this.storage.scaleY){
                return this.storage.scaleX || 1;
            }else{
                return this.storage.scaleX || 1 + " " + this.storage.scaleY || 1;
            }
        },
        set scale(a){
            var arg = a.toString().split(" ");
            if(arg.length === 1){
                this.storage.scaleX = this.storage.scaleY = arg[0];
            }else{
                this.storage.scaleX  = arg[0];
                this.storage.scaleY  = arg[1];
            }
        },

        get scaleX (){
            return this.storage.scaleX || 1;
        },
        set scaleX(a){
            this.storage.scaleX = parseFloat(a);
        },

        get scaleY(){
            return this.storage.scaleY || 1;
        },
        set scaleY(a){
            this.storage.scaleY = parseFloat(a);
        },

        get width(){
            if(this.storage.width)
                return this.storage.width;
            if(this.storage.backgroundImage)
                return this.storage.backgroundImage.width;
            if(this.storage.innerTextWidth)
                return this.storage.innerTextWidth;
            return 0;
        },
        set width(a){
            this.storage.width = a;
            //如果为block对象，则一起更改cache画布的大小
            if(this.node.cache){
                this.node.cache.width = a;
                this.node.waitDrawing = true;
                this.node.update();
            }
        },


        get height(){
            if(this.storage.height)
                return this.storage.height;
            if(this.storage.backgroundImage)
                return this.storage.backgroundImage.height;
            if(this.storage.innerTextArray)
                return this.lineHeight * (this.storage.innerTextRow || this.storage.innerTextArray.length) + 4;

            return 0;
        },
        set height(a){
            this.storage.height = a;
            //如果为block对象，则一起更改cache画布的大小
            if(this.node.cache){
                this.node.cache.height = a;
                this.node.waitDrawing = true;
                this.node.update();
            }
        },

        get color(){return this.storage.color || "#000";},
        set color(a){
            this.storage.color = a;
        },

        get opacity(){return this.storage.opacity || 1;},
        set opacity(a){
            this.storage.opacity = parseFloat(a);
        },

        get zIndex(){return this.storage.zIndex || 0;},
        set zIndex(a){
            this.storage.zIndex = parseInt(a);
        },

        get backgroundColor(){return this.storage.backgroundColor || "#FFF";},
        set backgroundColor(a){
            this.storage.backgroundColor = a;
        },

        get backgroundImage(){return this.storage.backgroundImage;},
        set backgroundImage(a){
            if(typeof a === 'string'){
                a = textureManager.createImageTexture(a);
            }

            a.nodeList.push(this.node);
            this.storage.backgroundImage = a;
        },

        get backgroundSize(){
            return this.backgroundSizeWidth + "px " + this.backgroundSizeHeight + "px";
        },
        set backgroundSize(a){
            var arg = a.split(" ");
            if(arg.length === 1){
                this.backgroundSizeWidth = this.backgroundSizeHeight = arg[0];
            }else if(arg.length === 2){
                this.backgroundSizeWidth = arg[0];
                this.backgroundSizeHeight = arg[1];
            }
        },

        get backgroundSizeWidth(){
            return this.storage.backgroundSizeWidth || this.width;
        },
        set backgroundSizeWidth(a){
            this.storage.backgroundSizeWidth = parseInt(a);
        },

        get backgroundSizeHeight(){
            return this.storage.backgroundSizeHeight || this.height;
        },
        set backgroundSizeHeight(a){
            this.storage.backgroundSizeHeight = parseInt(a);
        },

        get backgroundPosition(){
            return this.backgroundPositionLeft + "px " + this.backgroundPositionTop + "px";
        },
        set backgroundPosition(a){
            var arg = a.split(" ");
            if(arg.length === 1){
                this.backgroundPositionLeft = this.backgroundPositionTop = arg[0];
            }else if(arg.length === 2){
                this.backgroundPositionLeft = parseInt(arg[0]);
                this.backgroundPositionTop = parseInt(arg[1]);
            }
        },

        get backgroundPositionLeft(){
            return this.storage.backgroundPositionLeft || 0;
        },
        set backgroundPositionLeft(a){
            this.storage.backgroundPositionLeft = parseInt(a);
        },

        get backgroundPositionTop(){
            return this.storage.backgroundPositionTop || 0;
        },
        set backgroundPositionTop(a){
            this.storage.backgroundPositionTop = parseInt(a);
        },

        get align(){return this.storage.align || "left";},
        set align(a){
            this.storage.align = a;
        },

        get lineHeight(){
            return this.storage.lineHeight || this.fontSize;
        },
        set lineHeight(a){
            this.storage.lineHeight = parseInt(a);
        },

        get font(){
            return this.fontStyle + " " + this.fontSize + "px " + this.fontFamily;
        },
        set font(a){
            var arg = a.split(" ");
            switch(arg.length){
                case 1:
                    this.fontSize = arg[0];
                    break;
                case 2:
                    this.fontStyle = arg[0];
                    this.fontSize = arg[1];
                    break;
                case 3:
                    this.fontStyle = arg[0];
                    this.fontSize = arg[1];
                    this.fontFamily = arg[2];
                    break;

            }
        },

        get fontStyle(){
            return this.storage.fontStyle || "Normal";
        },
        set fontStyle(a){
            this.storage.fontStyle = a;
        },

        get fontSize(){
            return this.storage.fontSize || 14;
        },
        set fontSize(a){
            this.storage.fontSize = parseInt(a);
        },

        get fontFamily(){
            return this.storage.fontFamily || "Arial";
        },
        set fontFamily(a){
            this.storage.fontFamily = a.toString();
        }

    };

    return styleList;
})();