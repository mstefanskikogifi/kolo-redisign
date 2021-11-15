const swiperList = new Swiper('.swiper-list', {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
        357: {
            slidesPerView: 2,
        },
        769: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 4,
        },
    },
    direction: 'horizontal',
    loop: true,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
});