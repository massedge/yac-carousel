import Base from '../__mocks__/base'
import AutoplayMixin from '..'

describe('autoplay mixin', () => {
  const Cls = AutoplayMixin(Base)

  test('initialization', () => {
    const instance = new Cls({
      items: [1],
    })

    expect(instance.index).toBe(0)
    expect(instance.autoplayEnabled).toBe(false)
  })
})
