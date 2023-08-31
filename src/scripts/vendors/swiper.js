// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css/bundle';

export function quotesSlider() {
  const quotesSlider = new Swiper( '[data-slider="quotes"]', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '[data-slider-nav="prev"]',
      nextEl: '[data-slider-nav="next"]'
    }
  })
}