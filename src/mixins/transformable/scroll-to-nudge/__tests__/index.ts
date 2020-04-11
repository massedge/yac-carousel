import Core from '../../../../classes/core'
import NudgeableMixin from '../../../nudgeable'
import { MixinEventMap as NudgeableMixinEvenMap } from '../../../nudgeable/types'
import EventableMixin from '../../../eventable/element'
import ElementableMixin from '../../../elementable/core'
import ScrollToNudgeTransformableMixin from '..'

test('transformable scroll-to-nudge mixin', () => {
  const Cls = ScrollToNudgeTransformableMixin(
    NudgeableMixin(EventableMixin(ElementableMixin(Core)))
  )

  const element = document.createElement('div')
  const instance = new Cls({ element })
  const nudgeCallback = jest.fn((e: NudgeableMixinEvenMap['yac:nudge']) => {
    return {
      x: e.detail.nudge.x,
      y: e.detail.nudge.y,
    }
  })
  instance.on('yac:nudge', nudgeCallback)

  // render
  element.scrollLeft = 10
  element.scrollTop = 20
  instance.render()
  expect(nudgeCallback).toHaveReturnedWith<{ x: number; y: number }>({
    x: -10,
    y: -20,
  })
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)

  // scrollLeft
  nudgeCallback.mockClear()
  element.scrollLeft = 40
  element.dispatchEvent(new Event('scroll'))
  expect(nudgeCallback).toHaveReturnedWith<{ x: number; y: number }>({
    x: -40,
    y: 0,
  })
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)

  // scrollTop
  nudgeCallback.mockClear()
  element.scrollTop = -150
  element.dispatchEvent(new Event('scroll'))
  expect(nudgeCallback).toHaveReturnedWith<{ x: number; y: number }>({
    x: 0,
    y: 150,
  })
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)

  // scrollTop && scrollLeft
  nudgeCallback.mockClear()
  element.scrollLeft = -100
  element.scrollTop = 500
  element.dispatchEvent(new Event('scroll'))
  expect(nudgeCallback).toHaveReturnedWith<{ x: number; y: number }>({
    x: 100,
    y: -500,
  })
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)
})
