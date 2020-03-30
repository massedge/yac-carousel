import Core from '../../../../classes/core'

export default class Base extends Core {
  #items: number[]
  #index: number

  constructor({ index = 0, items }: { index?: number; items: number[] }) {
    super()
    this.#items = items
    this.#index = index
  }

  get items() {
    return this.#items
  }

  get index() {
    return this.#index
  }

  select(index: number): boolean {
    this.#index = index % this.#items.length
    return true
  }
}
