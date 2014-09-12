define(function(require, exports, module){

    const inherit = require("../tools/inherit");

    const event = require("./base/event");
    const style = require("./base/style");

    var node = function(){
        this.parent = null;
        this.style = new style(this);
    };

    var css1Argument = function(node, obj){
        for(var p in obj){
            css2Argument(node, p, obj[p]);
        }
    };

    var css2Argument = function(node, key, value){
        node.style[key] = value;
    };

    node.prototype.css = function(a, b){
        //更新需要重新绘制的block状态
        var prevBlock = this.parent;
        while(prevBlock && !prevBlock.waitDrawing){
            prevBlock.waitDrawing = true;
            prevBlock = prevBlock.parent;
        }

        switch(arguments.length){
            case 2:
                css2Argument(this, a, b);
                break;
            case 1:
                css1Argument(this, a);
                break;
        }
    };

    inherit(node, event);

    module.exports = node;

});