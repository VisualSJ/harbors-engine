define(function(require){

    h.adaptive(4);
    require("./widget/sidebar");

    var manager = {
        //場景列表
        scene: {
            main: require("./scene/main"),
            baseClass: require("./scene/baseClass")
        },
        //當前運行的場景
        current: null
    };

    var changeScene = function(name){
        if(manager.current)
            manager.current.exit();

        manager.scene[name].enter(changeScene);
    };

    changeScene("main");

});