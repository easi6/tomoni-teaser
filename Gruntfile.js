// Generated on 2013-12-31 using generator-angular 0.6.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      jade: {
        files: ['<%= yeoman.app %>/views/{,*/}*.jade'],
        tasks: 'jade'
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      less: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: 'less'
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '.tmp/styles/{,*/}*.html',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>',
          port: 9000,
          livereload: false
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['app/styles']
        },
        files: {
          '.tmp/styles/page.css': 'app/styles/page.less'
        }
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          '.tmp/index.html': ['app/index.jade'],
          '.tmp/views/main.html' : ['app/views/main.jade']
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.png',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
           removeCommentsFromCDATA: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['index.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      app: {
        cwd: '.tmp',
        src: 'views/**.html',
        dest: '.tmp/scripts/templates.js',
        options: {
          module: 'homepageApp',
          standalone: false
        }
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/scripts',
          src: '*.js',
          dest: '.tmp/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.png',
            'fonts/*',
            'scripts/l10n/*.json',
            'Presskits.zip'
            //'scripts/{,*/}*.js'
          ]
        },/* {
          expand: true,
          cwd: '.tmp/styles',
          dest: '<%= yeoman.dist %>/styles',
          src: [
            '*.css'
          ]
        },*/{
          expand: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: [
            'index.html',
            'views/main.html'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'less',
        'compass:server'
        //'copy:styles'
      ],
      dist: [
        'compass:dist'
        //'copy:styles'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
     cssmin: {
       dist: {
         files: {
           '<%= yeoman.dist %>/styles/main.css': [
             '.tmp/styles/*.css'
           ]
         }
       }
     },
     uglify: {
       options: {
         compress: {
           drop_console: true
         }
       },
       dist: {
         files:[{
           expand: true,
           cwd: '.tmp/scripts',
           src: '*.js',
           dest: '<%= yeoman.dist %>/scripts'
         }
         ]
/*
         files: {
           '<%= yeoman.dist %>/scripts/application.js': [
             '.tmp/scripts/application.js'
           ],
           '<%= yeoman.dist %>/scripts/plugins.js': [
             '.tmp/scripts/plugins.js'
           ],
           '<%= yeoman.dist %>/scripts/modules.js': [
             '.tmp/scripts/modules.js'
           ]
         }
         */
       }
     },
     concat: {
       plugins: {
         src: ['app/bower_components/sass-bootstrap/js/dropdown.js', 'app/bower_components/angular-translate/angular-translate.js', 'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js', 'app/bower_components/angular-ui-bootstrap/src/dropdownToggle/dropdownToggle.js'],
         dest: '.tmp/scripts/plugins.js'
       },
       module: {
         src: ['app/bower_components/angular-resource/angular-resource.js', 'app/bower_components/angular-route/angular-route.js', 'app/bower_components/angular-cookies/angular-cookies.js', 'app/bower_components/angular-sanitize/angular-sanitize.js'],
         dest: '.tmp/scripts/modules.js'
       },
       dist: {
         src: ['app/scripts/app.js', 'app/scripts/controllers/main.js'],
         dest: '.tmp/scripts/application.js'
       }
     },
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'useminPrepare',
    'less',
    'concurrent:dist',
    'autoprefixer',
    'copy:dist',
    'concat',
    'ngmin',
    //'cdnify',
    'uglify:dist',
    'cssmin:dist',
    //'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
