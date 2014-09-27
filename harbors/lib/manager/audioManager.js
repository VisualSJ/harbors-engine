var audioManager = (function(){

    //从path到audio的映射
    var pathToAudio = {};

    //从name到audio的映射
    var nameToAudio = {};

    var manager = {};

    manager.createAudio = function(path){
        if(pathToAudio[path]){
            return pathToAudio[path];
        }

        var elem = new audio(path);
        pathToAudio[path] = elem;
        return elem;
    };

    return manager;

})();