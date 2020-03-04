import YacCarousel, { Direction, Navable } from '../../src'

  var el = document.querySelector('.carousel.flex');
  const c = new (Navable(YacCarousel))({
    container: el as HTMLElement
  })
  c.render();

  var el = document.querySelector('.carousel.flex.vertical');
  const cVertical = new YacCarousel({
    container: el as HTMLElement,
    direction: Direction.VERTICAL,
  })
  cVertical.render();


  // c.on('index:change:before', function(e) {
  //   e.preventDefault();
  //   console.log(e);
  // });

  //var cb = new YacCarousel(document.querySelector('.carousel.block'));
  //var cf = new YacCarousel(document.querySelector('.carousel.flex'));