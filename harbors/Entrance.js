/**
 * 文件加载器
 * @namespace
 *
 */
var loader = {};

loader.list = [
    [
        "lib/static.js"
    ],
    [
        "lib/utils.js"
    ],
    [
        "lib/options.js",
        "lib/baseClass/event.js",
        "lib/baseClass/nodeStyle.js"
    ],
    [
        "lib/loop.js",
        "lib/baseClass/fontStyle.js",
        "lib/baseNode/texture.js",
        "lib/baseNode/node.js",
        "lib/baseNode/audio.js"
    ],
    [
        "lib/baseNode/font.js",
        "lib/baseNode/block.js",
        "lib/manager/viewManager.js",
        "lib/manager/drawManager.js",
        "lib/manager/eventManager.js"
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
        "lib/namespace.js",
        "lib/debug/console.js"
    ]
];

loader.extension = [
    "extension/cmd.js"
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
    loader.list.push(loader.extension);
}catch(e){
    module.exports = loader;
}