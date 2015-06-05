(function() {
  var CustomEvent, EventDispatcher,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CustomEvent = (function() {
    function CustomEvent(target, type1, data1) {
      this.target = target;
      this.type = type1;
      this.data = data1;
      this.propagationStopped = false;
    }

    CustomEvent.prototype.stopPropagation = function() {
      return this.propagationStopped = true;
    };

    return CustomEvent;

  })();

  EventDispatcher = (function() {
    EventDispatcher.global = new EventDispatcher;

    function EventDispatcher() {
      this.listeners = {};
    }

    EventDispatcher.prototype.on = function(type, listener) {
      var listeners;
      if (listener == null) {
        listener = void 0;
      }
      if (!type) {
        throw new TypeError('Listener cannot be event type');
      }
      if (!listener) {
        throw new TypeError('Listener cannot be undefined');
      }
      listeners = this.listeners[type] || [];
      this.listeners[type] = listeners;
      if (indexOf.call(listeners, listener) >= 0) {
        return false;
      }
      listeners.push(listener);
      return true;
    };

    EventDispatcher.prototype.off = function(type, listener) {
      var index, listeners;
      if (listener == null) {
        listener = void 0;
      }
      if (!type) {
        throw new TypeError('Listener cannot be event type');
      }
      listeners = this.listeners[type];
      if (!listeners) {
        return false;
      }
      if (listener) {
        index = listeners.indexOf(listener);
        if (index === -1) {
          return false;
        }
        listeners.splice(index, 1);
        return true;
      }
      listeners.splice(0, listeners.length);
      return true;
    };

    EventDispatcher.prototype.trigger = function(type, data) {
      var event, i, len, listener, listeners;
      if (data == null) {
        data = void 0;
      }
      if (!type) {
        throw new TypeError('Listener cannot be event type');
      }
      listeners = this.listeners[type];
      if (!listeners) {
        return false;
      }
      event = new CustomEvent(this, type, data);
      for (i = 0, len = listeners.length; i < len; i++) {
        listener = listeners[i];
        listener(event);
      }
      return listeners.length;
    };

    EventDispatcher.prototype.hasListener = function(type, listener) {
      var listeners;
      if (listener == null) {
        listener = void 0;
      }
      listeners = this.listeners[type];
      if (!listeners) {
        return false;
      }
      if (listener) {
        return indexOf.call(listeners, listener) >= 0;
      }
      return true;
    };

    return EventDispatcher;

  })();

  if (typeof module === 'undefined') {
    window.EventDispatcher = EventDispatcher;
  } else {
    module.exports = EventDispatcher;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV2ZW50RGlzcGF0Y2hlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7O0VBQU07SUFFUyxxQkFBQyxNQUFELEVBQVUsS0FBVixFQUFpQixLQUFqQjtNQUFDLElBQUMsQ0FBQSxTQUFEO01BQVMsSUFBQyxDQUFBLE9BQUQ7TUFBTyxJQUFDLENBQUEsT0FBRDtNQUM1QixJQUFDLENBQUEsa0JBQUQsR0FBc0I7SUFEWDs7MEJBSWIsZUFBQSxHQUFpQixTQUFBO2FBQ2YsSUFBQyxDQUFBLGtCQUFELEdBQXNCO0lBRFA7Ozs7OztFQUtiO0lBR0osZUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJOztJQUdELHlCQUFBO01BQ1gsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQURGOzs4QkFJYixFQUFBLEdBQUksU0FBQyxJQUFELEVBQU8sUUFBUDtBQUNGLFVBQUE7O1FBRFMsV0FBVzs7TUFDcEIsSUFBRyxDQUFDLElBQUo7QUFDRSxjQUFVLElBQUEsU0FBQSxDQUFVLCtCQUFWLEVBRFo7O01BRUEsSUFBRyxDQUFDLFFBQUo7QUFDRSxjQUFVLElBQUEsU0FBQSxDQUFVLDhCQUFWLEVBRFo7O01BRUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxTQUFVLENBQUEsSUFBQSxDQUFYLElBQW9CO01BQ2hDLElBQUMsQ0FBQSxTQUFVLENBQUEsSUFBQSxDQUFYLEdBQW1CO01BQ25CLElBQUcsYUFBWSxTQUFaLEVBQUEsUUFBQSxNQUFIO0FBRUUsZUFBTyxNQUZUOztNQUdBLFNBQVMsQ0FBQyxJQUFWLENBQWUsUUFBZjthQUNBO0lBWEU7OzhCQWNKLEdBQUEsR0FBSyxTQUFDLElBQUQsRUFBTyxRQUFQO0FBQ0gsVUFBQTs7UUFEVSxXQUFXOztNQUNyQixJQUFHLENBQUMsSUFBSjtBQUNFLGNBQVUsSUFBQSxTQUFBLENBQVUsK0JBQVYsRUFEWjs7TUFFQSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQVUsQ0FBQSxJQUFBO01BQ3ZCLElBQUcsQ0FBQyxTQUFKO0FBQ0UsZUFBTyxNQURUOztNQUVBLElBQUcsUUFBSDtRQUNFLEtBQUEsR0FBUSxTQUFTLENBQUMsT0FBVixDQUFrQixRQUFsQjtRQUNSLElBQUcsS0FBQSxLQUFTLENBQUMsQ0FBYjtBQUNFLGlCQUFPLE1BRFQ7O1FBRUEsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsS0FBakIsRUFBd0IsQ0FBeEI7QUFDQSxlQUFPLEtBTFQ7O01BTUEsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsQ0FBakIsRUFBb0IsU0FBUyxDQUFDLE1BQTlCO2FBQ0E7SUFiRzs7OEJBZ0JMLE9BQUEsR0FBUyxTQUFDLElBQUQsRUFBTyxJQUFQO0FBQ1AsVUFBQTs7UUFEYyxPQUFPOztNQUNyQixJQUFHLENBQUMsSUFBSjtBQUNFLGNBQVUsSUFBQSxTQUFBLENBQVUsK0JBQVYsRUFEWjs7TUFFQSxTQUFBLEdBQVksSUFBQyxDQUFBLFNBQVUsQ0FBQSxJQUFBO01BQ3ZCLElBQUcsQ0FBQyxTQUFKO0FBQ0UsZUFBTyxNQURUOztNQUVBLEtBQUEsR0FBWSxJQUFBLFdBQUEsQ0FBWSxJQUFaLEVBQWUsSUFBZixFQUFxQixJQUFyQjtBQUNaLFdBQUEsMkNBQUE7O1FBQ0UsUUFBQSxDQUFTLEtBQVQ7QUFERjthQUVBLFNBQVMsQ0FBQztJQVRIOzs4QkFZVCxXQUFBLEdBQWEsU0FBQyxJQUFELEVBQU8sUUFBUDtBQUNYLFVBQUE7O1FBRGtCLFdBQVc7O01BQzdCLFNBQUEsR0FBWSxJQUFDLENBQUEsU0FBVSxDQUFBLElBQUE7TUFDdkIsSUFBRyxDQUFDLFNBQUo7QUFDRSxlQUFPLE1BRFQ7O01BRUEsSUFBRyxRQUFIO0FBQ0UsZUFBTyxhQUFZLFNBQVosRUFBQSxRQUFBLE9BRFQ7O2FBRUE7SUFOVzs7Ozs7O0VBU2YsSUFBRyxPQUFPLE1BQVAsS0FBaUIsV0FBcEI7SUFFRSxNQUFNLENBQUMsZUFBUCxHQUF5QixnQkFGM0I7R0FBQSxNQUFBO0lBS0UsTUFBTSxDQUFDLE9BQVAsR0FBaUIsZ0JBTG5COztBQXhFQSIsImZpbGUiOiJFdmVudERpc3BhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDdXN0b21FdmVudFxuXG4gIGNvbnN0cnVjdG9yOiAoQHRhcmdldCwgQHR5cGUsIEBkYXRhKSAtPlxuICAgIEBwcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZVxuXG5cbiAgc3RvcFByb3BhZ2F0aW9uOiAtPlxuICAgIEBwcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlXG5cblxuXG5jbGFzcyBFdmVudERpc3BhdGNoZXJcblxuXG4gIEBnbG9iYWwgPSBuZXcgRXZlbnREaXNwYXRjaGVyXG5cblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAbGlzdGVuZXJzID0ge31cblxuICBcbiAgb246ICh0eXBlLCBsaXN0ZW5lciA9IHVuZGVmaW5lZCkgLT5cbiAgICBpZiAhdHlwZVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvciAnTGlzdGVuZXIgY2Fubm90IGJlIGV2ZW50IHR5cGUnXG4gICAgaWYgIWxpc3RlbmVyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yICdMaXN0ZW5lciBjYW5ub3QgYmUgdW5kZWZpbmVkJ1xuICAgIGxpc3RlbmVycyA9IEBsaXN0ZW5lcnNbdHlwZV0gfHwgW11cbiAgICBAbGlzdGVuZXJzW3R5cGVdID0gbGlzdGVuZXJzXG4gICAgaWYgbGlzdGVuZXIgaW4gbGlzdGVuZXJzXG4gICAgICAjIERvIG5vdCBiaW5kIHRoZSBzYW1lIGxpc3RlbmVyIG11bHRpcGxlIHRpbWVzLlxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgbGlzdGVuZXJzLnB1c2ggbGlzdGVuZXJcbiAgICB0cnVlXG5cblxuICBvZmY6ICh0eXBlLCBsaXN0ZW5lciA9IHVuZGVmaW5lZCkgLT5cbiAgICBpZiAhdHlwZVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvciAnTGlzdGVuZXIgY2Fubm90IGJlIGV2ZW50IHR5cGUnXG4gICAgbGlzdGVuZXJzID0gQGxpc3RlbmVyc1t0eXBlXVxuICAgIGlmICFsaXN0ZW5lcnNcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIGlmIGxpc3RlbmVyXG4gICAgICBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mIGxpc3RlbmVyXG4gICAgICBpZiBpbmRleCA9PSAtMVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIGxpc3RlbmVycy5zcGxpY2UgaW5kZXgsIDFcbiAgICAgIHJldHVybiB0cnVlXG4gICAgbGlzdGVuZXJzLnNwbGljZSAwLCBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgdHJ1ZVxuXG5cbiAgdHJpZ2dlcjogKHR5cGUsIGRhdGEgPSB1bmRlZmluZWQpIC0+XG4gICAgaWYgIXR5cGVcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IgJ0xpc3RlbmVyIGNhbm5vdCBiZSBldmVudCB0eXBlJ1xuICAgIGxpc3RlbmVycyA9IEBsaXN0ZW5lcnNbdHlwZV1cbiAgICBpZiAhbGlzdGVuZXJzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBldmVudCA9IG5ldyBDdXN0b21FdmVudCBALCB0eXBlLCBkYXRhXG4gICAgZm9yIGxpc3RlbmVyIGluIGxpc3RlbmVyc1xuICAgICAgbGlzdGVuZXIgZXZlbnRcbiAgICBsaXN0ZW5lcnMubGVuZ3RoXG5cblxuICBoYXNMaXN0ZW5lcjogKHR5cGUsIGxpc3RlbmVyID0gdW5kZWZpbmVkKSAtPlxuICAgIGxpc3RlbmVycyA9IEBsaXN0ZW5lcnNbdHlwZV1cbiAgICBpZiAhbGlzdGVuZXJzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZiBsaXN0ZW5lclxuICAgICAgcmV0dXJuIGxpc3RlbmVyIGluIGxpc3RlbmVyc1xuICAgIHRydWVcblxuXG5pZiB0eXBlb2YgbW9kdWxlIGlzICd1bmRlZmluZWQnXG4gICMgV2ViXG4gIHdpbmRvdy5FdmVudERpc3BhdGNoZXIgPSBFdmVudERpc3BhdGNoZXJcbmVsc2VcbiAgIyBOb2RlLmpzXG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnREaXNwYXRjaGVyIl19