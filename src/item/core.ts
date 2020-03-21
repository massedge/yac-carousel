import { getBounds } from '../utils/get-bounds'
import Direction from '../enums/direction'

export default class CoreItem {
  private _element: HTMLElement
  private _direction: Direction

  private _length: number = 0
  private _offset: number = 0
  private _active: boolean = false

  constructor(options: { element: HTMLElement; direction?: Direction }) {
    this._element = options.element
    this._direction = options.direction || Direction.HORIZONTAL
  }

  get element() {
    return this._element
  }

  get length() {
    return this._length
  }

  get offset() {
    return this._offset
  }

  set offset(value: number) {
    this._offset = value
  }

  get active() {
    return this._active
  }

  set active(value: boolean) {
    this._active = value
  }

  render() {
    this.refresh()
  }

  refresh() {
    const bounds = getBounds(this.element)
    this._length =
      this._direction === Direction.HORIZONTAL
        ? bounds.widthMargin
        : bounds.heightMargin
  }

  destroy() {
    /**/
  }
}
