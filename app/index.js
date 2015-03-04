'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ace ' + chalk.red('TryYeomanDemo') + ' generator!'
    ));

    var prompts = [{
        name: 'includeGulp',
        message: 'Would you prefer Gulp or Grunt?',
        type: 'list',
        choices: ['Gulp', 'Grunt']
    },{
      type: 'confirm',
      name: 'bootstrap',
      message: 'Would you like to use bootstrap?',
      default: true
    },{
      type: 'confirm',
      name: 'jqueryUI',
      message: 'Would you like to use jqueryUI?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.bootstrap = props.bootstrap;
      this.jqueryUI = props.jqueryUI;
      this.includeGulp = props.includeGulp === 'Gulp';

      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //this.copy('gitignore', '.gitignore');
      this.copy('_package.json','package.json');
      this.copy('_bower.json','bower.json');

      /*if (this.includeGulp) {
        this.template('gulpfile.js');
      } else {
        this.template('Gruntfile.js');
      }*/
    },

    projectfiles: function () {
      this.copy('editorconfig','.editorconfig');
      this.copy('jshintrc','.jshintrc');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
