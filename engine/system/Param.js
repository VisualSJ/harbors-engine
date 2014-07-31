define(function(require, exports, module){

    var Static = require('./Static');

    var sysParam = function(){
        this.browse = null;
        this.version = null;
        this.screenWidth = 0;
        this.screenHeight = 0;
    };

    sysParam.prototype.init = function(){
        var ua = navigator.userAgent.toLowerCase();
        var result;
        //ie
        if(result = /(msie) ([\w.]+)/.exec(ua)){
            this.browse = Static.Browser.ie;
        }else
        //chrome
        if(result = /(chrome)[ \/]([\w.]+)/.exec(ua)){
            this.browse = Static.Browser.chrome;
        }else
        //firefox
        if(result = /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua)){
            this.browse = Static.Browser.firefox;
        }else
        //opera
        if(result = /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua)){
            this.browse = Static.Browser.opera;
        }
        this.version = result[2];
    };

    //system param
    module.exports = new sysParam();

});