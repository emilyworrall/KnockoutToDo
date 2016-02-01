define(['knockout'], function(ko) {
  'use strict';

  // single todo item
  var toDo = function(title, completed) {
    this.title = ko.observable(title);
    this.completed = ko.observable(completed);
    this.editing = ko.observable(false);
  };

  return toDo;
  
});
