// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css/bundle';

export function quotesSlider() {
  const quotesSlider = new Swiper( '[data-slider="quotes"]', {
    loop: true,
    autoHeight: true,
    navigation: {
      prevEl: '[data-slider-nav="prev"]',
      nextEl: '[data-slider-nav="next"]'
    },
    breakpoints: {
      1024: {
        autoHeight: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      }
    }
  })
}