const items = document.querySelectorAll("#studio li");

const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// runs each time that we scroll
const run = () => {
    items.forEach((item) => {
        if (isInViewport(item)) {
            item.classList.add("show");
        }
    })
    if (isInViewport(sloganText)) {
        sloganText.classList.add('slogan-show')
    }
};

window.addEventListener("load", run);
window.addEventListener("resize", run);
window.addEventListener("scroll", run);

//-------------- Nav
// const navbar = document.querySelector('nav');
// const showcase = document.querySelector('#showcase');
//
// const stickyNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) navbar.classList.add('fixed');
//   else navbar.classList.remove('fixed');
// };
//
// const navbarObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-40px`,
// });
// navbarObserver.observe(showcase);

// ------------------------- slogan fade in
const sloganText = document.querySelector('.slogan');

//--------------------------------------------------------------------------------------------------------------- Code






















