var HSNodeStyleClass = (function(){
    /**
     * node元素中自带的style构造方法
     * @param node
     *
     * @property {node} node 包含这个style的元素
     * @property {object} storage 存放实际的style属性
     */
    var nodeStyle = function(node){
        this.node = node;

        this.storage = {
            left: 0,
            top: 0,
            get x(){return this.left},
            get y(){return this.top},
            right: null,
            bottom: null,
            width: null,
            height: null,
            zIndex: 1,

            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            scale: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            color: "#000",
            opacity: 1,

            image: null,
            imageSizeWidth: 0,
            imageSizeHeight: 0,
            imagePositionLeft: 0,
            imagePositionTop: 0
        };
        this.cache = {
            coordinateX: null,
            coordinateY: null,

            left: null,
            top: null,
            width: null,
            height: null,

            rotate: null,
            scale: null,
            color: null,

            imageSizeWidth: null,
            imageSizeHeight: null

        };
    };

    nodeStyle.prototype.getCoordinateX = function(){
        var cache = this.cache,
            node = this.node.parent;
        var x = cache.left !== null ? cache.left : this.getLeft();
        while(node){
            var nodeCache = node.style.cache;
            x += nodeCache.left !== null ? nodeCache.left : node.style.getLeft();
            node = node.parent;
        }
        return cache.coordinateX = x;
    };

    nodeStyle.prototype.getCoordinateY = function(){
        var cache = this.cache,
            node = this.node.parent;
        var y = cache.top ? cache.top : this.getTop();
        while(node){
            var nodeCache = node.style.cache;
            y += nodeCache.top !== null ? nodeCache.top : node.style.getTop();
            node = node.parent;
        }
        return cache.coordinateY = y;
    };

    nodeStyle.prototype.getLeft = function(){
        var cache = this.cache;
        var storage = this.storage;
        if(storage.right !== null){
            var width = cache.width !== null ? cache.width : this.getWidth();
            return cache.left =  h.canvas.cache.width - storage.right - width;
        }else{
            return cache.left = storage.left;
        }
    };
    nodeStyle.prototype.left = function(val){
        var cache = this.cache;
        cache.left = null;
        cache.coordinateX = null;
        this.storage.left = val;
    };
    nodeStyle.prototype.x = function(val){
        this.left(val);
    };

    nodeStyle.prototype.getTop = function(){
        var cache = this.cache;
        var storage = this.storage;
        if(storage.bottom !== null){
            var height = cache.height !== null ? cache.height : this.getHeight();
            return  cache.top = h.canvas.cache.height - storage.bottom - height;
        }else{
            return cache.top = storage.top;
        }
    };
    nodeStyle.prototype.top = function(val){
        var cache = this.cache;
        cache.top = null;
        cache.coordinateY = null;
        this.storage.top = val;
    };
    nodeStyle.prototype.y = function(val){
        this.top(val);
    };

    nodeStyle.prototype.right = function(){
        var cache = this.cache;
        cache.left = null;
        cache.coordinateX = null;
        this.storage.right = val;
    };

    nodeStyle.prototype.bottom = function(){
        var cache = this.cache;
        cache.top = null;
        cache.coordinateY = null;
        this.storage.bottom = val;
    };

    nodeStyle.prototype.getWidth = function(){
        var storage = this.storage;
        if(storage.width !== null)
            return this.cache.width = storage.width;
        if(storage.image)
            return this.cache.width = storage.image.width;
        return this.cache.width = 0;
    };
    nodeStyle.prototype.width = function(val){
        //如果为block对象，则一起更改cache画布的大小
        var node = this.node;
        if(node.cache){
            node.cache.width = val;
            node.waitDrawing = true;
            node.update();
        }
        this.cache.width = null;
        if(this.storage.right !== null){
            this.cache.left = null;
        }
        this.storage.width = val;
    };

    nodeStyle.prototype.getHeight = function(){
        var storage = this.storage;
        if(storage.height)
            return this.cache.height = storage.height;
        if(storage.image)
            return this.cache.height = storage.image.height;
        return this.cache.height = 0;
    };
    nodeStyle.prototype.height = function(val){
        //如果为block对象，则一起更改cache画布的大小
        var node = this.node;
        if(node.cache){
            node.cache.height = val;
            node.waitDrawing = true;
            node.update();
        }
        this.cache.height = null;
        if(this.storage.bottom !== null){
            this.cache.top = null;
        }
        this.storage.height = val;
    };

    nodeStyle.prototype.zIndex = function(val){
        this.storage.zIndex = val;
    };

    nodeStyle.prototype.rotate = function(val){
        this.storage.rotate = val;
    };

    nodeStyle.prototype.scaleX = function(){
        this.storage.scaleX = val;
    };

    nodeStyle.prototype.scaleY = function(){
        this.storage.scaleY = val;
    };

    nodeStyle.prototype.scale = function(val){
        var x = 1,
            y = 1;
        switch(typeof val){
            case "number":
                x = y = val;
                break;
            case "string":
                var arg = val.split(" ");
                x = arg[0];
                y = arg[1] || arg[0];
                break
        }
        this.scaleX(x);
        this.scaleY(y);
        this.storage.scale = val;
    };

    nodeStyle.prototype.anchorX = function(){
        this.storage.anchorX = val;
    };

    nodeStyle.prototype.anchorY = function(){
        this.storage.anchorY = val;
    };

    nodeStyle.prototype.color = function(val){
        this.storage.color = val;
    };

    nodeStyle.prototype.opacity = function(val){
        this.storage.opacity = val;
    };

    nodeStyle.prototype.background = function(val){
        this.storage.background = val;
    };

    nodeStyle.prototype.image = function(val){
        if(typeof val === 'string'){
            val = HSTextureElement.manager.create(val);
        }

        val.nodeList.push(this.node);
        this.storage.image = val;
    };

    nodeStyle.prototype.getImageSizeWidth = function(){
        return this.cache.imageSizeWidth =
            this.storage.imageSizeWidth ||
            ( this.cache.width !== null ? this.cache.width : this.getWidth());
    };
    nodeStyle.prototype.imageSizeWidth = function(val){
        this.cache.imageSizeWidth = null;
        this.storage.imageSizeWidth = val;
    };

    nodeStyle.prototype.getImageSizeHeight = function(){
        return this.cache.imageSizeHeight =
            this.storage.imageSizeHeight ||
            (this.cache.height !== null ? this.cache.height : this.getHeight());
    };
    nodeStyle.prototype.imageSizeHeight = function(val){
        this.cache.imageSizeHeight = null;
        this.storage.imageSizeHeight = val;
    };

    nodeStyle.prototype.imageSize = function(val){
        var x = 0,
            y = 0;
        switch(typeof val){
            case "number":
                x = y = val;
                break;
            case "string":
                var arg = val.split(" ");
                x = arg[0];
                y = arg[1] || arg[0];
                break
        }
        this.imageSizeWidth(x);
        this.imageSizeHeight(y);
        this.storage.imageSize = val;
    };

    nodeStyle.prototype.imagePositionLeft = function(val){
        this.storage.imagePositionLeft = val;
    };

    nodeStyle.prototype.imagePositionTop = function(val){
        this.storage.imagePositionTop = val;
    };

    nodeStyle.prototype.imagePosition = function(val){
        var x = 0,
            y = 0;
        switch(typeof val){
            case "number":
                x = y = val;
                break;
            case "string":
                var arg = val.split(" ");
                x = arg[0];
                y = arg[1] || arg[0];
                break
        }
        this.imagePositionLeft(x);
        this.imagePositionTop(y);
        this.storage.imagePosition = val;
    };

    return nodeStyle;
})();