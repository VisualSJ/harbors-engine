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
        LINUX: "linux",
        UNIX: "unix"
    };

    /**
     * 所有配置的常量
     * @namespace
     */
    module.exports = {
        id: "gameCanvas",
        fps: 60,

        system: {
            name: "",
            version: "",
            language: "",
            isMobile: undefined,
            os: undefined
        }

    };

    var bwr = module.exports.system;
    var ua = navigator.userAgent.toLowerCase();
    var up = navigator.appVersion.toLowerCase();
    var uf = navigator.platform.toLowerCase();
    //判断浏览器类型
    var tmp = "";
    if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1){
        bwr.name = browser.ie;
        tmp = ua.match(/msie ([\d.]+)/);
        if(tmp){
            bwr.version = tmp[1];
        }else{
            tmp = ua.match(/rv:([\d.]+)/);
            bwr.version = tmp ? tmp[1] : undefined;
        }
    }else if (document.getBoxObjectFor){
        bwr.name = browser.firefox;
        bwr.version = ua.match(/firefox\/([\d.]+)/)[1];
    }else if (window.MessageEvent && !document.getBoxObjectFor){
        bwr.name = browser.chrome;
        bwr.version =  ua.match(/chrome\/([\d.]+)/)[1];
    }else if (window.opera) {
        bwr.name = browser.opera;
        bwr.version = ua.match(/opera.([\d.]+)/)[1];
    }else if (window.openDatabase) {
        bwr.name = browser.safari;
        bwr.version = ua.match(/version\/([\d.]+)/)[1];
    }

    //语言类型
    bwr.language = (navigator.browserLanguage || navigator.language).toLowerCase();

    //移动浏览器判断
    bwr.isMobile = (ua.indexOf('mobile') > -1) || (ua.indexOf('android') > -1);

    //操作系统判断
    if(ua.match(/(ipad|iphone|ipod)/)){
        bwr.os = system.IOS;
    }else if(ua.indexOf('android') > -1 || uf.indexOf('android') > -1){
        bwr.os = system.ANDROID;
    }else if(up.indexOf('win') > -1){
        bwr.os = system.WINDOWS;
    }else if(up.indexOf('mac') > -1){
        bwr.os = system.MAC;
    }else if(up.indexOf('x11') > -1){
        bwr.os = system.UNIX;
    }else if(up.indexOf('linux')){
        bwr.os = system.LINUX;
    }

    //判断页面上可用的区域大小
    const getter = require('./compatible/normal');
    bwr.visibleSize = {
        width: getter.visibleWidth(),
        height: getter.visibleHeight()
    };

    //判断canvas大小
    var canvas = document.getElementById(module.exports.id);
    bwr.canvasSize = {
        width: canvas.width,
        height: canvas.height
    };

    //获取画布元素左上角定点距离页面的

});