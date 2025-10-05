// DESKTOP NAVBAR

// CLICK INDICATOR
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active'));

        this.classList.add('active');
    });
});

// SCROLL SPY INDICATOR
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// NAVBAR BACKGROUND

const navbar = document.querySelector('#navbar');
const navbarTrigger = document.getElementById('home-h2');

window.addEventListener('scroll', function () {
    const navbarTriggerPosition = navbarTrigger.offsetTop;

    if (window.scrollY >= navbarTriggerPosition) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});