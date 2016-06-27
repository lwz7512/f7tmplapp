module.exports = function(grunt) {

  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          baseUrl: './src',
          dir: './build',
          modules: [
              {
                  name: 'app',
                  include: ['text', 'hbs']
              }
          ],
          fileExclusionRegExp: /^(r|build)\.js$/,
          optimizeCss: 'standard',
          removeCombined: true,
          paths: {
            handlebars: "js/lib/handlebars",
            text: "js/lib/text",
            hbs: "js/lib/hbs",
          },
          shim: {
            handlebars: {
              exports: "Handlebars"
            }
          }
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['requirejs']);

};
