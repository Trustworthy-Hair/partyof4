module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      server: {
        src: ['server/**/*.js'],
        options: {
          'node': true,
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'eqeqeq': true,
          'immed': true,
          'indent': 2,
          'latedef': true,
          'newcap': true,
          'noarg': true,
          'regexp': true,
          'undef': true,
          'unused': 'vars',
          'trailing': true,
          'smarttabs': true,
          'white': true
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/usersTests.js', 'test/locationsTests.js', 'test/eventsTests.js', 'test/reviewsTests.js'],
        options: {
          run: true,
        },
      },
    },
    execute: {
      target: {
        src: [
          'TestData/makeData.js',
          'server/server.js'
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('build', ['jshint', 'execute']);
  grunt.registerTask('default', ['execute']);

};
