import YacCarousel, {
  Direction,
  ContainerNavablePreviousNextButton,
  ContainerNavablePreviousNextHandler,
} from '../../src'

const elHorizontal = document.querySelector<HTMLElement>('.carousel.flex')
if (!elHorizontal) throw Error('Horizontal carousel element not found.')

const c = new (ContainerNavablePreviousNextButton(YacCarousel))({
  element: elHorizontal,
  previousText: 'Previous',
  nextText: 'Next',
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

const cVertical = new (ContainerNavablePreviousNextHandler(YacCarousel))({
  element: elVertical,
  direction: Direction.VERTICAL,
  elPrevious,
  elNext,
})
cVertical.render()
