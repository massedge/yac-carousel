import { ComposeConstructor } from "../helpers/.types"
import Elementable from './elementable'

export interface NavableOptions {
  previousText: string
  nextText: string
  elPrevious?: HTMLElement | null
  elNext?: HTMLElement | null
  previousFn?: () => void
  nextFn?: () => void
}

export interface Navable {
  new(options: NavableOptions): NavableInstance
}

export interface NavableInstance {
  render: () => void
  destroy: () => void
}

export default function Navable<T extends new (o: any) => any>(Base: T) {
  const Base2 = Elementable(Base)
  
  class Mixin extends (Base2 as new (...a: any[]) => any) implements NavableInstance {
    #options: NavableOptions
    private elPrevious: HTMLElement | null = null
    private elNext: HTMLElement | null = null
    private attachedElPrevious = false;
    private attachedElNext = false;

    constructor({
      previousText,
      nextText,
      elPrevious,
      elNext,
      previousFn,
      nextFn,
      ...otherOptions
    }: NavableOptions) {
      super({
        previousText,
        nextText,
        elPrevious,
        elNext,
        previousFn,
        nextFn,
        ...otherOptions
      });

      this.#options = {
        previousText,
        nextText,
        elPrevious,
        elNext,
        previousFn,
        nextFn,
      }
    
      if (elPrevious instanceof HTMLElement) {
        this.elPrevious = elPrevious;
      } else if (elPrevious !== null) {
        this.elPrevious = this.createButton('previous', previousText);
      }
    
      if (elNext instanceof HTMLElement) {
        this.elNext = elNext;
      } else if (elNext !== null) {
        this.elNext = this.createButton('next', nextText);
      }
    }
    
    render() {
      super.render();

      const nodes: [HTMLElement | null, () => void, string][] = [
        [this.elNext, this.#options.nextFn || (() => this.next()), '_attachedElPrevious'],
        [this.elPrevious, this.#options.previousFn || (() => this.previous()), '_attachedElNext']
      ]

      // insert nodes and attach events
      nodes.forEach((args) => {
        const elNav = args[0];
        const fn = args[1];
        const attachedName = args[2];

        if (!elNav) return;
        if (fn) elNav.addEventListener('click', fn, false);
        if (this.container.ownerDocument.documentElement.contains(elNav)) return;

        this.container.parentNode.insertBefore(elNav, this.container.nextSibling);
        this[attachedName] = true;
      });
    }

    destroy() {
      super.destroy();

      const nodes: [HTMLElement | null, () => void, boolean][] = [
        [this.elNext, this.#options.nextFn || this.next.bind(this), this.attachedElNext],
        [this.elPrevious, this.#options.previousFn || this.previous.bind(this), this.attachedElPrevious]
      ]

      // remove nodes and detach events
      nodes.forEach((args) => {
        const elNav = args[0];
        const fn = args[1];
        const attached = args[2];

        if (elNav && elNav.parentNode && attached) {
          elNav.parentNode.removeChild(elNav);
        }
        if (elNav && fn) {
          elNav.removeEventListener('click', fn, false);
        }
      });
    }

    private createButton(cssClass: string, text: string) {
      const el = document.createElement('button');
      el.setAttribute('class', 'yac-carousel-navable ' + cssClass)
      el.setAttribute('type', 'button');
      el.appendChild(document.createTextNode(text));
      return el;
    }
  }
  
  return <unknown>Mixin as ComposeConstructor<Navable, typeof Base2>
}
