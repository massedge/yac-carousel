import { getBounds } from "./helper";
import Direction from "../../enums/direction";

export default class ElementableItem {
  private _element: HTMLElement
  private _direction: Direction

  private _length: number = 0
  private _offset: number = 0
  private _active: boolean = false

  constructor(element: HTMLElement, direction: Direction) {
    this._element = element
    this._direction = direction
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
    this._length = (this._direction === Direction.HORIZONTAL) ? bounds.widthMargin : bounds.heightMargin
  }

  translate() {

  }
}
