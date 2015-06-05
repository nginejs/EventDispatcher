class CustomEvent

  constructor: (@target, @type, @data) ->
    @propagationStopped = false


  stopPropagation: ->
    @propagationStopped = true



class EventDispatcher


  @global = new EventDispatcher


  constructor: ->
    @listeners = {}

  
  on: (type, listener = undefined) ->
    if !type
      throw new TypeError 'Listener cannot be event type'
    if !listener
      throw new TypeError 'Listener cannot be undefined'
    listeners = @listeners[type] || []
    @listeners[type] = listeners
    if listener in listeners
      # Do not bind the same listener multiple times.
      return false
    listeners.push listener
    true


  off: (type, listener = undefined) ->
    if !type
      throw new TypeError 'Listener cannot be event type'
    listeners = @listeners[type]
    if !listeners
      return false
    if listener
      index = listeners.indexOf listener
      if index == -1
        return false
      listeners.splice index, 1
      return true
    listeners.splice 0, listeners.length
    true


  trigger: (type, data = undefined) ->
    if !type
      throw new TypeError 'Listener cannot be event type'
    listeners = @listeners[type]
    if !listeners
      return false
    event = new CustomEvent @, type, data
    for listener in listeners
      listener event
    listeners.length


  hasListener: (type, listener = undefined) ->
    listeners = @listeners[type]
    if !listeners
      return false
    if listener
      return listener in listeners
    true


if typeof module is 'undefined'
  # Web
  window.EventDispatcher = EventDispatcher
else
  # Node.js
  module.exports = EventDispatcher