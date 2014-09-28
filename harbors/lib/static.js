/*
静态变量以及公用变量的定义
 */

/**
 * 引擎主命名空间
 */
var harbors = (function(){

    var engine = function(){

        //一般情况内部使用
        this.BASECLASS = {};
        this.BASENODE = {};

        //可对外使用
        this.utils = {};
    };

    engine.prototype = {

        constructor: engine,

        BROWSER: {
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
        },

        SYSTEM: {
            IOS: "ios",
            ANDROID: "android",
            WINDOWS: "windows",
            MAC: "mac",
            LINUX: "linux",
            UNIX: "unix"
        }
    };

    return new engine();
})();