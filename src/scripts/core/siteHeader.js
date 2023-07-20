export function siteHeader() {
  const siteHeader = document.querySelector('#site-header');

  let scrolled = document.scrollingElement.scrollTop;
  let position = document.querySelector('body').offsetTop;
  if( scrolled > position + 10 ) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  } 
}