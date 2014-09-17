define(function(require, exports, module){

    const texture = require('../../core/texture');

    /**
     * @param node
     *
     * @property {node} node 包含这个style的元素
     * @property {object} storage 存放实际的style属性
     */
    var style = function(node){
        this.node = node;

        /**
         * @namespace
         * @property {number} width 元素的宽度
         * @property {number} height 元素的高度
         * @property {number} left 元素的左边距，存在时会覆盖右边距
         * @property {number} top 元素的上边距，存在时会覆盖下边距
         * @property {number} right 元素的右边距
         * @property {number} bottom 元素的下边距
         *
         * @property {number} rotate 元素的旋转角度
         *
         * @property {string} backgroundColor 元素的背景颜色
         * @property {string|texture} backgroundImage 元素的背景图片
         * @property {number} backgroundSizeWidth 元素的背景图片缩放宽度
         * @property {number} backgroundSizeHeight 元素的背景图片缩放高度
         *
         * @property {string} align 对齐方式
         * @property {string} color 颜色值
         * @property {string} fontFamily 文字的字体名
         * @property {string} fontStyle 文字的样式
         * @property {number} fontSize 文字的大小
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
         * @property {string} borderBottomStyle 下边框样式
         * @property {string} borderBottomColor 下边框颜色
         *
         */
        this.storage = {};
    };

    style.prototype = {
        constructor: style,


        get left(){return this.storage.left || 0;},
        set left(a){
            this.storage.left = a;
        },


        get top(){return this.storage.top || 0;},
        set top(a){
            this.storage.top = a;
        },


        get right(){return this.storage.right || 0;},
        set right(a){
            this.storage.right = a;
        },


        get bottom(){return this.storage.bottom || 0;},
        set bottom(a){
            this.storage.bottom = a;
        },

        get rotate(){
            return this.storage.rotate || 0;
        },
        set rotate(a){
            this.storage.rotate = parseFloat(a);
        },

        get width(){
            if(this.storage.width)
                return this.storage.width;
            if(this.storage.backgroundImage)
                return this.storage.backgroundImage.width;

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


        get backgroundColor(){return this.storage.backgroundColor || "#FFF";},
        set backgroundColor(a){
            this.storage.backgroundColor = a;
        },

        get backgroundImage(){return this.storage.backgroundImage;},
        set backgroundImage(a){
            if(typeof a === 'string'){
                a = texture.createImageTexture(a);
            }

            a.nodeList.push(this.node);
            this.storage.backgroundImage = a;
        },

        get backgroundSize(){

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

        get color(){return this.storage.color || "#000";},
        set color(a){
            this.storage.color = a;
        },

        get align(){return this.storage.align || "left";},
        set align(a){
            this.storage.align = a;
        },

        get font(){
            return this.fontStyle + " " + this.fontSize + " " + this.fontFamily;
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

        get fontStyle(){return this.storage.fontStyle || "Normal";},
        set fontStyle(a){
            this.storage.fontStyle = a;
        },

        get fontSize(){return this.storage.fontSize || 14;},
        set fontSize(a){
            this.storage.fontSize = parseInt(a);
        },

        get fontFamily(){return this.storage.fontFamily || "";},
        set fontFamily(a){
            this.storage.fontFamily = a.toString();
        }

    };

    module.exports = style;
});