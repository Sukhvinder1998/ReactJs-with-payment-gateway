jQuery(function ($) {
    console.log(
        "%cWebsite Built by Jagsness",
        "background: #0a383f; color: #ffffff; display: block;padding:5px 15px;border-radius:7px"
    );
    // Put each and every piece of code with comments and in between this brackets
    var swiper = new Swiper('.banner_slider', {
        loop: true,
        slidesPerView: 1,
        speed: 1500,
    });

    var swiper = new Swiper('.cards_sec', {
        loop: true,
        spaceBetween: 30,
        speed: 500,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },  
            576: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 5,
            }
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });

    var swiper = new Swiper('.book_my_event', {
        loop: true,
        spaceBetween: 20,
        speed: 1000,
        autoplay: {
            delay: 1000,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },  
            576: {
                slidesPerView: 3,
            },
            767: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 6,
            }
        },
    });

    var swiper = new Swiper('.popular_events_slider', {
        loop: true,
        spaceBetween: 20,
        speed: 1000,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },  
            576: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 5,
            }
        },
    });
});


// // Responsive Menu JS by Aditya
// document.querySelector(".hamburger").addEventListener("click", function() {
//     this.classList.toggle("is-active");
//     document.querySelector(".menu").classList.toggle("show-menu");
// });

// // Hide menu if clicked outside
// document.addEventListener("click", function(event) {
//     const isClickInsideMenu = document.querySelector(".menu").contains(event.target);
//     const isClickOnHamburger = document.querySelector(".hamburger").contains(event.target);
//     if (!isClickInsideMenu && !isClickOnHamburger) {
//         document.querySelector(".menu").classList.remove("show-menu");
//         document.querySelector(".hamburger").classList.remove("is-active");
//     }
// });