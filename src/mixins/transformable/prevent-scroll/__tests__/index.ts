import Core from '../../../../classes/core'
import EventableMixin from '../../../eventable/element'
import ElementableMixin from '../../../elementable/core'
import PreventScrollTransformableMixin from '..'

test('transformable prevent-scroll mixin', () => {
  const Cls = PreventScrollTransformableMixin(
    EventableMixin(ElementableMixin(Core))
  )

  const element = document.createElement('div')
  const instance = new Cls({ element })

  // render
  element.scrollLeft = 10
  element.scrollTop = 20
  instance.render()
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)

  // scroll
  element.scrollLeft = 40
  element.scrollTop = 20
  element.dispatchEvent(new Event('scroll'))
  expect(element.scrollLeft).toBe(0)
  expect(element.scrollTop).toBe(0)
})
