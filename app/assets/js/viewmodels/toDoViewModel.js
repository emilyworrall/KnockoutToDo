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

      // Remove all completed tasks
      self.removeCompleted = function() {
        self.todos.remove(function(todo) {
          return todo.completed();
        });
      };

      // Total count of completed todos
      self.completedCount = ko.computed(function() {
        return ko.utils.arrayFilter(self.todos(), function(todo) {
          return todo.completed();
        }).length;
      });

      // Total count of incomplete todos
      self.remainingCount = ko.computed(function() {
        return self.todos().length - self.completedCount();
      });

      // Can mark all tasks complete/incomplete
      self.allCompleted = ko.computed({
        read: function() {
          return !self.remainingCount();
        },
        write: function(newValue) {
          ko.utils.arrayForEach(self.todos(), function(todo) {
            todo.completed(newValue);
          });
        }
      });

      ko.computed(function() {
        window.localStorage.setItem(config.localStorageItem, ko.toJSON(self.todos));
      }).extend({
        rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
      });

  };

  return viewModel;
});
