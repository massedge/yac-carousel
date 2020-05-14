import 'normalize.css'
import './index.css'

// IE 11 polyfills
import 'intersection-observer'
import 'custom-event-polyfill'

// IE 10 polyfills
import 'core-js/stable/weak-map'

import { YacCarousel, NavablePreviousNextHandlerMixin } from '../../src'

const elContainer = document.querySelector<HTMLElement>(
  '.carousel.flex.vertical'
)
if (!elContainer) throw Error('Vertical carousel element not found.')

const elPrevious = document.querySelector<HTMLElement>('.vertical-previous')
if (!elPrevious || !(elPrevious instanceof HTMLButtonElement)) {
  throw Error('Previous button for vertical carousel not found.')
}
const elNext = document.querySelector<HTMLElement>('.vertical-next')
if (!elNext || !(elNext instanceof HTMLButtonElement)) {
  throw Error('Next button for vertical carousel not found.')
}

const cVertical = new (NavablePreviousNextHandlerMixin(YacCarousel))({
  element: elContainer,
  orientation: 'vertical',
  elPrevious,
  elNext,
  items: elContainer.childNodes,
})
cVertical.render()
