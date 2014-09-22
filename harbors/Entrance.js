define(function(require, exports, module){

    const harbors = require('./lib/core/define');
    const debug = require("./lib/debug/console");

    if(harbors.option.debug)
        debug.init(harbors);

    window.h = harbors;


});