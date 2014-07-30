(function(d, w){

    var h;

    var moduleManager = {},
        loaderList = [];

    var require,
        loader;

    require = function(name){
        if(moduleManager[name])
            return moduleManager[name];
        return null;
    };

    loader = function(uri){
        if(typeof uri === 'string')
            loaderList.push(uri);
    };

    h = function(){};

    var runGame = {
        loadNum: -1,
        cb: function(){
            if(++runGame.loadNum >= loaderList.length){
                console.log("start");
                runGame.loadNum = -1;
            }
        }
    };

    h.runGame = function(){
        //load list
        runGame.cb();
        loaderList.forEach(function(uri){
            var script = d.createElement('script');
            script.onerror = script.onload = runGame.cb;
            script.src= uri;
            d.head.appendChild(script);
        });
    };

    w.h = h;

})(document, window);