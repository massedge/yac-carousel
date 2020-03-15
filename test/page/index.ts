import YacCarousel, { Direction, ContainerNavable as Navable } from '../../src'

var el = document.querySelector('.carousel.flex');
const c = new (Navable(YacCarousel))({
  container: el as HTMLElement,
  previousText: 'Previous',
  nextText: 'Next',
})
c.render();

var el = document.querySelector('.carousel.flex.vertical');
const cVertical = new YacCarousel({
  container: el as HTMLElement,
  direction: Direction.VERTICAL,
})
cVertical.render();
