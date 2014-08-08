var harbors;
(function(harbors){

    var jsList = [
        "harbors.js",

        "compatible/define/bind.js",
        "compatible/integration/animationFrame.js",

        "system/browse.js",
        "system/device.js",
        "system/keyboard.js",

        "utils/path.js",
        "utils/inherit.js",

        "frameworks/director.js",
        "frameworks/manager/blockManager.js",
        "frameworks/manager/drawManager.js",
        "frameworks/manager/spriteManager.js",
        "frameworks/manager/transformManager.js",

        "base-class/node.js",
        "base-class/events/event.js",
        "base-class/styles/style.js",
        "base-class/type/childNodes.js",

        "node/blocks/block.js",
        "node/inlines/sprite.js"
    ];

    var js = document.scripts;
    var jsPath;
    for(var i=js.length;i>0;i--){
        if(js[i-1].src.indexOf("launcher.js")>-1){
            jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
            break;
        }
    }

    var loadNum = 0;
    var mainCallback, mainOptions;

    harbors.run = function(callback, options){
        mainCallback = callback;
        mainOptions = options;
    };

    jsList.forEach(function(file){
        var script = document.createElement("script");
        script.onload = script.onerror = function(){
            document.head.removeChild(script);
            if(++loadNum == jsList.length){
                harbors.run(mainCallback, mainOptions);
            }
        };
        script.aysnc = false;
        script.src = jsPath + file;
        document.head.appendChild(script);
    });

})(harbors = harbors || {});
