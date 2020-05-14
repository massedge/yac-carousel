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
