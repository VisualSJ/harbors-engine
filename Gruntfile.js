
module.exports = function(grunt) {

    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

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
                src: ['harbors/Loader.jsFrag', 'dist/**/*.js', 'harbors/Ending.jsFrag'],
                dest: 'dist/built.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'harbors.min.js': ['dist/built.js']
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
        grunt.task.run('transport');
        grunt.task.run('concat');
        grunt.task.run('uglify');
        grunt.task.run('clean');
    });
};