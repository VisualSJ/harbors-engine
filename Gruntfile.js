const path = require("path");

module.exports = function(grunt) {

    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    var loader = require("./harbors/Entrance");
    var concatList = [];
    concatList.push('harbors/Loader.jsFrag');
    loader.list.forEach(function(item){
        item.forEach(function(file){
            concatList.push(path.join("./harbors", file));
        });
    });
    concatList.push('harbors/Ending.jsFrag');

    console.log(concatList)

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options:{
                debug: false
            },
            handlebars: {
                files: [{
                    expand:true,
                    src : ['harbors/**/*.js', '!harbors/sea.js', '!harbors/Loader.jsFrag', '!harbors/Ending.jsFrag'],
                    dest: 'dist'
                }]

            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: concatList,
                dest: 'harbors-debug.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'harbors.min.js': ['harbors-debug.js']
                }
            }
        },
        clean: ["dist/"]
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('js', function(){
//        grunt.task.run('transport');
        grunt.task.run('concat');
        grunt.task.run('uglify');
//        grunt.task.run('clean');
    });
};