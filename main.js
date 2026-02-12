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
        initPreloader();
    }

    // initRevealAnimations removed


    function initScrollAnimations() {
        // Elements to animate
        const animatedElements = [
            ...document.querySelectorAll('.hero-headline'),
            ...document.querySelectorAll('.hero-subheadline'),
            ...document.querySelectorAll('.cta-wrapper'),
            ...document.querySelectorAll('.why-choose-card'),
            ...document.querySelectorAll('.why-choose-headline'),
            ...document.querySelectorAll('.faq-title'),
            ...document.querySelectorAll('.faq-item'),
            ...document.querySelectorAll('.secondary-cta-headline'),
            ...document.querySelectorAll('.secondary-cta-subheadline'),
            ...document.querySelectorAll('.secondary-cta-wrapper')
        ];

        if (animatedElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Determine delay based on element type or position
                    let delay = 0;

                    if (el.classList.contains('why-choose-card')) {
                        // Find index among cards for staggering
                        const cards = Array.from(document.querySelectorAll('.why-choose-card'));
                        const index = cards.indexOf(el);
                        delay = (index % 3) * 150;
                    } else if (el.classList.contains('faq-item')) {
                        // Find index among faq items for staggering
                        const faqs = Array.from(document.querySelectorAll('.faq-item'));
                        const index = faqs.indexOf(el);
                        // Stagger FAQ items subtly
                        delay = index * 100;
                    } else if (el.classList.contains('hero-headline')) {
                        delay = 100;
                    } else if (el.classList.contains('hero-subheadline')) {
                        delay = 300;
                    } else if (el.classList.contains('cta-wrapper')) {
                        delay = 500;
                    }

                    setTimeout(() => {
                        el.classList.add('in-view');
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.classList.add('cinematic-reveal');
            observer.observe(el);
        });
    }

    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Prevent scrolling during load
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const hidePreloader = () => {
            // Optional: minimal delay to ensure smooth transition if load is too fast
            setTimeout(() => {
                preloader.classList.add('loaded'); // Fades out the preloader
                document.body.style.overflow = ''; // Restore scrolling
                document.documentElement.style.overflow = '';

                // Trigger entrance animations for other elements if desired
                const header = document.querySelector('header');
                if (header) {
                    header.style.opacity = '0';
                    header.style.transition = 'opacity 1s ease 0.5s';
                    requestAnimationFrame(() => {
                        header.style.opacity = '1';
                    });
                }

                // Also animate the hero content - REMOVED to let initScrollAnimations handle it
                // const hero = document.querySelector('.hero-container');
                // if (hero) { ... }

                // Initialize scroll animations after preloader is done
                initScrollAnimations();

            }, 500); // 500ms minimum duration for branding visibility
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    // initScrollEffect removed

    // Force scroll to top on page refresh/load
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Always scroll to top on page load/refresh
    window.scrollTo(0, 0);

    // Show preloader on page navigation (clicking internal links)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.remove('loaded');
                preloader.style.display = 'flex';
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
