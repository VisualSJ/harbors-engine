var HSFontElement = (function() {

    /**
     * 一个文字元素
     * @class
     * @extend node
     *
     */
    var font = function () {
        this.uniqueNumber = HSuniqueId++;

        this.parent = null;
        this.style = new HSFontStyleClass(this);
        this.active = false;
        this.animate = false;
    };
    HSUtils.inherit(font, HSNodeElement);

    /**
     * 设置node中的文字对象
     * @param str
     */
    font.prototype.text = function(str){

        if(str !== undefined) {
            this.style.innerText(str);
            this.update();
            return this;
        }else{
            return this.style.storage.innerText;
        }
    };

    return font;

})();