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
      },
      client: {
        src: [], //  'client/src/app.jsx','client/src/views/*.jsx'
        options: {
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'curly': true,
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
          'white': true,
          // remove for production - allows console.log, etc
          'devel': true,
          globals: {
            'angular': false,
            '_': false
          }
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
    webpack: {
      client: {
        entry: "./client/src/app.jsx",
        output: {
            path: "client/build",
            filename: "app.js"
        },
        module: {
            loaders: [
                // **IMPORTANT** This is needed so that each bootstrap js file required by
                // bootstrap-webpack has access to the jQuery object
                { test: /bootstrap\/js\//, loader: 'imports-loader?jQuery=jquery' },

                // the url-loader uses DataUrls.
                // the file-loader emits files.
                { test: /\.(woff|woff2)$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
                { test: /\.ttf$/,    loader: "file-loader" },
                { test: /\.eot$/,    loader: "file-loader" },
                { test: /\.svg$/,    loader: "file-loader" },

                { test: /\.jsx$/, loader: "jsx-loader" }
            ]
        }
      }
    },
    execute: {
      target: {
        src: ['server/server.js']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch'); implement later
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('test', ['jshint', 'webpack', 'mochaTest']);
  grunt.registerTask('build', ['jshint', 'webpack', 'execute']);
  grunt.registerTask('default', ['webpack', 'execute']);

};
