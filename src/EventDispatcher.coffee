class EventDispatcher

  test: ->
    console.log 'test EventDispatcher'


if typeof module is 'undefined'
  # Web
  window.EventDispatcher = EventDispatcher
else
  # Node.js
  module.exports = EventDispatcher