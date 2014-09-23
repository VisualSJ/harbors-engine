define(function(require, exports, module){

    const browser = {
        chrome: "chrome",
        firefox: "firefox",
        ie: "ie",
        opera: "opera",
        safari: "safari",
        micromessage: "微信",
        qqbrowser: "QQ",
        baidu: "百度",
        uc: "UC",
        liebao: "猎豹"
    };

    const system = {
        IOS: "ios",
        ANDROID: "android",
        WINDOWS: "windows",
        MAC: "mac",
        LINUX: "linux",
        UNIX: "unix"
    };

    const getter = require('./compatible/normal');


    /**
     * 所有配置的常量
     * @namespace
     *
     * @property {string} [id=gameCanvas]
     * @property {HTMLCanvasElement} canvas
     * @property {Number} [fps=60]
     * @property {Object} getter
     * @property {Object} system
     * @property {Number} adaptive 自適應屏幕方案 0 - 普通狀態 1 - 縮放填滿全屏
     */
    module.exports = {

        id: "gameCanvas",
        fps: 60,
        getter: getter,
        debug: true,

        /**
         * 引擎系統相關的參數
         * @namespace
         *
         * @property {String} name
         * @property {String} version
         * @property {String} language
         * @property {Boolean} isMobile
         * @property {String} os
         */
        system: {}

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
            bwr.version = tmp ? tmp[1] : "";
        }
    }else if (ua.indexOf("firefox") > -1){
        bwr.name = browser.firefox;
        tmp = ua.match(/firefox\/([\d.]+)/);
        if(tmp){
            bwr.version = tmp[1];
        }else{
            tmp = ua.match(/rv:([\d.]+)/);
            bwr.version = tmp ? tmp[1] : "";
        }
    }else if(ua.indexOf("micromessenger") > -1){
        bwr.name = browser.micromessage;
        tmp = ua.match(/micromessenger\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("mqqbrowser") > -1){
        bwr.name = browser.qqbrowser;
        tmp = ua.match(/mqqbrowser\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("baidubrowser") > -1){
        bwr.name = browser.baidu;
        tmp = ua.match(/baidubrowser\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("ucbrowser") > -1){
        bwr.name = browser.uc;
        tmp = ua.match(/ucbrowser\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("liebaofast") > -1){
        bwr.name = browser.liebao;
        tmp = ua.match(/liebaofast\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("chrome") > -1){
        bwr.name = browser.chrome;
        tmp = ua.match(/chrome\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("oupeng") > -1) {
        bwr.name = browser.opera;
        tmp = ua.match(/oupeng\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("safari") > -1) {
        bwr.name = browser.safari;
        tmp = ua.match(/safari\/([\d.]+)/);
        bwr.version = tmp ? tmp[1] : "";
    }
    bwr.version = bwr.version || "";
    bwr.name = bwr.name || "";
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

    //绑定页面屏幕变化重新计算
    var delayTimer = null;
    window.addEventListener("resize", function(){
        initParam();
        if(module.exports.adaptive){
            clearTimeout(delayTimer);
            delayTimer = setTimeout(h.adaptive, 200);
        }
    });

    /**
     * 屏幕可見區域大小
     * @namespace
     */
    bwr.visibleSize = {};

    var canvas = document.getElementById(module.exports.id);

    /**
     * canvas大小
     * @namespace
     */
    bwr.canvasSize = {};

    /**
     * canvas在x\y軸上的縮放比例
     * @namespace
     */
    bwr.scale = {};

    /**
     * 画布元素距离页面边框的距离
     * @namespace
     */
    bwr.margin = {};

    var initParam = function(scx, scy){
        bwr.canvasSize.width = canvas.width;
        bwr.canvasSize.height = canvas.height;
        bwr.margin.left = getter.marginLeft(canvas);
        bwr.margin.top = getter.marginTop(canvas);
        bwr.visibleSize.width = getter.visibleWidth();
        bwr.visibleSize.height = getter.visibleHeight();
        if(module.exports.adaptive){
            bwr.scale.x = scx//bwr.visibleSize.width / bwr.canvasSize.width;
            bwr.scale.y = scy//bwr.visibleSize.height / bwr.canvasSize.height;
        }else{
            bwr.scale.x = 1;
            bwr.scale.y = 1;
        }
    };
    canvas.changeInit = initParam;

    initParam();
});