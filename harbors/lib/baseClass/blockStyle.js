var HSBlockStyleClass = (function() {

    var blockStyle = function (node) {
        HSNodeStyleClass.call(this, node);
    };
    HSUtils.inherit(blockStyle, HSNodeStyleClass);

    var clearNodeCoordinateX = function(node){
        node.style.cache.coordinateX = null;
        var i = 0,
            children = node.children;
        if(!children) return;
        var len = children.length;
        for(;i<len;i++){
            clearNodeCoordinateX(children[i]);
        }
    };
    var clearNodeCoordinateY = function(node){
        node.style.cache.coordinateY = null;
        var i = 0,
            children = node.children;
        if(!children) return;
        var len = children.length;
        for(;i<len;i++){
            clearNodeCoordinateY(children[i]);
        }
    };

    blockStyle.prototype.left = function(val){
        var cache = this.cache;
        cache.left = null;
        clearNodeCoordinateX(this.node);
        this.storage.left = val;
    };
    blockStyle.prototype.top = function(val){
        var cache = this.cache;
        cache.top = null;
        clearNodeCoordinateY(this.node);
        this.storage.top = val;
    };

    return blockStyle;
})();