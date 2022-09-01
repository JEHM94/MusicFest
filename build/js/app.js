document.addEventListener('DOMContentLoaded', () => {
    startApp();
});

function startApp() {
    fixedNavBar();
    createGallery();
    scrollNav();
}
// Navigation Bar ******
// Fixed Nav ******
function fixedNavBar() {
    const bar = document.querySelector('.header');
    const aboutFest = document.querySelector('.about-fest');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(aboutFest.getBoundingClientRect().top < 0){
            bar.classList.add('fixed-nav');
            body.classList.add('body-scroll');
        } else {
            bar.classList.remove('fixed-nav');
            body.classList.remove('body-scroll');
        }
    });
}
// Scroll Navigation ******
function scrollNav() {
    const links = document.querySelectorAll('.main-navigation a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const scrollTo = e.target.attributes.href.value;
            const section = document.querySelector(scrollTo);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Galery ******
function createGallery() {
    const gallery = document.querySelector('.gallery-images');

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
                alt="Gallery Image Number ${i}">
        
        `;
        image.onclick = function () {
            showImage(i);
        }

        gallery.appendChild(image);
    }
}

function showImage(id) {
    const image = document.createElement('picture');
    image.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
                alt="Galery Image Number ${id}">
        
        `;

    // Creates the Overlay
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fix-body')
        overlay.remove();
    }

    // Close Button
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('btn-close');
    closeModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fix-body')
        overlay.remove();
    }
    overlay.appendChild(closeModal);

    // Adds it to the HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fix-body')
}