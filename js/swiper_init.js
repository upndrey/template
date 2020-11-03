/* ----- Top slider ----- */
var swiper1 = new Swiper('.topslider .swiper-container', {
  spaceBetween: 0,
  effect: 'fade',
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: '.topslider .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.topslider .swiper-button-next',
    prevEl: '.topslider .swiper-button-prev',
  },
});
/* ----- /Top slider ----- */

/* ----- Brands ----- */
var swiper2 = new Swiper('.brand-carousel .swiper-container', {
  slidesPerView: 6,
  spaceBetween: 0,
  centeredSlides: false,
  speed: 1000,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: '.brand-carousel .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.brand-carousel .swiper-button-next',
    prevEl: '.brand-carousel .swiper-button-prev',
  },
});
/* ----- /Brands ----- */

/* ----- Related products ----- */
/*
var swiper3 = new Swiper('.related-products .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 0,
  centeredSlides: true,
  speed: 1000,
  loop: true,
  pagination: {
    el: '.related-products .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.related-products .swiper-button-next',
    prevEl: '.related-products .swiper-button-prev',
  },
});
*/
/* ----- /Related products ----- */
