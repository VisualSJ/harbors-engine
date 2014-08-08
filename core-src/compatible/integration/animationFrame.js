window.requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(function() { callback(); },
            1000 / 60);
    };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function(id){
        clearTimeout(id);
    };