define(function(require, exports, module){

    var style = function(node){
        this.node = node;
    };

    style.prototype = {
        constructor: style,

        _width: 0,
        get width(){return this._width;},
        set width(a){
            this._width = a;
            if(this.node.cache){
                this.node.cache.width = a;
                this.node.waitDrawing = true;
            }
        },
        _height: 0,
        get height(){return this._height;},
        set height(a){
            this._height = a;
            if(this.node.cache){
                this.node.cache.height = a;
                this.node.waitDrawing = true;
            }
        },

        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        borderLeftWidth: 0,
        borderLeftColor: "#000",
        borderLeftStyle: "solid",

        borderTopWidth: 0,
        borderTopColor: "#000",
        borderTopStyle: "solid",

        borderRightWidth: 0,
        borderRightColor: "#000",
        borderRightStyle: "solid",

        borderBottomWidth: 0,
        borderBottomColor: "#000",
        borderBottomStyle: "solid",

        backgroundColor: "#FFF",
        backgroundSize: null,
        backgroundImage: null

    };

    module.exports = style;
});