(function(block, node, loop){

    var console, line1, line2, line3, infoElem,task, time, info, draw;

    var init = function(harbors){
        if(!h.options.debug){
            return false;
        }
        console = (new block).set({
            width: 200,
            height: 195,
            background: "#222",
            opacity: 0.3,
            zIndex: Number.MAX_VALUE
        });

        line1 = (new node).set({
            color: "#fff",
            left: 10,
            top: 5
        }).text("harbors 0.0.1");

        line2 = (new node).set({
            color: "#fff",
            left: 10,
            top: 25
        }).text(h.options.system.os + "  " + h.options.system.browser + "  " + (h.options.system.version).substr(0, 8) + "...");

        line3 = (new node).set({
            color: "#fff",
            left: 10,
            top: 45
        }).text("time:      draw:         task:");

        infoElem = [];

        for(var i=0; i<6; i++){
            infoElem.push((new node).set({
                color: "#fff",
                left: 10,
                top: 65 + i * 20
            }));
            console.append(infoElem[i]);
        }

        time = (new node).set({
            color: "#fff",
            left: 42,
            top: 45
        }).text("0");

        draw = (new node).set({
            color: "#fff",
            left: 100,
            top: 45
        }).text("0");

        task = (new node).set({
            color: "#fff",
            left: 162,
            top: 45
        }).text("0");

        console.append(line1);
        console.append(line2);
        console.append(line3);

        console.append(time);
        console.append(draw);
        console.append(task);

        h("canvas").append(console);

        info = [];

        h.log = function(str){
            for(var i=1; i<arguments.length; i++){
                switch(typeof arguments[i]){
                    case "string":
                        str = str.replace("%s", arguments[i]);
                        break;
                    case "number":
                        str = str.replace("%d", arguments[i]);
                        break;
                    default:
                        str = str.replace("%s", arguments[i].toString());
                }
            }
            info.push(str);
            while(info.length > 6){
                info.shift();
            }
            for(i=0; i<info.length; i++){
                infoElem[i].text(info[i]);
            }
        };



        var cacheTime = 0;
        loop.getDrawTime = function(num){
            if(cacheTime++ < 30) return;
            cacheTime = 0;
            time && time.text(num);
        };
        var cacheInfo = 0;
        h._getDebugInfo = function(taskLength, drawLength){
            if(cacheInfo++ < 30) return;
            cacheInfo = 0;
            task && task.text(taskLength);
            draw && draw.text(drawLength);
        };

    };

    h.addInitTask(init);

})(HSBlockElement, HSNodeElement, HSLoop);