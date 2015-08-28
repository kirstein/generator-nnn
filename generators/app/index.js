'use strict';

var yeoman    = require('yeoman-generator');
var chalk     = require('chalk');
var yosay     = require('yosay');
var path      = require('path');
var slug      = require('slug');
var camelCase = require('camelcase');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('nnn (no-nonsense-node)') + ' generator!'
    ));

    var prompts = [{
      name: 'moduleName',
      message: 'Module name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Module description'
    }, {
      name: 'main',
      message: 'Main path',
      default: 'index'
    }, {
      name: 'licence',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUser',
      message: 'GitHub username'
    }, {
      type: 'confirm',
      name: 'bin',
      message: 'Create executable?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.githubUser  = props.githubUser;
      this.moduleName  = props.moduleName;
      this.main        = props.main;
      this.slugName    = slug(this.moduleName);
      this.licence     = props.licence || '';
      this.description = props.description || '';
      this.bin         = props.bin;
      done();
    }.bind(this));
  },

  writing: {
    package: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          main: this.main,
          slugName: this.slugName,
          description: this.description,
          githubUser: this.githubUser,
          licence: this.licence,
          bin: this.bin
        }
      );
    },

    app: function () {
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath(this.main + '.js')
      );
    },

    test: function () {
      this.fs.copyTpl(
        this.templatePath('test/test-app.js'),
        this.destinationPath('__tests__/' + this.main + '-test.js'),
        {
          camelName: camelCase(this.slugName),
          main: this.main
        }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    bin: function () {
      if (!this.bin) {
        return;
      }
      this.fs.copyTpl(
        this.templatePath('bin/app.js'),
        this.destinationPath('bin/' + this.slugName + '.js'),
        {
          camelName: camelCase(this.slugName),
          main: this.main
        }
      );
    },

    readme: function () {
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          slugName: this.slugName,
          description: this.description,
          githubUser: this.githubUser,
          licence: this.licence,
          moduleName: this.moduleName,
          bin: this.bin
        }
      );
    }
  },

  install: function () {
    this.npmInstall();
  }
});
