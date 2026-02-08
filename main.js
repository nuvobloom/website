(function () {
    'use strict';

    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        if (!menuBtn || !nav) return;

        const spans = menuBtn.querySelectorAll('span');

        function resetMenu() {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
            spans[0].style.transform = '';
            spans[1].style.transform = '';
        }

        function toggleMenu() {
            const isActive = nav.classList.contains('active');
            if (isActive) {
                resetMenu();
            } else {
                nav.classList.add('active');
                menuBtn.classList.add('active');
                document.body.classList.add('menu-open');
            }
        }

        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        }, { passive: false });

        document.addEventListener('click', function (e) {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                resetMenu();
            }
        }, { passive: true });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function (e) {
                if (nav.classList.contains('active')) {
                    resetMenu();
                }
            }, { passive: true });
        });
    }

    function initFAQ() {
        const faqItems = Array.from(document.querySelectorAll('.faq-item'));
        if (faqItems.length === 0) return;

        function handleFAQClick(clickedItem, allItems) {
            const isCurrentlyActive = clickedItem.classList.contains('active');

            allItems.forEach(item => {
                item.classList.remove('active');
            });

            if (!isCurrentlyActive) {
                clickedItem.classList.add('active');
            }
        }

        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            if (!questionButton) return;

            questionButton.addEventListener('click', function (event) {
                event.preventDefault();
                handleFAQClick(item, faqItems);
            });
        });
    }

    function initCopyrightYear() {
        const copyrightElements = document.querySelectorAll('.footer-copyright');
        const currentYear = new Date().getFullYear();

        copyrightElements.forEach(element => {
            element.textContent = element.textContent.replace(/\d{4}/, currentYear);
        });
    }

    function init() {
        initMobileMenu();
        initFAQ();
        initCopyrightYear();
        initScrollEffect();
        // initRevealAnimations();
    }

    function initRevealAnimations() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    function initScrollEffect() {
        const nav = document.querySelector('nav');
        const logo = document.querySelector('.logo-link');
        if (!nav || !logo) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scroll-hidden');
                logo.classList.add('scroll-hidden');
            } else {
                nav.classList.remove('scroll-hidden');
                logo.classList.remove('scroll-hidden');
            }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
