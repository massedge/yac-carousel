export default class Core {
  #rendered: boolean = false
  #destroyed: boolean = false

  render(): void {
    if (this.#rendered) throw new Error('Already rendered.')
    this.#rendered = true
  }

  get rendered() {
    return this.#rendered
  }

  refresh(): void {
    /**/
  }

  destroy(): void {
    if (!this.#rendered) throw new Error('Not rendered.')
    if (this.#destroyed) throw new Error('Already destroyed.')
    this.#destroyed = true
  }

  get destroyed() {
    return this.#destroyed
  }
}
