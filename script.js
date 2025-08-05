// CV Download with Progress
function setupCVDownload() {
    const downloadBtn = document.querySelector('a[download]');
    if (!downloadBtn) return;
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'download-progress';
    progressContainer.style.display = 'none';
    progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0%</span>
    `;
    
    // Insert progress after the button
    downloadBtn.parentNode.insertBefore(progressContainer, downloadBtn.nextSibling);
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const cvUrl = this.getAttribute('href');
        const progressBar = progressContainer.querySelector('.progress-fill');
        const progressText = progressContainer.querySelector('.progress-text');
        
        // Show progress container
        progressContainer.style.display = 'flex';
        this.style.display = 'none';
        
        // Simulate download progress
        let progress = 0;
        const duration = 30000; // 30 seconds
        const interval = 100; // update every 100ms
        const increment = (interval / duration) * 100;
        
        const downloadInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(downloadInterval);
                // Trigger actual download after animation completes
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = cvUrl;
                    link.download = cvUrl.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Reset button state
                    setTimeout(() => {
                        progressContainer.style.display = 'none';
                        downloadBtn.style.display = 'inline-flex';
                        progressBar.style.width = '0%';
                        progressText.textContent = '0%';
                    }, 500);
                }, 500);
            }
            
            // Update progress
            const roundedProgress = Math.min(Math.round(progress), 100);
            progressBar.style.width = `${roundedProgress}%`;
            progressText.textContent = `${roundedProgress}%`;
        }, interval);
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .testimonial-card, .blog-card');
    const screenPosition = window.innerHeight / 1.2;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Send to WhatsApp
            const whatsappNumber = '+256768432509';
            const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. Message: ${message}`;
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');

            // Delay email sending to ensure WhatsApp action completes
            setTimeout(() => {
                const mailtoLink = `mailto:mugishamicheal24@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
                window.location.href = mailtoLink;
            }, 1000); // 1-second delay

            // Reset form
            contactForm.reset();
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use system preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            
            if (theme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Hero image perspective effect
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateY(-10deg)';
        });
    }

    // Initialize animations
    const elements = document.querySelectorAll('.skill-category, .project-card, .testimonial-card, .blog-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
    
    // Initial animation
    setTimeout(animateOnScroll, 500);
    window.addEventListener('scroll', animateOnScroll);
    
    // Setup CV download functionality
    setupCVDownload();
});
