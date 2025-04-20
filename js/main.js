
document.addEventListener('DOMContentLoaded', function() {
    addHeaderScrollEffect();
    animateSkillBars();
    highlightCurrentPage();
    addCyberSecurityEffects();
    addScrollAnimations();
});


function addHeaderScrollEffect() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage === href) {
            link.classList.add('active');
        }
    });
}


function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;
    
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        bar.style.width = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const originalWidth = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.2s ease-out';
                    bar.style.width = originalWidth;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}


function addCyberSecurityEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const effectContainer = document.createElement('div');
    effectContainer.classList.add('cyber-effect-container');
    heroSection.prepend(effectContainer);

    const heroHeading = heroSection.querySelector('h2');
    if (heroHeading && window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const originalText = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.classList.add('typing-effect');
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                heroHeading.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                heroHeading.classList.add('typing-complete');
            }
        }, 100);
    }
}

function addScrollAnimations() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}


(function addCustomStyles() {
    const customStyles = `
       
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s, transform 0.8s;
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project {
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .project-hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0, 255, 140, 0.2);
        }
        
        .cyber-effect-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .typing-effect::after {
            content: '|';
            animation: cursor-blink 1s step-end infinite;
        }
        
        .typing-complete::after {
            animation: none;
            content: '';
        }
        
        @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = customStyles;
    document.head.appendChild(styleEl);
})();