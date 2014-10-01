(function(){

    var engine = function(){
        this.option = HSOption;
        this.drawManager = HSDrawManager;
        this.elemManager = HSElementManager;
        this.eventManager = HSEventManager;
        this.viewManager = HSViewManager;

        this.HSNodeElement = HSNodeElement;
        this.HSBlockElement = HSBlockElement;
        this.HSAudioElement = HSAudioElement;
        this.HSTextureElement = HSTextureElement;
    };

    h.engine = new engine();

})();