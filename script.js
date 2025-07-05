// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Mouse move event for custom cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX - 20 + 'px';
    cursorFollower.style.top = e.clientY - 20 + 'px';
});

// Cursor effects on hover
document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a') || 
        e.target.classList.contains('contact-method') || 
        e.target.classList.contains('social-link') ||
        e.target.classList.contains('hero-title') ||
        e.target.classList.contains('section-title')) {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.background = 'rgba(0, 255, 136, 0.3)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a') || 
        e.target.classList.contains('contact-method') || 
        e.target.classList.contains('social-link') ||
        e.target.classList.contains('hero-title') ||
        e.target.classList.contains('section-title')) {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = 'rgba(0, 255, 136, 0.1)';
    }
});

// Dynamic background effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.setProperty('--mouse-x', x);
    document.body.style.setProperty('--mouse-y', y);
    
    // Update background gradients based on mouse position
    const body = document.body;
    body.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
        radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 100}%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
        #000000
    `;
});

// Interactive text effects
const heroTitle = document.querySelector('.hero-title');
const sectionTitles = document.querySelectorAll('.section-title');

// Glow effect on contact methods
const contactMethods = document.querySelectorAll('.contact-method');
contactMethods.forEach(method => {
    method.addEventListener('mouseenter', () => {
        method.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
        method.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    method.addEventListener('mouseleave', () => {
        method.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.3)';
        method.style.transform = 'translateY(-5px) scale(1)';
    });
});

// Social buttons hover effect
const socialBtns = document.querySelectorAll('.social-btn');
socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px) scale(1.1)';
        btn.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.6)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = 'none';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Particle effect (optional - creates floating elements)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(168, 85, 247, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${4 + Math.random() * 3}s ease-in-out infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
    
    // Initialize particles
    createParticles();
    
    // Observe sections for reveal animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}); 