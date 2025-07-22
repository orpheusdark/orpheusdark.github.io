// Data
const projectsData = [
    {
        id: 1,
        title: "Personal Portfolio Website",
        category: "web",
        description: "A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring dynamic content, theme switching, and interactive animations.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        github: "https://github.com/orpheusdark",
        demo: "https://orpheusdark.github.io",
        image: "res/creato2024.jpg"
    },
    {
        id: 2,
        title: "AI Chatbot System",
        category: "ai",
        description: "An intelligent chatbot system built with Python and Flask, featuring natural language processing and machine learning capabilities.",
        tech: ["Python", "Flask", "NLP", "Machine Learning"],
        github: "https://github.com/orpheusdark",
        demo: "#",
        image: "res/tedx_nithamirpur.jpg"
    },
    {
        id: 3,
        title: "E-Commerce Platform",
        category: "web",
        description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        github: "https://github.com/orpheusdark",
        demo: "#",
        image: "res/pitchtank-dtu.jpg"
    },
    {
        id: 4,
        title: "Mobile Task Manager",
        category: "mobile",
        description: "A cross-platform mobile application for task management with offline capabilities and cloud synchronization.",
        tech: ["React Native", "Firebase", "Redux", "AsyncStorage"],
        github: "https://github.com/orpheusdark",
        demo: "#",
        image: "res/vadoadara_hachathon.jpg"
    }
];

const skillsData = {
    frontend: [
        { name: "HTML5", icon: "🌐", level: 90 },
        { name: "CSS3", icon: "🎨", level: 85 },
        { name: "JavaScript", icon: "⚡", level: 88 },
        { name: "React", icon: "⚛️", level: 80 },
        { name: "Vue.js", icon: "💚", level: 75 }
    ],
    backend: [
        { name: "Python", icon: "🐍", level: 85 },
        { name: "Node.js", icon: "🟢", level: 80 },
        { name: "Java", icon: "☕", level: 75 },
        { name: "PHP", icon: "🐘", level: 70 },
        { name: "SQL", icon: "🗄️", level: 82 }
    ],
    tools: [
        { name: "Git", icon: "📝", level: 85 },
        { name: "Docker", icon: "🐳", level: 70 },
        { name: "AWS", icon: "☁️", level: 65 },
        { name: "Linux", icon: "🐧", level: 80 },
        { name: "VS Code", icon: "💻", level: 90 }
    ]
};

const certificationsData = [
    {
        id: 1,
        name: "Python for Everybody Specialization",
        organization: "University of Michigan (Coursera)",
        icon: "🏆",
        color: "#FFD700"
    },
    {
        id: 2,
        name: "Full Stack Web Development",
        organization: "Udemy",
        icon: "🎓",
        color: "#4CAF50"
    },
    {
        id: 3,
        name: "Machine Learning Fundamentals",
        organization: "Stanford Online",
        icon: "🤖",
        color: "#2196F3"
    },
    {
        id: 4,
        name: "AWS Cloud Practitioner",
        organization: "Amazon Web Services",
        icon: "☁️",
        color: "#FF9800"
    }
];

const galleryData = [
    {
        id: 1,
        src: "res/creato2024.jpg",
        title: "Creato 2024",
        description: "Innovation and creativity showcase event",
        category: "hackathon"
    },
    {
        id: 2,
        src: "res/creato2024.1.jpg",
        title: "Creato 2024 - Team Event",
        description: "Collaborative innovation session",
        category: "hackathon"
    },
    {
        id: 3,
        src: "res/creato2023.jpg",
        title: "Creato 2023",
        description: "Previous year's creative showcase",
        category: "hackathon"
    },
    {
        id: 4,
        src: "res/pitchtank-dtu.jpg",
        title: "Pitch Tank DTU",
        description: "Entrepreneurship and startup pitching event",
        category: "event"
    },
    {
        id: 5,
        src: "res/pitch tank-dtu.jpg",
        title: "Pitch Tank DTU - Presentation",
        description: "Presenting innovative solutions",
        category: "event"
    },
    {
        id: 6,
        src: "res/tedx_nithamirpur.jpg",
        title: "TEDx NIT Hamirpur",
        description: "Speaking at TEDx event",
        category: "event"
    },
    {
        id: 7,
        src: "res/vadoadara_hachathon.jpg",
        title: "Vadodara Hackathon",
        description: "Participating in city-wide hackathon",
        category: "hackathon"
    },
    {
        id: 8,
        src: "res/vadoadra_hacahthon.jpg",
        title: "Vadodara Hackathon - Team",
        description: "Team collaboration during hackathon",
        category: "hackathon"
    }
];

// Global variables
let currentTheme = 'dark';
let isMenuOpen = false;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const scrollProgress = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Initialize components
    initializeParticles();
    initializeTypingEffect();
    initializeNavigation();
    initializeScrollEffects();
    initializeTheme();
    initializeAnimations();
    
    // Load content
    loadProjects();
    loadSkills();
    loadCertifications();
    loadGallery();
    
    // Initialize counters
    initializeCounters();
    
    // Event listeners
    setupEventListeners();
}

// Particle System
function initializeParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let waves = [];
    let floatingShapes = [];
    let animationId;
    let time = 0;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            color: Math.random() > 0.5 ? 'rgba(0, 212, 255, ' : 'rgba(138, 43, 226, ',
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulsePhase: Math.random() * Math.PI * 2
        };
    }
    
    function createWave() {
        return {
            y: Math.random() * canvas.height,
            amplitude: Math.random() * 50 + 20,
            frequency: Math.random() * 0.02 + 0.005,
            speed: Math.random() * 0.02 + 0.01,
            opacity: Math.random() * 0.3 + 0.1,
            color: Math.random() > 0.5 ? '0, 212, 255' : '138, 43, 226'
        };
    }
    
    function createFloatingShape() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 30 + 10,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            opacity: Math.random() * 0.2 + 0.05,
            shape: Math.floor(Math.random() * 3), // 0: circle, 1: triangle, 2: square
            color: Math.random() > 0.5 ? '0, 212, 255' : '138, 43, 226'
        };
    }
    
    function initParticles() {
        particles = [];
        waves = [];
        floatingShapes = [];
        
        const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
        const waveCount = 3;
        const shapeCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
        
        for (let i = 0; i < waveCount; i++) {
            waves.push(createWave());
        }
        
        for (let i = 0; i < shapeCount; i++) {
            floatingShapes.push(createFloatingShape());
        }
    }
    
    function updateParticles() {
        time += 0.016; // ~60fps
        
        // Update particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Add slight gravitational pull towards center
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                particle.vx += (dx / distance) * 0.0001;
                particle.vy += (dy / distance) * 0.0001;
            }
            
            // Bounce off edges with some energy loss
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            
            // Update pulse phase
            particle.pulsePhase += particle.pulseSpeed;
        });
        
        // Update floating shapes
        floatingShapes.forEach(shape => {
            shape.x += shape.vx;
            shape.y += shape.vy;
            shape.rotation += shape.rotationSpeed;
            
            // Wrap around edges
            if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
            if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
            if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
        });
    }
    
    function drawWaves() {
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${wave.color}, ${wave.opacity})`;
            ctx.lineWidth = 2;
            
            for (let x = 0; x <= canvas.width; x += 5) {
                const y = wave.y + Math.sin((x * wave.frequency) + (time * wave.speed)) * wave.amplitude;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        });
    }
    
    function drawFloatingShapes() {
        floatingShapes.forEach(shape => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.fillStyle = `rgba(${shape.color}, ${shape.opacity})`;
            
            switch (shape.shape) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 1: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -shape.size / 2);
                    ctx.lineTo(-shape.size / 2, shape.size / 2);
                    ctx.lineTo(shape.size / 2, shape.size / 2);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 2: // Square
                    ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                    break;
            }
            ctx.restore();
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw waves first (background layer)
        drawWaves();
        
        // Draw floating shapes
        drawFloatingShapes();
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    const opacity = 0.15 * (1 - distance / 120);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        // Draw particles
        particles.forEach(particle => {
            const pulseSize = 1 + Math.sin(particle.pulsePhase) * 0.3;
            const currentRadius = particle.radius * pulseSize;
            const currentOpacity = particle.opacity * (0.8 + Math.sin(particle.pulsePhase) * 0.2);
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + currentOpacity + ')';
            ctx.fill();
            
            // Add glow effect
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + (currentOpacity * 0.1) + ')';
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Typing Effect
function initializeTypingEffect() {
    const texts = [
        "Computer Science Student",
        "Full Stack Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
}

// Scroll Effects
function initializeScrollEffects() {
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.8)';
        }
    }
    
    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavbar();
        updateBackToTop();
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Theme System
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Content Loading Functions
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);
        
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card fade-in" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.github}" target="_blank" class="project-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="${project.demo}" target="_blank" class="project-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-category">${project.category.toUpperCase()}</span>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        // Re-observe new elements for animation
        document.querySelectorAll('.project-card.fade-in').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            observer.observe(el);
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.getAttribute('data-filter'));
        });
    });
    
    renderProjects();
}

function loadSkills() {
    const categories = ['frontend', 'backend', 'tools'];
    
    categories.forEach(category => {
        const container = document.getElementById(`${category}-skills`);
        const skills = skillsData[category];
        
        container.innerHTML = skills.map(skill => `
            <div class="skill-item scale-in">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">
                    <div class="skill-progress" data-level="${skill.level}"></div>
                </div>
            </div>
        `).join('');
    });
    
    // Animate skill progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 300);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

function loadCertifications() {
    const certificationsGrid = document.getElementById('certifications-grid');
    
    certificationsGrid.innerHTML = certificationsData.map(cert => `
        <div class="certification-card slide-in-left">
            <div class="certification-icon" style="background: ${cert.color}">
                ${cert.icon}
            </div>
            <div class="certification-info">
                <h3>${cert.name}</h3>
                <p>${cert.organization}</p>
            </div>
        </div>
    `).join('');
}

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    
    function renderGallery(filter = 'all') {
        const filteredItems = filter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === filter);
        
        galleryGrid.innerHTML = filteredItems.map(item => `
            <div class="gallery-item scale-in" data-category="${item.category}">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h4 class="gallery-title">${item.title}</h4>
                    <p class="gallery-description">${item.description}</p>
                </div>
            </div>
        `).join('');
        
        // Add click listeners for lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-title').textContent;
                const description = item.querySelector('.gallery-description').textContent;
                
                openLightbox(img.src, title, description);
            });
        });
        
        // Re-observe new elements for animation
        document.querySelectorAll('.gallery-item.scale-in').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });
            observer.observe(el);
        });
    }
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderGallery(button.getAttribute('data-filter'));
        });
    });
    
    renderGallery();
}

// Lightbox
function openLightbox(src, title, description) {
    lightboxImage.src = src;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners
function setupEventListeners() {
    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form handling (if needed)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects are handled here
}, 16)); // ~60fps

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}