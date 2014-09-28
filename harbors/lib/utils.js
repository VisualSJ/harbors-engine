/**
 * 工具集
 * @namepace
 * @property inherit 继承方法
 * @property pathJoin 拼接两个路径
 *
 */
harbors.utils.inherit = function(ctor, superCtor){
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

harbors.utils.pathJoin = function(a, b){
    var path = a + b;
    path = path.replace(/([^\/]+\/[^\/]+\/[^\/]+)\.\.\/\.\.\//g, "");
    path = path.replace(/([^\/]+\/[^\/]+)\.\.\//g, "");
    path = path.replace(/[^\/]+\.\//g, "");
    return path;
};