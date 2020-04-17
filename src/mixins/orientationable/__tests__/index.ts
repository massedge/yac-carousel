import OrientationableMixin from '..'
import Core from '../../../classes/core'

jest.useFakeTimers()

test('typeable horizontal-vertical mixin', () => {
  const Cls = OrientationableMixin(Core)

  let instance

  instance = new Cls({})
  expect(instance.orientation).toBe('horizontal')

  instance = new Cls({
    orientation: 'horizontal',
  })
  expect(instance.orientation).toBe('horizontal')

  instance = new Cls({
    orientation: 'vertical',
  })
  expect(instance.orientation).toBe('vertical')

  // instance = new Cls({
  //   orientation: 'horizontal-and-vertical',
  // })
  // expect(instance.orientation).toBe('horizontal-and-vertical')

  instance = new Cls({})
  const refreshSpy = jest.spyOn(instance, 'refresh')
  instance.orientation = 'horizontal'
  expect(refreshSpy).toBeCalledTimes(0)
  instance.orientation = 'vertical'
  expect(refreshSpy).toBeCalledTimes(1)
})
