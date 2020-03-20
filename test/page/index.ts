import YacCarousel, {
  Direction,
  ContainerNavablePreviousNextButton,
  ContainerNavablePreviousNextHandler,
} from '../../src'

const elHorizontal = document.querySelector<HTMLElement>('.carousel.flex');
if (!elHorizontal) throw Error('Horizontal carousel element not found.');

const c = new (ContainerNavablePreviousNextButton(YacCarousel))({
  element: elHorizontal,
  previousText: 'Previous',
  nextText: 'Next',
})
c.render();

const elVertical = document.querySelector<HTMLElement>('.carousel.flex.vertical');
if (!elVertical) throw Error('Vertical carousel element not found.');

const cVertical = new (ContainerNavablePreviousNextHandler(YacCarousel))({
  element: elVertical,
  direction: Direction.VERTICAL,
  elPrevious: document.querySelector<HTMLElement>('.vertical-previous'),
  elNext: document.querySelector<HTMLElement>('.vertical-next'),
})
cVertical.render();
