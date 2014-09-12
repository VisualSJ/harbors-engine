define(function(require, exports, module){

    const texture = require('../../texture/manager');

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
         *
         * @property {string} backgroundColor 元素的背景颜色（纯色块）
         * @property {string} backgroundSize 元素的背景大小（当背景图片存在时起作用）
         * @property {string} backgroundImage 元素的背景图片
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

        get width(){return this.storage.width || 0;},
        set width(a){
            this.storage.width = a;
            //如果为block对象，则一起更改cache画布的大小
            if(this.node.cache){
                this.node.cache.width = a;
                this.node.waitDrawing = true;
                this.node.update();
            }
        },


        get height(){return this.storage.height;},
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
                a = texture.createImageTexture(a, this.node);
            }
            a.nodeList.push(this.node);
            this.storage.backgroundImage = a;
        }

    };

    module.exports = style;
});