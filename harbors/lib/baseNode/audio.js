var audio = (function(){

    var audioID = 0;

    var audio = function(path){
        this.audioID = audioID++;

        if(path)
            this.setPath(path);
    };

    audio.prototype.setPath = function(path){
        this.audio = document.createElement("audio");
        this.audioPath = path;
        this.audio.src = path;
    };

    audio.prototype.play = function(){
        this.stop();
        this.audio.play();
    };

    audio.prototype.stop = function(){
        this.audio.load();
    };

    return audio;

})();