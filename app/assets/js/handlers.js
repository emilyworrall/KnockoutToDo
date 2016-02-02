define(['knockout', 'config'], function(ko, config) {
  'use strict';

  function keyupBindingFactory(keyCode) {
    return {
      init: function (element, valueAccessor, allBindingsAccessor, data, bindingContext) {
        var wrappedHandler, newValueAccessor;

        // wrap the handler with a check for the enter key
        wrappedHandler = function (data, event) {
          if (event.keyCode === keyCode) {
              valueAccessor().call(this, data, event);
          }
        };

        // create a valueAccessor with the options that we would want to pass to the event binding
        newValueAccessor = function () {
          return {
              keyup: wrappedHandler
          };
        };

        // call the real event binding's init function
        ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
      }
    };
  }

  ko.bindingHandlers.enterKey = keyupBindingFactory(config.ENTER_KEY);
  ko.bindingHandlers.escapeKey = keyupBindingFactory(config.ESCAPE_KEY);
});
