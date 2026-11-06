// JavaScript for Form Handling, Mobile Menu, Translations, and Theme Switching

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentLang = document.documentElement.lang || 'en';
            const msg = currentLang === 'ar' ? 'شكراً لك! تم استلام رسالتك.' : 'Thank you! Your message has been received.';
            
            formStatus.textContent = msg;
            formStatus.className = "text-xs text-center text-green-500 dark:text-green-400 mt-2 block";
            
            contactForm.reset();

            setTimeout(() => {
                formStatus.className = "text-xs text-center hidden";
            }, 5000);
        });
    }

    // --- 2. Mobile Menu Handling ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }

    // --- 3. Translation Handling ---
    const langToggle = document.getElementById('langToggle');
    const langIcon = document.getElementById('langIcon');
    let currentLang = localStorage.getItem('siteLang') || 'en';

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        if (langIcon) {
            langIcon.textContent = lang === 'ar' ? 'E' : 'ع';
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations && translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        localStorage.setItem('siteLang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(currentLang);
        });
    }
    setLanguage(currentLang);

    // --- 4. Theme Switching Handling ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    // Dark mode is default
    let currentTheme = localStorage.getItem('siteTheme') || 'dark';

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('siteTheme', theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }
    setTheme(currentTheme);
});