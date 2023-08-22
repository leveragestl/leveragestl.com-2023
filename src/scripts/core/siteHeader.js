import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function siteHeader() {
  // const siteHeader = document.querySelector('#site-header');

  // let scrolled = document.scrollingElement.scrollTop;
  // let position = document.querySelector('body').offsetTop;
  // if( scrolled > position + 10 ) {
  //   siteHeader.classList.add('scrolled');
  // } else {
  //   siteHeader.classList.remove('scrolled');
  // }

  // let diagWrapperHeight = Math.round(document.querySelector('.wrapperCap').getBoundingClientRect().height)

  let diagWrapperHeight = document.querySelector('.wrapperCap').clientHeight

  console.log(diagWrapperHeight);

  ScrollTrigger.create({
    trigger: (document.querySelector('[data-header-scrolled]')) ? '[data-header-scrolled]' : '.hero + *',
    start: 'top-='+diagWrapperHeight+'px top',
    end: 'top-='+diagWrapperHeight+'px top',
    // markers: true,
    onUpdate:() => document.body.classList.toggle('scrolled')
    // onLeave:() => document.body.classList.add('scrolled'),
    // onLeaveBack:() => document.body.classList.add('scrolled'),
    // onEnter:() => document.body.classList.remove('scrolled'),
    // onEnterBack:() => document.body.classList.remove('scrolled')
  })

  /*
  const siteHeaderAnimTL = gsap.timeline({
    defaults: {
      // duration: 1,
      // ease: 'linear'
    },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top bottom',
      // markers: true,
      onLeave:() => document.body.classList.add('scrolled'),
      onLeaveBack:() => document.body.classList.add('scrolled'),
      onEnter:() => document.body.classList.remove('scrolled'),
      onEnterBack:() => document.body.classList.remove('scrolled')
    }
  }) 
  siteHeaderAnimTL
  */
}