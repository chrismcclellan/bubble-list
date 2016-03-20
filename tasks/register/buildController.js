module.exports = function(grunt) {

    var _log = grunt.log.writeln;
    var _verbose = grunt.fail.warn;
    var async = require('async');
    var path = require('path');
    var _ = require('lodash');
    var controller_path = '../../assets/scripts/controllers/controller';
    var config = require(path.join(__dirname, controller_path + '.config.json'));

    grunt.registerTask('buildController', 'Converts client controller object into require statements. helps chunk the client side code.', function() {


        var template = grunt.file.read(path.join(__dirname, controller_path + '.template.js'), 'utf8');

        var statements = "";

        for (var key in config) {
            statements += "\t" + key + ': function() { var args = _args(arguments); require.ensure([], function(require) { require(["' + config[key] + '"], function(P) { _init(P, args); }); }); },' + "\n";
        }

        var resp = template.replace("/* functions */", statements);

        grunt.file.write('./assets/scripts/controllers/controller.build.js', resp);

    });

};
