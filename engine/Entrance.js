define(function(require, exports, module){

    var sysParam = require('./system/Param');

    sysParam.init();

    window.r = sysParam;

});