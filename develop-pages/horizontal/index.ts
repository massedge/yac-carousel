import 'normalize.css'
import './index.css'

// IE 11 polyfills
import 'intersection-observer'
import 'custom-event-polyfill'

// IE 10 polyfills
import 'core-js/stable/weak-map'

import {
  YacCarousel,
  NavablePreviousNextButtonMixin,
  NavablePreviousNextHandlerMixin,
} from '../../src'

const elContainer = document.querySelector<HTMLElement>('.carousel.flex')
if (!elContainer) throw Error('Horizontal carousel element not found.')

const c = new (NavablePreviousNextButtonMixin(YacCarousel))({
  element: elContainer,
  previousText: 'Previous',
  nextText: 'Next',
  // autoplay: {
  //   enabled: true
  // },
  items: elContainer.children,
  loop: true,
})
c.render()

// add active class to active element
c.items[c.index].element.classList.add('active')
c.on('yac:select:after', (e) => {
  c.items[e.detail.fromIndex].element.classList.remove('active')
  c.items[e.detail.toIndex].element.classList.add('active')
})
