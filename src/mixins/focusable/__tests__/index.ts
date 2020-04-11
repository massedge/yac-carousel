import Base from '../__mocks__/base'
import FocusableMixin from '..'
import EventableMixin from '../../eventable/mitt'

describe('focusable mixin', () => {
  const Cls = FocusableMixin(EventableMixin(Base))

  test('focus() / blur()', () => {
    const instance = new Cls({})

    expect(instance.focused).toBe(false)
    expect(instance.focus()).toBe(true)
    expect(instance.focused).toBe(true)
    expect(instance.blur()).toBe(true)
    expect(instance.focused).toBe(false)
  })

  test('yac:focus event', () => {
    const instance = new Cls({})
    instance.on('yac:focus', (e) => {
      e.preventDefault()
    })

    expect(instance.focus()).toBe(false)
    expect(instance.focused).toBe(false)
  })

  test('yac:blur event', () => {
    const instance = new Cls({})
    instance.on('yac:blur', (e) => {
      e.preventDefault()
    })
    instance.focus()

    expect(instance.blur()).toBe(false)
    expect(instance.focused).toBe(true)
  })

  test('yac:focused:change event', () => {
    const instance = new Cls({})
    const callback = jest.fn((e) => e.detail.focused)
    instance.on('yac:focused:changed', callback)

    callback.mockClear()
    instance.focus()
    expect(callback).toHaveReturnedWith(true)

    callback.mockClear()
    instance.focus()
    expect(callback).not.toHaveBeenCalled()

    callback.mockClear()
    instance.blur()
    expect(callback).toHaveReturnedWith(false)

    callback.mockClear()
    instance.blur()
    expect(callback).not.toHaveBeenCalled()
  })

  test('does not trigger yac:focus on fucus() call when already in focus', () => {
    const instance = new Cls({})
    const callback = jest.fn()
    instance.on('yac:focus', callback)

    instance.focus()
    expect(callback).toHaveBeenCalled()

    callback.mockClear()
    instance.focus()
    expect(callback).not.toHaveBeenCalled()

    callback.mockClear()
    instance.blur()
    instance.focus()
    expect(callback).toHaveBeenCalled()
  })

  test('does not trigger yac:blur on blur() call when already not in focus', () => {
    const instance = new Cls({})
    const callback = jest.fn()
    instance.on('yac:blur', callback)
    instance.focus()

    instance.blur()
    expect(callback).toHaveBeenCalled()

    callback.mockClear()
    instance.blur()
    expect(callback).not.toHaveBeenCalled()

    callback.mockClear()
    instance.focus()
    instance.blur()
    expect(callback).toHaveBeenCalled()
  })
})
