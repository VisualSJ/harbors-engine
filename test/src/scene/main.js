define(function(require, exports){

    var sidebar;


    exports.enter = function(){
        sidebar = h("@sidebar", [
            {
                name: "单元测试",
                callback: function(){
                    console.log(1);
                }
            },{
                name: "渲染测试",
                callback: function(){
                    console.log(2);
                }
            }
        ]).set({
            x: 400,
            y: 700
        });
        h("#canvas").append(sidebar);
    };

    exports.exit = function(){

    };

});