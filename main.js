(function () {
    'use strict';

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

            questionButton.addEventListener('click', function(event) {
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
