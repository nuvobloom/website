(function () {
    'use strict';

    // --- Mobile Menu Functionality ---
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        const logoLink = document.querySelector('.logo-link');
        if (!menuBtn || !nav) return;

        const spans = menuBtn.querySelectorAll('span');

        function resetMenu() {
            nav.classList.remove('active');
            if (logoLink) logoLink.classList.remove('hidden');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }

        function toggleMenu() {
            const isActive = nav.classList.contains('active');
            if (isActive) {
                resetMenu();
            } else {
                nav.classList.add('active');
                if (logoLink) logoLink.classList.add('hidden');
                spans[0].style.transform = 'translateY(4.5px) rotate(45deg)';
                spans[1].style.transform = 'translateY(-4.5px) rotate(-45deg)';
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
            link.addEventListener('click', function(e) {
                // Only reset menu on mobile (when menu is active)
                if (nav.classList.contains('active')) {
                    resetMenu();
                }
            }, { passive: true });
        });
    }

    // --- FAQ Accordion Functionality ---
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

            questionButton.addEventListener('click', function(event) {
                event.preventDefault();
                handleFAQClick(item, faqItems);
            });
        });
    }

    // --- Copyright Year Auto-Update ---
    function initCopyrightYear() {
        const copyrightElements = document.querySelectorAll('.footer-copyright');
        const currentYear = new Date().getFullYear();
        
        copyrightElements.forEach(element => {
            // Update the year in the copyright text
            element.textContent = element.textContent.replace(/\d{4}/, currentYear);
        });
    }

    // --- Bento Grid Animations ---
    function initBentoGrid() {
        // Layout Animation
        const layoutGrid = document.getElementById('layoutGrid');
        if (layoutGrid) {
            const layouts = ['layout-cols-2', 'layout-cols-3', 'layout-cols-1'];
            let currentLayout = 0;
            
            // Set initial layout
            layoutGrid.className = 'layout-grid ' + layouts[currentLayout];
            
            setInterval(() => {
                currentLayout = (currentLayout + 1) % layouts.length;
                layoutGrid.className = 'layout-grid ' + layouts[currentLayout];
            }, 2500);
        }

        // Speed Indicator Animation
        const speedValue = document.getElementById('speedValue');
        const speedBar = document.getElementById('speedBar');
        
        if (speedValue && speedBar) {
            // Initial loading state
            speedValue.style.opacity = '0';
            speedValue.style.filter = 'blur(5px)';
            speedValue.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                speedValue.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                speedValue.style.opacity = '1';
                speedValue.style.filter = 'blur(0px)';
                speedValue.style.transform = 'translateY(0)';
                
                // Trigger bar fill animation
                setTimeout(() => {
                    speedBar.classList.add('loaded');
                }, 100);
            }, 500);
        }

        // Security Badge Animation
        const securityBadge = document.getElementById('securityBadge');
        if (securityBadge) {
            const shields = securityBadge.querySelectorAll('.shield');
            let activeIndex = -1;
            
            setInterval(() => {
                // Reset all shields
                shields.forEach(shield => shield.classList.remove('active'));
                
                // Activate next shield
                activeIndex = (activeIndex + 1) % shields.length;
                shields[activeIndex].classList.add('active');
                
                // Reset after all are active
                if (activeIndex === shields.length - 1) {
                    setTimeout(() => {
                        shields.forEach(shield => shield.classList.remove('active'));
                        activeIndex = -1;
                    }, 800);
                }
            }, 800);
        }

        // Intersection Observer for fade-in animations
        const bentoCards = document.querySelectorAll('.bento-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        bentoCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Initialize all scripts when DOM is ready
    function init() {
        initMobileMenu();
        initFAQ();
        initCopyrightYear();
        initBentoGrid();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
