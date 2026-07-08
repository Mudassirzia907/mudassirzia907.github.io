document.addEventListener("DOMContentLoaded", async () => {
    try {
        const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
        
        for (const sec of sections) {
            const response = await fetch(`sections/${sec}.html`);
            if (response.ok) {
                const el = document.getElementById(sec);
                if (el) el.innerHTML = await response.text();
            }
        }
        
        // Wait for DOM injection to parse, then initialize animations and forms
        setTimeout(() => {
            initObserver();
            initContactForm();
            init3DEffects();
        }, 100);

    } catch (error) {
        console.error("Error loading sections:", error);
    }
});

function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => observer.observe(el));
}

function initContactForm() {
    const form = document.getElementById('glass-contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            window.location.href = `mailto:mudassirzia907@gmail.com?subject=${subject}&body=${body}`;
        });
    }
}

// Handles 3D tilt effects on cards
function init3DEffects() {
    const cards = document.querySelectorAll('.glass-card.tilt-enabled');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate rotation. Range is roughly -5 to 5 degrees.
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}
