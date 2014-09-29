define(function(){

    var sidebar = function(arr){
        this.list = arr;
        h.engine.BASENODE.block.call(this);
        init.call(this);
    };
    h.utils.inherit(sidebar, h.engine.BASENODE.block);

    var init = function(){
        var self = this;
        this.set({
            width: 60,
            height: 60
        });
        //按钮
        var btn = h("@node").set({
            backgroundImage: "./res/mainBtn.png",
            width: 60,
            height: 60
        });
        this.append(btn);
        //列表
        var list = h("@block").set({
            backgroundColor: "#666"
        });

        for(var i=0; i<this.list.length; i++){
            (function(item){
                var tmp = h("@node").text(item.name).on("touchUp", function(){
                    item.callback();
                }).set({
                    x: 20,
                    y: 10 + i * 25
                });
                list.append(tmp);
            })(this.list[i]);
        }

        this.on("touchDown", function(){
            btn.set({backgroundPosition: "0 60"});
            list.set({
                x: self.get("x") + 55,
                y: self.get("y"),
                width: 5,
                height: 0
            });
            list.to({
                height: 250,
                y: list.get("y") - 250
            }, 500, function(){
                list.to({
                    width: 105,
                    x: list.get("x") - 100
                }, 500);
            });
            h("#canvas").append(list);
        });
        this.on("touchUp", function(){
            btn.set({backgroundPosition: "0 0"});
        });
    };

    sidebar.manager = {
        create: function(arr){
            return new sidebar(arr);
        }
    };

    h.engine.elemManager.defineNode("sidebar", sidebar);

});