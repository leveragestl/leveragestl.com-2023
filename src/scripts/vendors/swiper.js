// import Swiper JS
import Swiper from 'swiper/bundle';
// import Styles
import '../../styles/vendors/swiper/swiper.scss'
import '../../styles/vendors/swiper/swiper-bundle.css'

export function quotesSlider() {
  const quotesSlider = new Swiper( '[data-slider=quotes]', {
    loop: true,
    // autoHeight: true,
    navigation: {
      prevEl: '[data-slider=quotes] [data-slider-nav=prev]',
      nextEl: '[data-slider=quotes] [data-slider-nav=next]'
    },
    breakpoints: {
      1024: {
        // autoHeight: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      }
    }
  })
}

export function servicesSlider() {
  const sliderEl = document.querySelector('[data-slider=services]')
  const sliderWrapperEl = document.querySelector('[data-swiper=wrapper]')
  const slideEls = document.querySelectorAll('[data-swiper=scene]')

  if (window.matchMedia('only screen and (max-width: 1280px), (pointer: coarse)').matches && sliderEl && sliderWrapperEl && slideEls) {
    sliderEl.classList.add('swiper')
    sliderWrapperEl.classList.add('swiper-wrapper')

    for (const slideEl of slideEls) {
      slideEl.classList.add('swiper-slide')
    }

    setTimeout(() => {
      const servicesSlider = new Swiper( '[data-slider=services]', {
        loop: true,
        navigation: {
          prevEl: '[data-slider=services] [data-slider-nav=prev]',
          nextEl: '[data-slider=services] [data-slider-nav=next]'
        }
      })  
    }, 500);
  } else {
    if (sliderEl) {
      sliderEl.classList.remove('swiper')
      sliderWrapperEl.classList.remove('swiper-wrapper')
  
      for (const slideEl of slideEls) {
        slideEl.classList.remove('swiper-slide')
      }        
    }
  }
}

export function staffSlider() {
  const staffSlider = new Swiper( '[data-slider=staff]', {
    // loop: true,
    // autoHeight: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      prevEl: '#staff [data-slider-nav=prev]',
      nextEl: '#staff [data-slider-nav=next]'
    },
    breakpoints: {
      1024: {
        slidesPerView: 2
      }
    }
  })
}

export function imageCarousel() {
  const imageCarousel = new Swiper( '[data-slider=image-carousel]', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 105,
      }
    }
  })
}