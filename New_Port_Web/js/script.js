// Portfolio JavaScript
console.log('Portfolio loaded successfully!');

// Prevent browser from restoring scroll position on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Scroll to top immediately on script load
window.scrollTo(0, 0);

// Water bubble trail and navigation effects
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-container');
    let mouseX = 0;
    let mouseY = 0;
    let particleTimer = 0;
    let isOverNavigation = false;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if cursor is over navigation
        const navElement = document.querySelector('nav');
        const navRect = navElement.getBoundingClientRect();
        
        isOverNavigation = mouseX >= navRect.left && 
                          mouseX <= navRect.right &&
                          mouseY >= navRect.top && 
                          mouseY <= navRect.bottom;
        
        // Create bubbles at intervals - only if not over navigation
        particleTimer++;
        if (particleTimer % 3 === 0 && !isOverNavigation) {
            createBubble(mouseX, mouseY);
        }
    });

    // Create water bubble effect
    function createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'particle';
        
        // 5x bigger bubble size variations (20-40px)
        const size = 20 + Math.random() * 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        // Random offset for natural trail effect
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        // Mix of ocean blues and tropical cyans (50/50 chance)
        const colorChoice = Math.random();
        if (colorChoice < 0.5) {
            // Ocean blue gradient
            bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 150, 255, 0.4), rgba(0, 50, 150, 0.6), transparent 70%)`;
        } else {
            // Tropical cyan gradient
            bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 255, 200, 0.4), rgba(0, 150, 100, 0.6), transparent 70%)`;
        }
        
        // Position bubble with random offset
        bubble.style.left = (x + offsetX) + 'px';
        bubble.style.top = (y + offsetY) + 'px';
        
        particleContainer.appendChild(bubble);
        
        // Create dramatic splash effect when bubble bursts (after 2.8 seconds)
        setTimeout(() => {
            createSplash(x + offsetX, y + offsetY, size);
            bubble.remove();
        }, 2800);
    }

    // Create dramatic splash burst effect
    function createSplash(x, y, bubbleSize) {
        // Number of splash particles (8-13 for dramatic effect)
        const splashCount = 8 + Math.floor(Math.random() * 6);
        
        for (let i = 0; i < splashCount; i++) {
            const splash = document.createElement('div');
            splash.className = 'splash-particle';
            
            // Calculate random splash direction and distance
            const angle = (Math.PI * 2 * i) / splashCount + Math.random() * 0.5;
            // Increased burst radius for more dramatic effect (60-120px)
            const distance = 60 + Math.random() * 60;
            const splashX = Math.cos(angle) * distance;
            const splashY = Math.sin(angle) * distance;
            
            // Set CSS custom properties for animation
            splash.style.setProperty('--splash-x', splashX + 'px');
            splash.style.setProperty('--splash-y', splashY + 'px');
            
            // Randomly choose between ocean blue and tropical cyan colors
            const splashColor = Math.random();
            if (splashColor < 0.5) {
                splash.style.background = `radial-gradient(circle, rgba(0, 200, 255, 0.8), transparent 70%)`;
            } else {
                splash.style.background = `radial-gradient(circle, rgba(0, 255, 200, 0.8), transparent 70%)`;
            }
            
            // Position splash at bubble center
            splash.style.left = x + 'px';
            splash.style.top = y + 'px';
            
            particleContainer.appendChild(splash);
            
            // Remove splash particle after animation completes (0.8 seconds)
            setTimeout(() => {
                splash.remove();
            }, 800);
        }
    }

    // Dynamic Typewriter Effect - Single cursor that moves between lines
    initTypewriter();
});

// Create dramatic navigation splash effect - GLOBAL SCOPE
function createNavSplash(x, y) {
    // More dramatic than cursor trail - increased particle count
    const splashCount = 25 + Math.floor(Math.random() * 15); // 25-40 particles
    
    for (let i = 0; i < splashCount; i++) {
        const splash = document.createElement('div');
        splash.className = 'nav-splash';
        
        // Calculate random splash direction and distance
        const angle = (Math.PI * 2 * i) / splashCount + Math.random() * 0.5;
        // Larger burst radius (120-240px) for more dramatic explosion
        const distance = 120 + Math.random() * 120;
        const splashX = Math.cos(angle) * distance;
        const splashY = Math.sin(angle) * distance;
        
        // Set CSS custom properties for animation
        splash.style.setProperty('--splash-x', splashX + 'px');
        splash.style.setProperty('--splash-y', splashY + 'px');
        
        // Mix of ocean blue and tropical cyan colors
        const splashColor = Math.random();
        if (splashColor < 0.5) {
            splash.style.background = `radial-gradient(circle, rgba(0, 200, 255, 0.9), transparent 70%)`;
        } else {
            splash.style.background = `radial-gradient(circle, rgba(0, 255, 200, 0.9), transparent 70%)`;
        }
        
        // Position splash at click location
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        
        // Append to body for proper z-index layering above all elements
        document.body.appendChild(splash);
        
        // Remove splash particle after animation completes (1 second)
        setTimeout(() => {
            splash.remove();
        }, 1000);
    }
}

// Typewriter functionality
function initTypewriter() {
    const greeting = document.querySelector('.greeting-text');
    const name = document.querySelector('.portfolio-name');
    const role = document.querySelector('.role-title');
    
    if (!greeting || !name || !role) return;
    
    // Store original text
    const greetingText = greeting.textContent;
    const nameText = name.textContent;
    const roleText = role.textContent;
    
    // Clear elements initially
    greeting.textContent = '';
    name.textContent = '';
    role.textContent = '';
    
    // Create single cursor element (will be reused)
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.style.width = '3px';
    cursor.style.height = '1em';
    cursor.style.display = 'inline-block';
    cursor.style.animation = 'cursor-blink 0.7s step-end infinite';
    cursor.style.verticalAlign = 'text-bottom';
    cursor.style.marginLeft = '2px';
    
    // Type a single character with dynamic cursor color
    function typeChar(element, text, index, cursorColor, callback) {
        // Set cursor color at the start
        cursor.style.backgroundColor = cursorColor;
        
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            element.appendChild(cursor);
            
            // Show initials at specific points during name typing
            if (element === name) {
                // First S after "Sharath" (7 chars)
                if (index === 6) {
                    const initialS1 = document.getElementById('initial-s1');
                    if (initialS1) initialS1.classList.add('visible');
                }
                // Second S after "Shankar" (6 more chars, total 13)
                if (index === 12) {
                    const initialS2 = document.getElementById('initial-s2');
                    if (initialS2) initialS2.classList.add('visible');
                }
            }
            
            // Dynamic typing speed: faster typing (70ms for spaces, 100ms for letters)
            const char = text[index];
            const delay = char === ' ' ? 70 : 100;
            
            setTimeout(() => {
                typeChar(element, text, index + 1, cursorColor, callback);
            }, delay);
        } else {
            // Finished typing this line
            // Show R after "Rathakrishnan" is fully typed
            if (element === name) {
                const initialR = document.getElementById('initial-r');
                if (initialR) initialR.classList.add('visible');
            }
            
            if (callback) {
                setTimeout(callback, 300); // Brief pause before next line
            }
        }
    }
    
    // Sequential typing: greeting (white) -> name (blue) -> role (white)
    setTimeout(() => {
        typeChar(greeting, greetingText, 0, 'rgba(255, 255, 255, 0.9)', () => {
            // Move cursor to name line (blue)
            typeChar(name, nameText, 0, 'rgba(0, 200, 255, 0.9)', () => {
                // Move cursor to role line (white)
                typeChar(role, roleText, 0, 'rgba(255, 255, 255, 0.9)', () => {
                    // Typing complete - remove cursor
                    cursor.remove();
                });
            });
        });
    }, 500); // Initial delay before starting
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Always scroll to top on page load, then fade in
    window.scrollTo(0, 0);
    document.body.style.opacity = '0';
    
    // Small delay then fade in
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
    
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.fixed-header');
    
    navLinks.forEach(link => {
        // Create bubble element for each nav link
        const bubble = document.createElement('div');
        bubble.className = 'nav-bubble';
        link.appendChild(bubble);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Trigger explosion animation
            const bubbleRect = bubble.getBoundingClientRect();
            const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
            const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2;
            
            console.log('Nav clicked:', link.getAttribute('href'), 'Bubble rect:', bubbleRect);
            
            bubble.classList.add('burst');
            
            setTimeout(() => {
                console.log('Creating splash at:', bubbleCenterX, bubbleCenterY);
                createNavSplash(bubbleCenterX, bubbleCenterY);
            }, 400);
            
            setTimeout(() => {
                bubble.classList.remove('burst');
            }, 1000);
            
            // Smooth scroll
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle SSR initials click - smooth scroll to home and stop (no reload)
    const initialsLinks = document.querySelectorAll('.initial-link');
    initialsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // About card click selection
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            aboutCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
        });
    });
    
    // Scroll spy - highlight active nav link and header translucency
    const sections = document.querySelectorAll('section[id]');
    
    function handleScroll() {
        const scrollPos = window.scrollY;
        
        // Header translucency effect
        if (header) {
            if (scrollPos > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Scroll spy - highlight active nav link
        const checkPos = scrollPos + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (checkPos >= sectionTop && checkPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
});
