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

export function servicesSlider() {
  const sliderEl = document.querySelector('[data-slider="services"]')
  const sliderWrapperEl = document.querySelector('[data-slider="services"] > *')
  const slideEls = document.querySelectorAll('[data-slider="services"] > * > *')

  if (window.matchMedia('only screen and (max-width: 1280px), (pointer: coarse)').matches) {
    sliderEl.classList.add('swiper')
    sliderWrapperEl.classList.add('swiper-wrapper')

    for (const slideEl of slideEls) {
      slideEl.classList.add('swiper-slide')
    }

    setTimeout(() => {
      const servicesSlider = new Swiper( '[data-slider="services"]', {
        loop: true,
        navigation: {
          prevEl: '[data-slider-nav="prev"]',
          nextEl: '[data-slider-nav="next"]'
        }
      })  
    }, 500);
  } else {
    sliderEl.classList.remove('swiper')
    sliderWrapperEl.classList.remove('swiper-wrapper')

    for (const slideEl of slideEls) {
      slideEl.classList.remove('swiper-slide')
    }
  }
}