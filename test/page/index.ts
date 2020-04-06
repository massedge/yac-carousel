// IE 11 polyfills
import 'intersection-observer'
import 'custom-event-polyfill'

// IE 10 polyfills
import 'core-js/stable/weak-map'

import {
  YacCarousel,
  YacCarouselItem,
  Controller,
  NavablePreviousNextButton,
  NavablePreviousNextHandler,
} from '../../src'

const elHorizontal = document.querySelector<HTMLElement>('.carousel.flex')
if (!elHorizontal) throw Error('Horizontal carousel element not found.')

const c = new (NavablePreviousNextButton(YacCarousel))({
  controller: new Controller(),
  element: elHorizontal,
  previousText: 'Previous',
  nextText: 'Next',
  // autoplay: {
  //   enabled: true
  // },
  items: Array.prototype.slice
    .call(elHorizontal.children)
    .filter((child) => child.nodeType === 1)
    .map((element) => {
      const item = new YacCarouselItem({
        element: element as HTMLElement,
      })
      item.render()
      return item
    }),
})
c.render()

const elVertical = document.querySelector<HTMLElement>(
  '.carousel.flex.vertical'
)
if (!elVertical) throw Error('Vertical carousel element not found.')

const elPrevious = document.querySelector<HTMLElement>('.vertical-previous')
if (!elPrevious) throw Error('Previous button for vertical carousel not found.')
const elNext = document.querySelector<HTMLElement>('.vertical-next')
if (!elNext) throw Error('Next button for vertical carousel not found.')

const cVertical = new (NavablePreviousNextHandler(YacCarousel))({
  controller: new Controller(),
  element: elVertical,
  type: 'vertical',
  elPrevious,
  elNext,
  items: Array.prototype.slice
    .call(elVertical.children)
    .filter((child) => child.nodeType === 1)
    .map((element) => {
      const item = new YacCarouselItem({
        element: element as HTMLElement,
      })
      item.render()
      return item
    }),
})
cVertical.render()
