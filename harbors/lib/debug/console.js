define(function(require, exports, module){

    const node = require("../elem/node");
    const block = require("../elem/block");
    const options = require("../core/options");

    var console, line1, line2, line3, infoElem,fps, drawTime, info;

    exports.init = function(harbors){
        console = (new block).set({
            width: 200,
            height: 195,
            backgroundColor: "#222",
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
        }).text(harbors.option.system.os + "  " + harbors.option.system.name + "  " + (harbors.option.system.version).substr(0, 8) + "...");

        line3 = (new node).set({
            color: "#fff",
            left: 10,
            top: 45
        }).text("fps:          draw time:");

        infoElem = [];

        for(var i=0; i<6; i++){
            infoElem.push((new node).set({
                color: "#fff",
                left: 10,
                top: 65 + i * 20
            }));
            console.append(infoElem[i]);
        }

        fps = (new node).set({
            color: "#fff",
            left: 40,
            top: 45
        }).text("60");

        drawTime = (new node).set({
            color: "#fff",
            left: 140,
            top: 45
        }).text("13");

        console.append(line1);
        console.append(line2);
        console.append(line3);

        console.append(fps);
        console.append(drawTime);

        harbors("#canvas").append(console);

        info = [];

        harbors.log = function(str){
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
    };

    exports.showFPS = function(num){
        fps.text(num);
    };

    exports.showDrawTime = function(num){
        drawTime.text(num)
    };


});