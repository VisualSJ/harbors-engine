/**
 * 文件加载器
 * @namespace
 *
 */
var loader = {};

loader.list = [
    [
        "lib/utils.js",
        "lib/static.js"
    ],
    [
        "lib/options.js",
        "lib/baseClass/childList.js",
        "lib/baseClass/event.js",
        "lib/baseClass/styleList.js"
    ],
    [
        "lib/loop.js",
        "lib/baseNode/texture.js",
        "lib/baseNode/node.js",
        "lib/baseNode/audio.js"
    ],
    [
        "lib/baseNode/block.js",
        "lib/manager/viewManager.js",
        "lib/manager/drawManager.js",
        "lib/manager/eventManager.js",
        "lib/manager/textureManager.js",
        "lib/manager/audioManager.js"
    ],
    [
        "lib/manager/elemManager.js",
        "lib/manager/adaptation/chrome.js",
        "lib/manager/drawer/canvas.js"
    ],
    [
        "lib/harbors.js"
    ],
    [
        "lib/debug/console.js"
    ]
];

loader.baseDir = "../harbors/";

loader.getFile = function(modules, callback){
    if(!modules) return;
    var p, total = 0;
    for(p=0; p<modules.length; p++){
        total++;
        (function(){
            var path = modules[p];
            var script = document.createElement("script");
            script.src = loader.baseDir + path;
            document.body.appendChild(script);
            var cb = function(){
                total--;
                if(total === 0){
                    typeof callback == "function" && callback();
                }
                document.body.removeChild(script);
            };
            script.addEventListener("load", cb);
            script.addEventListener("error", cb);
        })();
    }
};

var loadNum = 0;
loader.begin = function(){
    loader.getFile(loader.list[loadNum++], loader.begin);
};

try{
    loader.begin();
}catch(e){
    module.exports = loader;
}