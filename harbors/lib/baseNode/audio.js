var HSAudioElement = (function(){

    var audioID = 0;

    /**
     * 简易的支持audio
     * @param path
     */
    var audio = function(path){
        this.audioID = audioID++;

        if(path)
            this.setPath(path);
    };

    /**
     * 设置这个audio元素的path
     * @param path
     */
    audio.prototype.setPath = function(path){
        this.audio = document.createElement("audio");
        this.path = path;
        this.audio.src = path;
    };

    /**
     * 播放音频
     */
    audio.prototype.play = function(){
        this.stop();
        this.audio.play();
    };

    /**
     * 停止音频
     */
    audio.prototype.stop = function(){
        this.audio.load();
    };

    return audio;

})();