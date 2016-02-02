require.config({
  paths: {
    knockout: '../../bower_components/knockout.js/knockout'
  }
});

require(['knockout', 'config', 'viewmodels/toDoViewModel', 'handlers'], function(ko, config, toDoViewModel){
  'use strict';

  var todos = ko.utils.parseJson(window.localStorage.getItem(config.localStorageItem));

  ko.applyBindings(new toDoViewModel(todos || []));

});
