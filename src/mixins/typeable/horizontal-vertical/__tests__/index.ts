import HorizontalVerticalTypeableMixin from '..'
import Core from '../../../../classes/core'

jest.useFakeTimers()

test('typeable horizontal-vertical mixin', () => {
  const Cls = HorizontalVerticalTypeableMixin(Core)

  let instance

  instance = new Cls({})
  expect(instance.type).toBe('horizontal')

  instance = new Cls({
    type: 'horizontal',
  })
  expect(instance.type).toBe('horizontal')

  instance = new Cls({
    type: 'vertical',
  })
  expect(instance.type).toBe('vertical')

  instance = new Cls({
    type: 'horizontal-and-vertical',
  })
  expect(instance.type).toBe('horizontal-and-vertical')

  instance = new Cls({})
  const refreshSpy = jest.spyOn(instance, 'refresh')
  instance.type = 'horizontal'
  expect(refreshSpy).toBeCalledTimes(0)
  instance.type = 'vertical'
  expect(refreshSpy).toBeCalledTimes(1)
})
