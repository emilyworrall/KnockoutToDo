define(['knockout', 'config', 'models/toDo'], function(ko, config, toDo) {
  'use strict';

  // view model
  var viewModel = function(todos) {
      var self = this;

      // New task is observed
      self.current = ko.observable();

      // Observable array of task objects
      self.todos = ko.observableArray(ko.utils.arrayMap(todos, function(todo) {
        return new toDo(todo.title, todo.completed);
      }));

      // Task is added
      self.add = function() {
        var current = self.current().trim();

        if (current) {
          self.todos.push(new toDo(current));
          self.current('');
          console.log(self.todos);
        };
      };

      ko.computed(function() {
        window.localStorage.setItem(config.localStorageItem, ko.toJSON(self.todos));
      }).extend({
        rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
      });

  };

  return viewModel;
});
