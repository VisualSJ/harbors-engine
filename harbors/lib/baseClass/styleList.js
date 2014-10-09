var HSStyleListClass = (function(){
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
         * @property {number} anchorX
         * @property {number} anchorY
         *
         * @property {string} background 元素的背景颜色
         * @property {string|texture} image 元素的背景图片
         * @property {number} imageSizeWidth 元素的背景图片缩放宽度
         * @property {number} imageSizeHeight 元素的背景图片缩放高度
         * @property {number} imagePositionLeft 元素的背景图片裁剪的左边距
         * @property {number} imagePositionTop 元素的背景图片裁剪的上边距
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

        get coordinateX(){
            var x = this.left,
                node = this.node.parent;
            while(node){
                x += node.style.x;
                node = node.parent;
            }
            return x;
        },
        get coordinateY(){
            var y = this.top,
                node = this.node.parent;
            while(node){
                y += node.style.y;
                node = node.parent;
            }
            return y;
        },

        get left(){
            var storage = this.storage;
            if(storage.innerTextArray){
                if(storage.align === "center"){
                    return (storage.left || 0)  - storage.innerTextWidth/ 2;
                }else if(storage.align === "right"){
                    return storage.left - storage.innerTextWidth;
                }
            }
            return storage.left || 0;
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
            var storage = this.storage;
            if(storage.scaleX === storage.scaleY){
                return storage.scaleX || 1;
            }else{
                return storage.scaleX || 1 + " " + storage.scaleY || 1;
            }
        },
        set scale(a){
            var storage = this.storage;
            var arg = a.toString().split(" ");
            if(arg.length === 1){
                storage.scaleX = storage.scaleY = arg[0];
            }else{
                storage.scaleX  = arg[0];
                storage.scaleY  = arg[1];
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

        get anchorX(){
            return this.storage.anchorX || 0.5;
        },
        set anchorX(a){
            this.storage.anchorX = parseFloat(a);
        },

        get anchorY(){
            return this.storage.anchorY || 0.5;
        },
        set anchorY(a){
            this.storage.anchorY = parseFloat(a);
        },

        get width(){
            var storage = this.storage;
            if(storage.width)
                return storage.width;
            if(storage.image)
                return storage.image.width;
            if(storage.innerTextWidth)
                return storage.innerTextWidth;
            return 0;
        },
        set width(a){
            var node = this.node;
            this.storage.width = a;
            //如果为block对象，则一起更改cache画布的大小
            if(node.cache){
                node.cache.width = a;
                node.waitDrawing = true;
                node.update();
            }
        },


        get height(){
            var storage = this.storage;
            if(storage.height)
                return storage.height;
            if(storage.image)
                return storage.image.height;
            if(storage.innerTextArray)
                return this.lineHeight * (storage.innerTextRow || storage.innerTextArray.length) + 4;

            return 0;
        },
        set height(a){
            var node = this.node;
            this.storage.height = a;
            //如果为block对象，则一起更改cache画布的大小
            if(node.cache){
                node.cache.height = a;
                node.waitDrawing = true;
                node.update();
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

        get background(){return this.storage.background || "#FFF";},
        set background(a){
            this.storage.background = a;
        },

        get image(){return this.storage.image;},
        set image(a){
            if(typeof a === 'string'){
                a = HSTextureElement.manager.create(a);
            }

            a.nodeList.push(this.node);
            this.storage.image = a;
        },

        get imageSize(){
            return this.imageSizeWidth + "px " + this.imageSizeHeight + "px";
        },
        set imageSize(a){
            var arg = a.split(" ");
            if(arg.length === 1){
                this.imageSizeWidth = this.imageSizeHeight = arg[0];
            }else if(arg.length === 2){
                this.imageSizeWidth = arg[0];
                this.imageSizeHeight = arg[1];
            }
        },

        get imageSizeWidth(){
            return this.storage.imageSizeWidth || this.width;
        },
        set imageSizeWidth(a){
            this.storage.imageSizeWidth = parseInt(a);
        },

        get imageSizeHeight(){
            return this.storage.imageSizeHeight || this.height;
        },
        set imageSizeHeight(a){
            this.storage.imageSizeHeight = parseInt(a);
        },

        get imagePosition(){
            return this.imagePositionLeft + "px " + this.imagePositionTop + "px";
        },
        set backgroundPosition(a){
            var arg = a.split(" ");
            if(arg.length === 1){
                this.imagePositionLeft = this.imagePositionTop = arg[0];
            }else if(arg.length === 2){
                this.imagePositionLeft = parseInt(arg[0]);
                this.imagePositionTop = parseInt(arg[1]);
            }
        },

        get imagePositionLeft(){
            return this.storage.imagePositionLeft || 0;
        },
        set imagePositionLeft(a){
            this.storage.imagePositionLeft = parseInt(a);
        },

        get imagePositionTop(){
            return this.storage.imagePositionTop || 0;
        },
        set imagePositionTop(a){
            this.storage.imagePositionTop = parseInt(a);
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