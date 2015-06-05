(function() {
  'use strict';
  describe('EventDispatcher', function() {
    it('should exist', function() {
      return expect(!!EventDispatcher).toBe(true);
    });
    it('should be instantiable', function() {
      return expect(!!(new EventDispatcher)).toBe(true);
    });
    return it('test function should return 15', function() {
      var e;
      e = new EventDispatcher;
      return expect(e.test()).toBe(15);
    });
  });

}).call(this);
