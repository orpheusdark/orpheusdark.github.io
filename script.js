// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  })

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle")
  const html = document.documentElement

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  html.classList.toggle("dark", currentTheme === "dark")

  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark")
    const theme = html.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  })

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })

  // Typing Animation
  const typedTextElement = document.getElementById("typed-text")
  const textArray = [
    "Diploma Student",
    "Indie Web Developer",
    "Hackathon Enthusiast",
    "Problem Solver",
    "Tech Innovator",
  ]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = textArray[textIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % textArray.length
      typeSpeed = 500 // Pause before next word
    }

    setTimeout(typeText, typeSpeed)
  }

  // Start typing animation
  typeText()

  // Particles Animation
  function createParticles() {
    const particlesContainer = document.querySelector(".particles-container")
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size
      const size = Math.random() * 4 + 2
      particle.style.width = size + "px"
      particle.style.height = size + "px"

      // Random position
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"

      // Random animation delay
      particle.style.animationDelay = Math.random() * 6 + "s"
      particle.style.animationDuration = Math.random() * 3 + 3 + "s"

      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById("scroll-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.remove("opacity-0", "invisible")
      scrollTopBtn.classList.add("opacity-100", "visible")
    } else {
      scrollTopBtn.classList.add("opacity-0", "invisible")
      scrollTopBtn.classList.remove("opacity-100", "visible")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Active Navigation Link
  const sections = document.querySelectorAll("section[id]")
  const navLinksAll = document.querySelectorAll(".nav-link")

  function updateActiveNavLink() {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

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

  // Contact Form
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Basic validation
    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error")
      return
    }

    // Show loading state
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

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = contactForm.querySelectorAll(".success-message, .error-message")
    existingMessages.forEach((msg) => msg.remove())

    // Create new message
    const messageDiv = document.createElement("div")
    messageDiv.className = type === "success" ? "success-message" : "error-message"
    messageDiv.textContent = message

    // Insert message at the top of the form
    contactForm.insertBefore(messageDiv, contactForm.firstChild)

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove()
    }, 5000)
  }

  // Skill Progress Animation
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
            }, 200)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => observer.observe(bar))
  }

  animateSkillBars()

  // Intersection Observer for Fade In Animation
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

  // Project Modal (if needed for future enhancement)
  function openProjectModal(projectId) {
    // Implementation for project modal
    console.log("Opening project modal for:", projectId)
  }

  // Add click handlers for project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add subtle click animation
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Preload images for better performance
  function preloadImages() {
    const images = ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=200&width=400"]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  preloadImages()

  // Add loading animation for page
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Handle resume download
  const resumeLinks = document.querySelectorAll('a[href="resume.pdf"]')
  resumeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // You can add analytics tracking here
      console.log("Resume download initiated")
      // If resume.pdf doesn't exist, you might want to handle this
    })
  })

  // Add hover effects for social links
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
    }

    // Enter key on theme toggle
    if (e.key === "Enter" && e.target === themeToggle) {
      themeToggle.click()
    }
  })

  // Performance optimization: Debounce scroll events
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

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink()
  }, 10)

  window.addEventListener("scroll", debouncedScrollHandler)

  console.log("Portfolio website initialized successfully!")
})

// Service Worker Registration (for PWA capabilities)
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

// Add custom cursor effect (optional enhancement)
function addCustomCursor() {
  const cursor = document.createElement("div")
  cursor.classList.add("custom-cursor")
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  // Add cursor styles
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

// Uncomment to enable custom cursor
// addCustomCursor();
