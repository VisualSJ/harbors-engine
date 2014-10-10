var HSFontStyleClass = (function(){

    var fontStyle = function(node){
        this.node = node;

        /**
         * @property {string} align 对齐方式
         * @property {number} lineHeight 对齐方式
         * @property {string} fontFamily 文字的字体名
         * @property {string} fontStyle 文字的样式
         * @property {number} fontSize 文字的大小
         * @property {number} innerTextWidth 文字的寬度（在draw的時候自動填充的值）(没有接口调用)
         * @property {Array} innerTextArray 需要绘制的文字（按行为单位存放）(没有接口调用)
         * @property {Array} innerTextRow 文字的行数（在限定宽度的情况下自动填写）(没有接口调用)
         */
        this.storage = {};
    };
    HSUtils.inherit(fontStyle, HSNodeStyleClass);


    return fontStyle;
})();