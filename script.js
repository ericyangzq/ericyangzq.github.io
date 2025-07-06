

// Dynamic background effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.setProperty('--mouse-x', x);
    document.body.style.setProperty('--mouse-y', y);
    
    // Update background gradients based on mouse position with reduced intensity
    const body = document.body;
    body.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
        radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 100}%, rgba(168, 85, 247, 0.06) 0%, transparent 40%),
        radial-gradient(circle at ${x * 50 + 25}% ${y * 50 + 25}%, rgba(139, 92, 246, 0.04) 0%, transparent 30%),
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

// Particle effect (creates floating elements)
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
    
    const particles = [];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = 2 + Math.random() * 3;
        const opacity = 0.2 + Math.random() * 0.4;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(168, 85, 247, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transition: transform 0.3s ease;
        `;
        
        // Store particle data for mouse interaction
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size,
            opacity: opacity
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Mouse interaction with particles
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Calculate distance from mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            // Apply mouse attraction/repulsion
            if (distance < maxDistance && distance > 0) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                
                // Attract particles towards mouse
                particle.vx += Math.cos(angle) * force * 0.02;
                particle.vy += Math.sin(angle) * force * 0.02;
            }
            
            // Update particle position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add some natural movement
            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;
            
            // Dampen velocity
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Keep particles within bounds
            if (particle.x < 0) {
                particle.x = 0;
                particle.vx *= -0.5;
            }
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth;
                particle.vx *= -0.5;
            }
            if (particle.y < 0) {
                particle.y = 0;
                particle.vy *= -0.5;
            }
            if (particle.y > window.innerHeight) {
                particle.y = window.innerHeight;
                particle.vy *= -0.5;
            }
            
            // Update particle position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Add subtle rotation based on movement
            const rotation = Math.atan2(particle.vy, particle.vx) * (180 / Math.PI);
            particle.element.style.transform = `rotate(${rotation}deg)`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}



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
    // Initialize particles
    createParticles();
    
    // Observe sections for reveal animation (excluding hero section)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}); 