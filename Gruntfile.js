const path = require("path");

module.exports = function(grunt) {

    var transport = require('grunt-cmd-transport');

    var loader = require("./harbors/Entrance");
    var concatList = [];
    concatList.push('harbors/Loader.jsFrag');
    loader.list.forEach(function(item){
        item.forEach(function(file){
            concatList.push(path.join("./harbors", file));
        });
    });
    concatList.push('harbors/Ending.jsFrag');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            core: {
                src: concatList,
                dest: 'harbors-debug.js'
            }
        },

        uglify: {
            core: {
                files: {
                    'harbors.min.js': ['harbors-debug.js']
                }
            },
            define: {
                files: {
                    'harbors-cmd.js': ['./harbors/extension/cmd.js']
                }
            }
        },
        clean: ["harbors-debug.js"]
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', function(){
        grunt.task.run('concat');
        grunt.task.run('uglify');
        grunt.task.run('clean');
    });
};