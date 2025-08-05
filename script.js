/**
 * Portfolio Website JavaScript
 * Author: Nirant Chavda
 * Description: Main script for portfolio website functionality
 */

/**
 * Initialize the portfolio website when DOM content is loaded
 * Sets up all interactive features and animations
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  })

  // Theme Toggle Functionality
  /**
   * Theme Toggle System
   * Handles dark/light mode switching with localStorage persistence
   */
  const themeToggle = document.getElementById("theme-toggle")
  const html = document.documentElement

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  html.classList.toggle("dark", currentTheme === "dark")

  // Add click event listener for theme toggle
  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark")
    const theme = html.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  })

  /**
   * Mobile Menu Navigation
   * Handles mobile hamburger menu toggle and navigation
   */
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  // Toggle mobile menu visibility
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on navigation links
  const mobileMenuLinks = mobileMenu.querySelectorAll("a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })

  /**
   * Dynamic Typing Animation
   * Creates a typewriter effect for the hero section text
   */
  const typedTextElement = document.getElementById("typed-text")
  const textArray = [
    "B.Tech CSE Student",
    "Indie Web Developer",
    "Hackathon Enthusiast",
    "Problem Solver",
    "Tech Innovator",
    "Full Stack Developer",
    "AI Enthusiast"
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  /**
   * Typewriter animation function
   * Handles character-by-character typing and deleting effect
   */
  function typeText() {
    const currentText = textArray[textIndex]

    if (isDeleting) {
      // Remove characters
      typedTextElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      // Add characters
      typedTextElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000 // Pause at end of word
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % textArray.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeText, typeSpeed)
  }

  // Start the typing animation
  typeText()

  /**
   * Particle Animation System
   * Creates floating particles in the hero section background
   */
  /**
   * Creates animated particles for background decoration
   * Adjusts particle count based on screen size for performance
   */
  function createParticles() {
    const particlesContainer = document.querySelector(".particles-container")
    const particleCount = window.innerWidth < 768 ? 30 : 80

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Set random particle size
      const size = Math.random() * 6 + 2
      particle.style.width = size + "px"
      particle.style.height = size + "px"

      // Set random particle position
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      // Set random animation timing
      particle.style.animationDelay = Math.random() * 8 + "s"
      particle.style.animationDuration = Math.random() * 4 + 6 + "s"

      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  /**
   * Floating Shapes Animation
   * Creates geometric shapes that float in the background
   */
  /**
   * Creates floating geometric shapes with random properties
   * Shapes can be circles or squares with gradient backgrounds
   */
  function createFloatingShapes() {
    const shapesContainer = document.querySelector(".floating-shapes")
    const shapeCount = window.innerWidth < 768 ? 3 : 6
    
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement("div")
      shape.classList.add("floating-shape")
      
      // Randomly choose between circle and square
      const shapeType = Math.random() > 0.5 ? 'circle' : 'square'
      const size = Math.random() * 100 + 50
      
      if (shapeType === 'circle') {
        shape.style.borderRadius = '50%'
      } else {
        shape.style.borderRadius = '20%'
        shape.style.transform = 'rotate(45deg)'
      }
      
      // Set shape properties
      shape.style.width = size + "px"
      shape.style.height = size + "px"
      shape.style.position = 'absolute'
      shape.style.background = `linear-gradient(45deg, 
        rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1),
        rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)
      )`
      
      // Set random position and animation
      shape.style.left = Math.random() * 100 + "%"
      shape.style.top = Math.random() * 100 + "%"
      shape.style.animation = `float-shapes ${Math.random() * 10 + 15}s ease-in-out infinite`
      shape.style.animationDelay = Math.random() * 5 + "s"
      
      shapesContainer.appendChild(shape)
    }
  }
  
  createFloatingShapes()

  /**
   * Section-Specific Background Animations
   * Creates unique animated elements for different sections
   */
  /**
   * Creates animated elements specific to each section
   * - About section: Geometric patterns
   * - Skills section: Floating orbs
   * - Projects section: Code rain effect
   * - Internship section: Network nodes and lines
   * - Achievements section: Sparkle effects
   */
  function createSectionAnimations() {
    // About section: Add geometric patterns
    const aboutBg = document.querySelector('.about-bg')
    if (aboutBg) {
      for (let i = 0; i < 3; i++) {
        const pattern = document.createElement('div')
        pattern.classList.add('geometric-pattern')
        pattern.style.top = Math.random() * 80 + 10 + '%'
        pattern.style.left = Math.random() * 80 + 10 + '%'
        pattern.style.animationDelay = Math.random() * 15 + 's'
        aboutBg.appendChild(pattern)
      }
    }

    // Skills section: Add floating orbs with gradient backgrounds
    const skillsBg = document.querySelector('.skills-bg')
    if (skillsBg) {
      for (let i = 0; i < 2; i++) {
        const orb = document.createElement('div')
        orb.classList.add('floating-orb')
        orb.style.width = Math.random() * 100 + 80 + 'px'
        orb.style.height = orb.style.width
        orb.style.top = Math.random() * 70 + 15 + '%'
        orb.style.left = Math.random() * 70 + 15 + '%'
        orb.style.animationDelay = Math.random() * 12 + 's'
        
        const colors = [
          'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)',
          'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent)',
          'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)',
          'radial-gradient(circle, rgba(147, 51, 234, 0.1), transparent)'
        ]
        orb.style.background = colors[Math.floor(Math.random() * colors.length)]
        skillsBg.appendChild(orb)
      }
    }

    // Projects section: Add code rain animation with programming terms
    const projectsBg = document.querySelector('.projects-bg')
    if (projectsBg) {
      const codeSnippets = [
        'useState()',
        'useEffect()',
        'async/await',
        'fetch()',
        'map()',
        'filter()',
        'reduce()',
        'Promise.all()',
        'setTimeout()',
        'addEventListener()'
      ]
      
      for (let i = 0; i < 5; i++) {
        const rain = document.createElement('div')
        rain.classList.add('code-rain')
        rain.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        rain.style.left = Math.random() * 90 + 5 + '%'
        rain.style.animationDelay = Math.random() * 8 + 's'
        rain.style.animationDuration = Math.random() * 4 + 6 + 's'
        projectsBg.appendChild(rain)
      }
    }

    // Internship section: Add network visualization elements
    const internshipBg = document.querySelector('.internship-bg')
    if (internshipBg) {
      for (let i = 0; i < 3; i++) {
        // Create network nodes
        const node = document.createElement('div')
        node.classList.add('network-node')
        node.style.top = Math.random() * 80 + 10 + '%'
        node.style.left = Math.random() * 80 + 10 + '%'
        node.style.animationDelay = Math.random() * 3 + 's'
        internshipBg.appendChild(node)
        
        // Create network connection lines
        const line = document.createElement('div')
        line.classList.add('network-line')
        line.style.top = Math.random() * 80 + 10 + '%'
        line.style.left = Math.random() * 70 + 15 + '%'
        line.style.width = Math.random() * 100 + 100 + 'px'
        line.style.transform = `rotate(${Math.random() * 360}deg)`
        line.style.animationDelay = Math.random() * 4 + 's'
        internshipBg.appendChild(line)
      }
    }

    // Achievements section: Add sparkle animation elements
    const achievementsBg = document.querySelector('.achievements-bg')
    if (achievementsBg) {
      for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div')
        sparkle.classList.add('sparkle')
        sparkle.style.top = Math.random() * 90 + 5 + '%'
        sparkle.style.left = Math.random() * 90 + 5 + '%'
        sparkle.style.animationDelay = Math.random() * 2 + 's'
        achievementsBg.appendChild(sparkle)
      }
    }
  }

  createSectionAnimations()

  /**
   * Smooth Scrolling Navigation
   * Enables smooth scrolling to sections when clicking navigation links
   */
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  /**
   * Scroll to Top Button Functionality
   * Shows/hides button based on scroll position and handles click to scroll to top
   */
  const scrollTopBtn = document.getElementById("scroll-top")

  // Show/hide scroll to top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.remove("opacity-0", "invisible")
      scrollTopBtn.classList.add("opacity-100", "visible")
    } else {
      scrollTopBtn.classList.add("opacity-0", "invisible")
      scrollTopBtn.classList.remove("opacity-100", "visible")
    }
  })

  // Handle scroll to top button click
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  /**
   * Active Navigation Link Highlighting
   * Updates navigation links to show current section being viewed
   */
  const sections = document.querySelectorAll("section[id]")
  const navLinksAll = document.querySelectorAll(".nav-link")

  /**
   * Updates active navigation link based on current scroll position
   * Highlights the nav link corresponding to the section in view
   */
  function updateActiveNavLink() {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    // Update navigation link styles
    navLinksAll.forEach((link) => {
      link.classList.remove("text-primary-600", "dark:text-primary-400")
      link.classList.add("text-gray-600", "dark:text-gray-300")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-primary-600", "dark:text-primary-400")
        link.classList.remove("text-gray-600", "dark:text-gray-300")
      }
    })
  }

  window.addEventListener("scroll", updateActiveNavLink)

  /**
   * Contact Form Handler
   * Handles form submission with validation and user feedback
   */
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Extract form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Validate required fields
    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error")
      return
    }

    // Validate email format
    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error")
      return
    }

    // Show loading state during form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<div class="loading"></div> Sending...'
    submitBtn.disabled = true

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
      showMessage("Thank you for your message! I'll get back to you soon.", "success")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })

  /**
   * Email validation utility function
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid, false otherwise
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Shows success or error messages in the contact form
   * @param {string} message - Message text to display
   * @param {string} type - Message type ('success' or 'error')
   */
  function showMessage(message, type) {
    // Remove any existing messages
    const existingMessages = contactForm.querySelectorAll(".success-message, .error-message")
    existingMessages.forEach((msg) => msg.remove())

    // Create and display new message
    const messageDiv = document.createElement("div")
    messageDiv.className = type === "success" ? "success-message" : "error-message"
    messageDiv.textContent = message

    // Insert message at the top of the form
    contactForm.insertBefore(messageDiv, contactForm.firstChild)

    // Auto-remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove()
    }, 5000)
  }

  /**
   * Skill Progress Bar Animation
   * Animates skill bars when they come into view using Intersection Observer
   */
  /**
   * Animates skill progress bars when they come into viewport
   * Uses Intersection Observer for performance-optimized animations
   */
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const width = progressBar.style.width
            progressBar.style.width = "0%"
            setTimeout(() => {
              progressBar.style.width = width
              // Add shimmer effect after animation completes
              setTimeout(() => {
                progressBar.classList.add('shimmer-effect')
              }, 1000)
            }, 200)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => observer.observe(bar))
  }

  animateSkillBars()

  /**
   * Enhanced Scroll Animations
   * Adds staggered fade-in animations for various page elements
   */
  function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .social-link')
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards'
          entry.target.style.animationDelay = Math.random() * 0.3 + 's'
        }
      })
    }, { threshold: 0.1 })
    
    animatedElements.forEach(el => scrollObserver.observe(el))
  }
  
  addScrollAnimations()

  /**
   * General Fade-In Animation Observer
   * Handles fade-in animations for elements with .fade-in class
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((el) => observer.observe(el))

  /**
   * Project Modal Handler (Future Enhancement)
   * Placeholder function for opening project detail modals
   * @param {string} projectId - Unique identifier for the project
   */
  function openProjectModal(projectId) {
    // Implementation for project modal functionality
    console.log("Opening project modal for:", projectId)
  }

  /**
   * Project Card Click Animations
   * Adds subtle click feedback animation to project cards
   */
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add visual feedback for click interaction
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  /**
   * Image Preloading for Performance
   * Preloads common images to improve user experience
   */
  function preloadImages() {
    const images = ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=200&width=400"]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  preloadImages()

  /**
   * Page Load Animation
   * Adds loaded class to body when page is fully loaded
   */
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  /**
   * Resume Download Tracking
   * Handles resume download link clicks with analytics tracking
   */
  const resumeLinks = document.querySelectorAll('a[href="resume.pdf"]')
  resumeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Analytics tracking for resume downloads
      console.log("Resume download initiated")
      // Note: If resume.pdf doesn't exist, this should be handled appropriately
    })
  })

  /**
   * Social Links Hover Effects
   * Adds enhanced hover animations for social media links
   */
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(10deg)"
      this.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.3)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
      this.style.boxShadow = ""
    })
  })

  /**
   * Parallax Effect for Hero Section
   * Creates depth effect by moving background elements at different speeds
   */
  function addParallaxEffect() {
    const hero = document.getElementById('home')
    const particles = document.querySelector('.particles-container')
    const shapes = document.querySelector('.floating-shapes')
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      const rate2 = scrolled * -0.3
      
      if (particles) {
        particles.style.transform = `translateY(${rate}px)`
      }
      if (shapes) {
        shapes.style.transform = `translateY(${rate2}px)`
      }
    })
  }
  
  addParallaxEffect()

  /**
   * Mouse Movement Effect for Hero Section
   * Creates subtle interactive movement based on mouse position
   */
  function addMouseEffect() {
    const hero = document.getElementById('home')
    const particles = document.querySelector('.particles-container')
    
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      if (particles) {
        particles.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`
      }
    })
  }
  
  addMouseEffect()

  /**
   * Keyboard Navigation Support
   * Enhances accessibility with keyboard shortcuts
   */
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
    }

    // Enter key activates theme toggle button
    if (e.key === "Enter" && e.target === themeToggle) {
      themeToggle.click()
    }
  })

  /**
   * Performance Optimization: Debounce Function
   * Limits the rate at which a function can fire for better performance
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debouncing to scroll events for better performance
  const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink()
  }, 10)

  window.addEventListener("scroll", debouncedScrollHandler)

  console.log("Portfolio website initialized successfully!")
})

/**
 * Service Worker Registration
 * Enables Progressive Web App (PWA) capabilities
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

/**
 * Custom Cursor Effect (Optional Enhancement)
 * Creates a custom cursor that follows mouse movement
 */
function addCustomCursor() {
  const cursor = document.createElement("div")
  cursor.classList.add("custom-cursor")
  document.body.appendChild(cursor)

  // Update cursor position on mouse movement
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  // Add cursor styles dynamically
  const style = document.createElement("style")
  style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `
  document.head.appendChild(style)
}

// Uncomment the following line to enable custom cursor
// addCustomCursor();
