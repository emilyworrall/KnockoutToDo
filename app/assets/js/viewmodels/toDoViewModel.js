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
        };
      };

      // edit a Task
      self.editToDo = function(todo) {
        todo.editing(true);
        todo.previousTitle = todo.title();
      };

      // cancel task edit and revert to original title by pressing ESC
      self.cancelEdit = function(todo) {
        todo.editing(false);
        todo.title(todo.previousTitle);
      };

      // confirm edit by pressing ENTER
      self.confirmEdit = function(todo) {
        todo.editing(false);

        var title = todo.title();
        var trimTitle = title.trim();

        if (title !== trimTitle) {
          todo.title(trimTitle);
        }

        if (!trimTitle) {
          self.remove(todo);
        }
      };

      // Remove a single task
      self.remove = function(todo) {
        self.todos.remove(todo);
      };

      ko.computed(function() {
        window.localStorage.setItem(config.localStorageItem, ko.toJSON(self.todos));
      }).extend({
        rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
      });

  };

  return viewModel;
});
