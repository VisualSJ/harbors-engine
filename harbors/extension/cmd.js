(function(w){

    w.__defineModuleName = null;

    var module = {};

    var loadList = [];
    var loadNum = 0;

    /**
     * 拼接路径
     * @param a
     * @param b
     * @returns {XML|string|void}
     */
    var joinPath = function(a, b){
        var path = a.replace(/(\/)?[^\/]+$/, "");//去除a后面的文件或者接口名字

        while(/^\.\.\//.test(b)){
            b = b.replace(/^\.\.\//, "");
            path = path.replace(/(\/)?[^\/]+$/, "");
        }

        b = b.replace(/^(\.)?\//, "");

        path += "\/" + b;

        if(!/\.js$/.test(path))
            path += ".js";

        return path;

    };

    /**
     * 获取一个js文件
     */
    var getScript = function(){
        var path = loadList[loadNum];
        if(!path)
            return runModule();
        w.__defineModuleName = path;
        module[path] = {};
        var script = document.createElement("script");
        script.src = path;
        script.addEventListener("load", function(){
            loadNum++;
            getScript();
        });
        script.addEventListener("error", function(){
            loadNum++;
            getScript();
        });
        document.body.appendChild(script);
    };

    /**
     * 清除已经加载的模块中的某个依赖
     * @param id
     */
    var clearDeps = function(id){
        for(var p in module){
           var mItem = module[p];
            if(!mItem.deps) continue;
            for(var i=0; i<mItem.deps.length; i++){
                if(mItem.deps[i] === id){
                    mItem.deps.splice(i, 1);
                    break;
                }
            }
        }
    };

    var runModule = function(){
        var checkL = 1;
        var checkN = true;
        while(checkL && checkN){
            checkL = 0;
            checkN = false;
            for(var p in module){
                var mItem = module[p];
                if(mItem.deps){
                    if(mItem.deps.length === 0){
                        checkN = true;
                        mItem.callback(mItem.require, mItem.exports, mItem);
                        //清除其他模块中对自己的依赖
                        clearDeps(mItem.id);
                        delete mItem.callback;
                        delete mItem.deps;
                        delete mItem.require;
                    }else{
                        checkL++;
                    }
                }
            }
        }
    };

    h.define = function(){
        var id, deps, callback;
        Array.prototype.forEach.call(arguments, function(arg){
            var type = typeof arg;
            if(type === 'string'){
                id = arg;
            }else if(type === 'Object'){
                deps = arg;
            }else if(type === 'function'){
                callback = arg;
            }
        });

        if(!id){
            id = w.__defineModuleName;
        }
        w.__defineModuleName = null;

        //如果依赖不存在，自动提取
        if(!deps){
            deps = [];
            callback.toString().replace(/require\((.+)\)/g, function(a, b){
                b = b.replace(/(^(\"|\')|(\"|\')$)/g, "");
                b = joinPath(id, b);
                deps.push(b);
            });
        }

        //存入模块缓存
        module[id] = {
            id: id,
            deps: deps,
            callback: callback,
            exports: {},
            require: function(path){
                var mName = joinPath(id, path);
                if(module[mName])
                    return module[mName].exports;
                else
                    return null;
            }
        };

        //循环依赖，取出还未加载的文件进行加载
        for(var i=0; i<deps.length; i++){
            var mName = deps[i];
            if(!module[mName]){
                loadList.push(mName);
            }
        }


    };

    //插入初始化任务列表
    h.addInitTask(function(path){
        if(path){
            loadList.push(path + ".js");
            getScript();
        }
    });

    if(!window.define){
        w.define = h.define;
    }
})(window);