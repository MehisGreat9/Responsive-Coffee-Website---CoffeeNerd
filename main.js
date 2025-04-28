/* ============================ SCROLL TO TOP ============================ */
const scrollTopBtn = document.getElementById("scrollTopBtn");
//show button when scroll to a certain point
window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
        scrollTopBtn.classList.add("show");
    } else{
        scrollTopBtn.classList.remove("show");
    }
})
//scroll smoothly to top at click
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
})

/* ============================ GSAP FULL-SCREEN NAVBAR NAVIGATION MENU ============================ */
const tl = gsap.timeline({ paused: true });
const menuToggleBtn = document.getElementById("menu_toggle_btn");
const navLinks = document.querySelectorAll('.nav_link');
const animateOpenNav = () => {
    tl.to("#nav_container", { autoAlpha: 1, delay: 0.1, visibility: "visible", duration: 0.2 });
    tl.to(".site_logo", { opacity: 0, duration: 0.2 }, "-=0.1");
    tl.to(".navbar", { boxShadow: "none", duration: 0.2 }, "-=0.1");

    tl.from(".flex > div", {
        opacity: 0,
        y: 10,
        stagger: 0.04,
        duration: 0.4
    });
    tl.to(".nav_link > a", {
        top: 0,
        ease: "power2.inOut",
        stagger: 0.1,
        duration: 0.8
    }, "-=0.4");
    tl.from(".nav_footer", { opacity: 0, duration: 0.3 }, "-=0.5");
    tl.reverse();
};
const toggleNav = () => {
    menuToggleBtn.classList.toggle("active");
    tl.reversed(!tl.reversed());
};
animateOpenNav();

menuToggleBtn.addEventListener("click", toggleNav);
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (!tl.reversed()){
            menuToggleBtn.classList.remove('active');
            tl.reverse();
        }
    });
});

/* ============================ PRODUCT SLIDER ============================ */
const circular_slider = document.querySelector('.wrapper'),
      coffee_name = document.querySelector('.coffee_name'),
      slides = document.querySelectorAll('.slides'),
      desc_item = document.querySelectorAll('.desc_item'),
      images = document.querySelectorAll(".slides img");
      slides.forEach((slide, i) => {
        slide.onclick = () => {
            circular_slider.style.transform = `rotateZ(-${360 / 5 * (i + 4)}deg)`;
            coffee_name.classList.remove('active');
            setTimeout(() => {
                coffee_name.textContent = desc_item[i].
                                    querySelector('h1').textContent;
                coffee_name.classList.add('active');
            }, 800);
            images.forEach(img => img.classList.remove('active'));
            desc_item.forEach(desc => desc.classList.remove('active'));

            slide.querySelector('img').classList.add('active');
            desc_item[i].classList.add('active');
        }
      });
