import Core from '../../../../classes/core'
import WindowResizeRefreshableMixin from '..'

describe('refreshable window-resize mixin', () => {
  const Cls = WindowResizeRefreshableMixin(Core)

  test('refresh on window resize after render', () => {
    const instance = new Cls({})
    const refreshSpy = jest.spyOn(instance, 'refresh')

    instance.render()
    window.dispatchEvent(new Event('resize'))
    expect(refreshSpy).toHaveBeenCalled()
  })

  test('do not refresh on window resize after destroy', () => {
    const instance = new Cls({})
    const refreshSpy = jest.spyOn(instance, 'refresh')

    instance.render()
    instance.destroy()
    window.dispatchEvent(new Event('resize'))
    expect(refreshSpy).not.toHaveBeenCalled()
  })
})
