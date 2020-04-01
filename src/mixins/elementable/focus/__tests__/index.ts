import Core from '../../../../classes/core'
import FocusElementableMixin from '..'
import EventableMixin from '../../../eventable/element'
import ElementableMixin from '../../../elementable/core'
import FocusableMixin from '../../../focusable'

// WORKAROUND: jsdom doesn't yet support bubbling of focusin/focusout events
// @see https://github.com/jsdom/jsdom/issues/2708
const dispatchFocusWithFocusinEvent = (target: HTMLElement) => {
  const relatedTarget = document.activeElement
  dispatchBlurWithFocusoutEvent(target)
  target.focus()
  target.dispatchEvent(
    new FocusEvent('focusin', {
      bubbles: true,
      relatedTarget,
    })
  )
}
const dispatchBlurWithFocusoutEvent = (relatedTarget?: HTMLElement) => {
  const target = document.activeElement as HTMLElement | null
  target?.blur()
  target?.dispatchEvent(
    new FocusEvent('focusout', {
      bubbles: true,
      relatedTarget,
    })
  )
}

describe('focus elementable mixin', () => {
  const Cls = FocusElementableMixin(
    FocusableMixin(EventableMixin(ElementableMixin(Core)))
  )

  document.body.innerHTML = `
    <div id="element" tabindex="0">
      <button id="button1">test1</button>
      <button id="button2">test2</button>
    </div>
    <div id="outsideElement" tabindex="0"></div>
  `

  const element = document.querySelector<HTMLElement>('#element')
  const button1 = document.querySelector<HTMLElement>('#button1')
  const button2 = document.querySelector<HTMLElement>('#button2')
  const outsideElement = document.querySelector<HTMLElement>('#outsideElement')
  if (!element || !button1 || !button2 || !outsideElement)
    throw new Error('element not found')

  const instance = new Cls({
    element,
  })
  const focusCallback = jest.fn()
  const blurCallback = jest.fn()

  instance.on('yacc:focus', focusCallback)
  instance.on('yacc:blur', blurCallback)
  instance.render()

  beforeEach(() => {
    dispatchBlurWithFocusoutEvent()
    focusCallback.mockClear()
    blurCallback.mockClear()
  })

  test('focusing and blurring inner elements', () => {
    dispatchFocusWithFocusinEvent(button1)
    expect(focusCallback).toBeCalledTimes(1)
    expect(instance.focused).toBe(true)

    dispatchBlurWithFocusoutEvent()
    expect(blurCallback).toBeCalledTimes(1)
    expect(instance.focused).toBe(false)
  })

  test('switching focus between inner elements should not trigger focus more than once, and should not trigger blur', () => {
    dispatchFocusWithFocusinEvent(button1)
    expect(focusCallback).toBeCalledTimes(1)
    dispatchFocusWithFocusinEvent(button2)
    expect(focusCallback).toBeCalledTimes(1)
    expect(blurCallback).toBeCalledTimes(0)
    dispatchFocusWithFocusinEvent(outsideElement)
    expect(focusCallback).toBeCalledTimes(1)
    expect(blurCallback).toBeCalledTimes(1)
  })

  test('focus containing element', () => {
    dispatchFocusWithFocusinEvent(element)
    expect(focusCallback).toBeCalledTimes(1)
    dispatchFocusWithFocusinEvent(button1)
    expect(focusCallback).toBeCalledTimes(1)
  })

  test('clean up event listeners on destroy', () => {
    instance.destroy()
    dispatchFocusWithFocusinEvent(element)
    expect(focusCallback).toBeCalledTimes(0)
    dispatchBlurWithFocusoutEvent()
    expect(blurCallback).toBeCalledTimes(0)
  })
})
