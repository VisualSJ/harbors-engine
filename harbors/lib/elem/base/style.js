define(function(require, exports, module){

    var style = function(){};

    style.prototype = {
        constructor: style,

        width: 0,
        height: 0,

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