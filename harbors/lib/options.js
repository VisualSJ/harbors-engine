harbors.options = (function(){

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
    var option = {

        id: "gameCanvas",
        fps: 60,
        getter: null,
        debug: false,

        /**
         * 引擎系統相關的參數
         * @namespace
         *
         * @property {String} browser
         * @property {String} version
         * @property {String} language
         * @property {Boolean} isMobile
         * @property {String} os
         */
        system: {}

    };

    var sys = option.system;
    var ua = navigator.userAgent.toLowerCase();
    var up = navigator.appVersion.toLowerCase();
    var uf = navigator.platform.toLowerCase();

    ////////////////////
    //判断浏览器类型//
    ////////////////////
    var tmp = "";
    if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1){
        sys.browser = harbors.BROWSER.ie;
        tmp = ua.match(/msie ([\d.]+)/);
        if(tmp){
            sys.version = tmp[1];
        }else{
            tmp = ua.match(/rv:([\d.]+)/);
            sys.version = tmp ? tmp[1] : "";
        }
    }else if (ua.indexOf("firefox") > -1){
        sys.browser = harbors.BROWSER.firefox;
        tmp = ua.match(/firefox\/([\d.]+)/);
        if(tmp){
            sys.version = tmp[1];
        }else{
            tmp = ua.match(/rv:([\d.]+)/);
            sys.version = tmp ? tmp[1] : "";
        }
    }else if(ua.indexOf("micromessenger") > -1){
        sys.browser = harbors.BROWSER.micromessage;
        tmp = ua.match(/micromessenger\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("mqqbrowser") > -1){
        sys.browser = harbors.BROWSER.qqbrowser;
        tmp = ua.match(/mqqbrowser\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("baidubrowser") > -1){
        sys.browser = harbors.BROWSER.baidu;
        tmp = ua.match(/baidubrowser\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("ucbrowser") > -1){
        sys.browser = harbors.BROWSER.uc;
        tmp = ua.match(/ucbrowser\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if(ua.indexOf("liebaofast") > -1){
        sys.browser = harbors.BROWSER.liebao;
        tmp = ua.match(/liebaofast\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("chrome") > -1){
        sys.browser = harbors.BROWSER.chrome;
        tmp = ua.match(/chrome\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("oupeng") > -1) {
        sys.browser = harbors.BROWSER.opera;
        tmp = ua.match(/oupeng\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }else if (ua.indexOf("safari") > -1) {
        sys.browser = harbors.BROWSER.safari;
        tmp = ua.match(/safari\/([\d.]+)/);
        sys.version = tmp ? tmp[1] : "";
    }
    sys.version = sys.version || "";
    sys.browser = sys.browser || "";

    /////////////
    //语言类型//
    /////////////
    sys.language = (navigator.browserLanguage || navigator.language).toLowerCase();

    ////////////////////
    //移动浏览器判断//
    ////////////////////
    sys.isMobile = (ua.indexOf('mobile') > -1) || (ua.indexOf('android') > -1);

    //////////////////
    //操作系统判断//
    //////////////////
    if(ua.match(/(ipad|iphone|ipod)/)){
        sys.os = harbors.SYSTEM.IOS;
    }else if(ua.indexOf('android') > -1 || uf.indexOf('android') > -1){
        sys.os = harbors.SYSTEM.ANDROID;
    }else if(up.indexOf('win') > -1){
        sys.os = harbors.SYSTEM.WINDOWS;
    }else if(up.indexOf('mac') > -1){
        sys.os = harbors.SYSTEM.MAC;
    }else if(up.indexOf('x11') > -1){
        sys.os = harbors.SYSTEM.UNIX;
    }else if(up.indexOf('linux')){
        sys.os = harbors.SYSTEM.LINUX;
    }

    /**
     * 屏幕可見區域大小
     * @namespace
     */
    sys.visibleSize = {};

    var canvas = document.getElementById(option.id);

    /**
     * canvas大小
     * @namespace
     */
    sys.canvasSize = {};

    /**
     * canvas在x\y軸上的縮放比例
     * @namespace
     */
    sys.scale = {};

    /**
     * 画布元素距离页面边框的距离
     * @namespace
     */
    sys.margin = {};

    option.initOption = function(scx, scy){
        sys.canvasSize.width = canvas.width;
        sys.canvasSize.height = canvas.height;
        sys.margin.left = option.getter.marginLeft(canvas);
        sys.margin.top = option.getter.marginTop(canvas);
        sys.visibleSize.width = option.getter.visibleWidth();
        sys.visibleSize.height = option.getter.visibleHeight();
        if(option.adaptive){
            sys.scale.x = scx;
            sys.scale.y = scy;
        }else{
            sys.scale.x = 1;
            sys.scale.y = 1;
        }
    };

    //绑定页面屏幕变化重新计算
    var delayTimer = null;
    window.addEventListener("resize", function(){
        option.initOption();
        if(option.adaptive){
            clearTimeout(delayTimer);
            delayTimer = setTimeout(h.adaptive, 200);
        }
    });

    return option;

})();