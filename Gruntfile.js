'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      options: {
        config:   '.jscsrc',
        reporter:   'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'app/**/*.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'app/**/*.js'
      ]
    },
    githooks: {
      all: {
        options: {
          endMarker: ''
        },
        'pre-commit': 'analyze',
        'pre-push': 'test',
        'post-checkout': 'shell:gitLog',
        'post-commit': 'shell:gitLog',
        'post-merge': 'shell:gitLog shell:npmInstall'
      }
    },
    shell: {
      gitLog: {
        command: 'git log -1 > git-info.txt'
      },
      npmInstall: {
        command: 'npm install'
      },
      serverLogs: {
        command: 'pm2 logs'
      },
      serverStatus: {
        command: 'pm2 list'
      },
      serverStop: {
        command: 'pm2 kill'
      },
      serverDelete: {
        command: 'pm2 delete pm2.json'
      },
      serverStart: {
        command: 'pm2 start pm2.json --log-date-format "YYYY-MM-DD HH:mm"'
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec',
          require: './test/setup.js'
        },
        src: ['test/**/*Spec.js']
      }
    }
  });

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', 'Runs unit tests', ['mochaTest']);
  grunt.registerTask('analyze', 'Validates code style', ['jshint', 'jscs']);
  grunt.registerTask('status', 'Shows status of node processes', ['shell:serverStatus']);
  grunt.registerTask('stop', 'Stop the processes', ['shell:serverStop']);
  grunt.registerTask('start', 'Start node processes', ['analyze', 'shell:serverStart']);
  grunt.registerTask('restart', 'Restart node processes', ['stop', 'start']);
  grunt.registerTask('logs', 'Trail logs for all pm2 processes', ['shell:serverLogs']);
};
