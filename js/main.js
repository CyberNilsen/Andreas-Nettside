document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeSkillBars();
    highlightCurrentPage();
    addHeroEffects();
    addScrollAnimations();
    initializeProjectHoverEffects();
});


function initializeHeader() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    addCustomCSS(`
        /* MODIFIED: Increased header size when scrolled */
        #main-header.scrolled {
            padding: 15px 40px !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    `);
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


function initializeSkillBars() {
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
                    bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
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


function addHeroEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('hero-content-animated');
    }

    const heroHeading = heroSection.querySelector('h2');
    if (heroHeading && (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/'))) {
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
        }, 80); 
    }
    
    const ctaButton = heroSection.querySelector('.btn');
    if (ctaButton) {
        ctaButton.classList.add('cta-animated');
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
    }, { threshold: 0.15 });
    
    sections.forEach((section, index) => {
        section.classList.add('section-hidden');
        
        // Make the first content section visible immediately
        if (index === 0) {
            setTimeout(() => {
                section.classList.add('section-visible');
            }, 100); // Small delay to ensure transition works
        } else {
            observer.observe(section);
        }
    });
}


function initializeProjectHoverEffects() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.classList.add('project-hover');
        });
        
        project.addEventListener('mouseleave', () => {
            project.classList.remove('project-hover');
        });
    });
}


function addCustomCSS(cssText) {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);
}

(function addCustomStyles() {
    const customStyles = `
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project {
            cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), 
                        box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            position: relative;
            overflow: hidden;
        }
        
        .project-hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0, 78, 146, 0.15);
        }
        
        .typing-effect::after {
            content: '|';
            animation: cursor-blink 1s step-end infinite;
            color: #0056b3;
        }
        
        .typing-complete::after {
            animation: none;
            content: '';
        }
        
        /* Animated CTA button */
        .cta-animated {
            position: relative;
            overflow: hidden;
        }
        
        .cta-animated::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0) 0%, 
                rgba(255, 255, 255, 0.2) 50%, 
                rgba(255, 255, 255, 0) 100%);
            animation: shine 3s infinite;
        }
        
        .skill-bar {
            overflow: hidden;
            border-radius: 4px;
            background-color: rgba(0, 60, 120, 0.1);
        }
        
        .skill-progress {
            background: linear-gradient(90deg, #0056b3, #007bff);
            position: relative;
        }
        
        /* Animation keyframes */
        @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        @keyframes shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
        }
        
        .hero-content-animated {
            position: relative;
            z-index: 2;
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = customStyles;
    document.head.appendChild(styleEl);
})();