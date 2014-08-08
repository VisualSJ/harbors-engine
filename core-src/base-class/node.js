(function(Class){

    var node = function(){

        this.style = new Class.style();
        this.childNodes = new Class.childNodes();
    };

    node.prototype.parentNode = null;
    node.prototype.children = null;

    Class.node = node;

})(harbors.Class);