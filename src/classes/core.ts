export default class Core {
  #rendered: boolean = false
  #destroyed: boolean = false

  render(): boolean {
    if (this.#rendered) return false
    return (this.#rendered = true)
  }

  refresh() {
    /**/
  }

  destroy(): boolean {
    if (!this.#rendered) return false
    if (this.#destroyed) return false
    return (this.#destroyed = true)
  }
}
