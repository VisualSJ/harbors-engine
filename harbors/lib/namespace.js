(function(){

    var engine = function(){
        this.option = HSOption;
        this.utils = HSUtils;

        this.drawManager = HSDrawManager;
        this.elemManager = HSElementManager;
        this.eventManager = HSEventManager;
        this.viewManager = HSViewManager;

        this.node = HSNodeElement;
        this.block = HSBlockElement;
        this.audio = HSAudioElement;
        this.texture = HSTextureElement;
    };

    h.engine = new engine();

})();