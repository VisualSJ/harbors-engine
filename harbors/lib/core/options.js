define(function(require, exports, module){

    const browser = {
        chrome: "chrome",
        firefox: "firefox",
        ie: "ie",
        opera: "opera",
        safari: "safari"
    };

    const system = {
        IOS: "ios",
        ANDROID: "android",
        WINDOWS: "windows",
        MAC: "mac",
        LINUX: "linux"
    };

    /**
     * @namespace
     */
    module.exports = {
        id: "gameCanvas",
        fps: 60,

        browser: {
            name: "",
            version: "",
            language: "",
            isMobile: undefined,
            system: undefined
        }

};

    var bwr = module.exports.browser;
    var ua = navigator.userAgent.toLowerCase();
    //判断浏览器类型
    var tmp = "";
    if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1){
        /****IE****/
        bwr.name = browser.ie;
        tmp = ua.match(/msie ([\d.]+)/);
        if(tmp){
            bwr.version = tmp[1];
        }else{
            tmp = ua.match(/rv:([\d.]+)/);
            bwr.version = tmp ? tmp[1] : undefined;
        }
    }else if (document.getBoxObjectFor){
        /****FIREFOX****/
        bwr.name = browser.firefox;
        bwr.version = ua.match(/firefox\/([\d.]+)/)[1];
    }else if (window.MessageEvent && !document.getBoxObjectFor){
        /****CHROME****/
        bwr.name = browser.chrome;
        bwr.version =  ua.match(/chrome\/([\d.]+)/)[1];
    }else if (window.opera) {
        /****OPERA****/
        bwr.name = browser.opera;
        bwr.version = ua.match(/opera.([\d.]+)/)[1];
    }else if (window.openDatabase) {
        /****SAFARI****/
        bwr.name = browser.safari;
        bwr.version = ua.match(/version\/([\d.]+)/)[1];
    }

    //语言类型
    bwr.language = (navigator.browserLanguage || navigator.language).toLowerCase();

    //移动浏览器判断
    bwr.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/)||!!ua.match(/AppleWebKit/);

    //操作系统判断
    if(!!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)){
        bwr.system = system.IOS;
    }else if(ua.indexOf('android') > -1 || ua.indexOf('linux') > -1){
        //todo android终端或者UC浏览器（其他平台上的UC会被误认为android）;
        bwr.system = system.ANDROID;
    }else if(ua.indexOf('windows') > -1){
        bwr.system = system.WINDOWS;
    }
    //todo window mac linux



});