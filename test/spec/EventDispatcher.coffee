'use strict'

describe 'EventDispatcher', ->

  it 'should exist', ->
    expect(!!EventDispatcher).toBe true


  it 'should be instantiable', ->
    expect(!!(new EventDispatcher)).toBe true


  it 'should have "on" function', ->
    e = new EventDispatcher
    expect(typeof e.on).toBe 'function'


  it 'should have "off" function', ->
    e = new EventDispatcher
    expect(typeof e.off).toBe 'function'


  it 'should have "trigger" function', ->
    e = new EventDispatcher
    expect(typeof e.trigger).toBe 'function'


  it 'should have "hasListener" function', ->
    e = new EventDispatcher
    expect(typeof e.hasListener).toBe 'function'


  it 'should throw error when calling "on" with undefined event type', ->
    e = new EventDispatcher
    invalidOn = ->
      e.on()
    expect(invalidOn).toThrowError TypeError


  it 'should throw error when calling "on" with undefined listener', ->
    e = new EventDispatcher
    invalidOn = ->
      e.on 'eventType'
    expect(invalidOn).toThrowError TypeError


  it 'should return true when binding a listener for the first time', ->
    e = new EventDispatcher
    expect(e.on 'eventType', ->).toBe true


  it 'should return false when binding the same listener multiple times', ->
    e = new EventDispatcher
    sameListener = ->
    e.on 'eventType', sameListener
    expect(e.on 'eventType', sameListener).toBe false


  it 'should throw error when calling "off" with undefined event type', ->
    e = new EventDispatcher
    invalidOff = ->
      e.off()
    expect(invalidOff).toThrowError TypeError


  it 'should return false when calling "off" before binding', ->
    e = new EventDispatcher
    expect(e.off 'eventType').toBe false


  it 'should return true when calling "off" after binding', ->
    e = new EventDispatcher
    e.on 'eventType', ->
    expect(e.off 'eventType').toBe true


  it 'should return false when calling "off" with specific listener before
  binding', ->
    e = new EventDispatcher
    listener = ->
    expect(e.off 'eventType', listener).toBe false


  it 'should return true when calling "off" with specific listener after
  binding', ->
    e = new EventDispatcher
    listener = ->
    e.on 'eventType', listener
    expect(e.off 'eventType', listener).toBe true


  it 'should return false when calling "hasListener" before binding', ->
    e = new EventDispatcher
    expect(e.hasListener 'eventType').toBe false


  it 'should return true when calling "hasListener" after binding', ->
    e = new EventDispatcher
    e.on 'eventType', ->
    expect(e.hasListener 'eventType').toBe true


  it 'should return false when calling "hasListener" with specific listener
  before binding', ->
    e = new EventDispatcher
    expect(e.hasListener 'eventType', ->).toBe false


  it 'should return false when calling "trigger" before binding', ->
    e = new EventDispatcher
    expect(e.trigger 'eventType').toBe false


  it 'should return 1 when calling "trigger" after binding once', ->
    e = new EventDispatcher
    e.on 'eventType', ->
    expect(e.trigger 'eventType').toBe 1


  it 'should return 15 when calling "trigger" after binding 15 times', ->
    e = new EventDispatcher
    for i in [0...15]
      e.on 'eventType', ->
    expect(e.trigger 'eventType').toBe 15


  it 'should call the listener after calling "trigger"', ->
    e = new EventDispatcher
    isCalled = false
    listener = ->
      isCalled = true
    e.on 'eventType', listener
    e.trigger 'eventType'
    expect(isCalled).toBe true


  it 'should provide information about the target in the event', ->
    e = new EventDispatcher
    target = null
    listener = (event) ->
      target = event.target
    e.on 'eventType', listener
    e.trigger 'eventType'
    expect(target).toBe e


  it 'should carry provided type in the event', ->
    e = new EventDispatcher
    type = null
    listener = (event) ->
      type = event.type
    e.on 'eventType', listener
    e.trigger 'eventType'
    expect(type).toBe 'eventType'


  it 'should carry provided data in the event', ->
    e = new EventDispatcher
    data = null
    listener = (event) ->
      data = event.data
    e.on 'eventType', listener
    e.trigger 'eventType', {test: 15}
    expect(data.test).toBe 15


  it 'should unbind all listeners when calling "off" with no specific
  listener', ->
    e = new EventDispatcher
    firstCalled = false
    secondCalled = false
    e.on 'eventType', ->
      firstCalled = true
    e.on 'eventType', ->
      secondCalled = true
    e.off 'eventType'
    e.trigger 'eventType'
    expect(firstCalled).toBe false
    expect(secondCalled).toBe false


  it 'should unbind only the listener specified when calling "off", if
  provided', ->
    e = new EventDispatcher
    firstCalled = false
    secondCalled = false
    listener1 = ->
      firstCalled = true
    listener2 = ->
      secondCalled = true
    e.on 'eventType', listener1
    e.on 'eventType', listener2
    e.off 'eventType', listener1
    e.trigger 'eventType'
    expect(firstCalled).toBe false
    expect(secondCalled).toBe true


  it 'should have a global event dispatcher', ->
    expect(EventDispatcher.global instanceof EventDispatcher).toBe true