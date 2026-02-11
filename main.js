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
        // initImageCompression();
        initPreloader();
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

    function initImageCompression() {
        const images = document.querySelectorAll(".compress");

        images.forEach(img => {
            // Only compress if not already compressed (check data attribute)
            if (img.dataset.compressed) return;

            const tempImg = new Image();
            tempImg.src = img.src;

            tempImg.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Resize image to 50% of original size
                canvas.width = tempImg.width / 2;
                canvas.height = tempImg.height / 2;

                ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

                // Export as WebP to preserve transparency (0.8 = 80% quality)
                img.src = canvas.toDataURL("image/webp", 0.8);
                img.dataset.compressed = "true";
            };
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
                // For example, fade in the nav similar to how it appears
                const nav = document.querySelector('nav');
                // The nav has its own logic, but we can animate the header/logo in
                const header = document.querySelector('header');
                if (header) {
                    header.style.opacity = '0';
                    header.style.transition = 'opacity 1s ease 0.5s';
                    requestAnimationFrame(() => {
                        header.style.opacity = '1';
                    });
                }

                // Also animate the hero content
                const hero = document.querySelector('.hero-container');
                if (hero) {
                    hero.style.opacity = '0';
                    hero.style.transform = 'translateY(20px)';
                    hero.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
                    requestAnimationFrame(() => {
                        hero.style.opacity = '1';
                        hero.style.transform = 'translateY(0)';
                    });
                }

            }, 500); // 500ms minimum duration for branding visibility
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    function initScrollEffect() {
        // Logo scroll effect removed - logo now stays visible on whole page
        // Keeping function for potential future scroll effects
    }

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
