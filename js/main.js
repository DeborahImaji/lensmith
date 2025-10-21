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

    mobileNavLinks.forEach(link => {
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


// MOBILE NAVBAR

// OPEN HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);

// MOBILE CLICK INDICATOR

const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileNavLinks.forEach(nav => nav.classList.remove('active'));

        this.classList.add('active');
    });
});


// SLIDESHOW

const homeImages = [
    'assets/images/portfolio-image1.jpg',
    'assets/images/portfolio-image2.jpg',
    'assets/images/portfolio-image3.jpg'
];

let currentIndex = 0;

const homeSection = document.getElementById('home');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

function createIndicators() {
    homeImages.forEach((img, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });
}

function changeBackground(index) {
    homeSection.style.backgroundImage = `url('${homeImages[index]}')`;
    updateIndicators(index);
}

function updateIndicators(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % homeImages.length;
    changeBackground(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + homeImages.length) % homeImages.length;
    changeBackground(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    changeBackground(currentIndex);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

let autoplayInterval = setInterval(nextSlide, 5000);

homeSection.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

homeSection.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

createIndicators();


// PORTFOLIO

// FILTERING
const categoryLinks = document.querySelectorAll('.por-nav-link');
const galleryItems = document.querySelectorAll('.gallery-item');

categoryLinks.forEach(link => {
    link.addEventListener('click', function () {

        categoryLinks.forEach(lnk => lnk.classList.remove('active'));
        this.classList.add('active');

        const selectedCategory = this.getAttribute('data-category');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (selectedCategory === 'all' || itemCategory.includes(selectedCategory)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// LIGHTBOX
const expandButtons = document.querySelectorAll('.gallery-expand');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');

let lightboxCurrentIndex = 0;

expandButtons.forEach((lightboxButton, lightboxIndex) => {
    lightboxButton.addEventListener('click', function () {
        lightboxCurrentIndex = lightboxIndex;
        openLightbox();
        updateLightboxImage();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    const lightboxCurrentItem = galleryItems[lightboxCurrentIndex];
    const lightboxCurrentImg = lightboxCurrentItem.querySelector('img');

    lightboxImage.src = lightboxCurrentImg.src;
    lightboxImage.alt = lightboxCurrentImg.alt;

    lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${galleryItems.length}`;
}

const lightboxNextBtn = document.querySelector('.lightbox-next');
const lightboxPrevBtn = document.querySelector('.lightbox-prev');

lightboxNextBtn.addEventListener('click', function () {
    lightboxCurrentIndex++;

    if (lightboxCurrentIndex >= galleryItems.length) {
        lightboxCurrentIndex = 0;
    }

    updateLightboxImage();
});

lightboxPrevBtn.addEventListener('click', function () {
    lightboxCurrentIndex--;

    if (lightboxCurrentIndex < 0) {
        lightboxCurrentIndex = galleryItems.length - 1;
    }

    updateLightboxImage();
});

const lightboxCloseBtn = document.querySelector('.lightbox-close');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// CAROUSEL

const carouselTrack = document.getElementById('carouselTrack');
const carouselPrevBtn = document.getElementById('carousel-prevBtn');
const carouselNextBtn = document.getElementById('carousel-nextBtn');
const carouselItems = document.querySelectorAll('.carousel-item');

const carouselTotalItems = carouselItems.length;
let carouselCurrentIndex = 0;

function carouselGetVisibleItems() {
    const carouselWidth = window.innerWidth;
    if (carouselWidth <= 500) return 1;
    if (carouselWidth <= 992) return 2;
    return 3;
}

function updateCarousel() {
    const carouselItemsVisible = carouselGetVisibleItems();
    const carouselMaxIndex = carouselTotalItems - carouselItemsVisible;

    if (carouselCurrentIndex > carouselMaxIndex) {
        carouselCurrentIndex = carouselMaxIndex;
    }

    const carouselItemWidth = carouselItems[0].offsetWidth;
    const carouselGap = 20;
    const carouselSlideDistance = (carouselItemWidth + carouselGap) * carouselCurrentIndex;

    carouselTrack.style.transform = `translateX(-${carouselSlideDistance}px)`;

    carouselPrevBtn.disabled = carouselCurrentIndex === 0;
    carouselNextBtn.disabled = carouselCurrentIndex === carouselMaxIndex;
}

carouselPrevBtn.addEventListener('click', () => {
    if (carouselCurrentIndex > 0) {
        carouselCurrentIndex--;
        updateCarousel();
    }
});

carouselNextBtn.addEventListener('click', () => {
    const carouselMaxIndex = carouselTotalItems - carouselGetVisibleItems();
    if (carouselCurrentIndex < carouselMaxIndex) {
        carouselCurrentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

updateCarousel();