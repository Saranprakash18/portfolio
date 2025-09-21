// Advanced Portfolio JavaScript
// Initialize EmailJS
emailjs.init("eDkDVKUxj_asI3Cbn");

class AdvancedPortfolio {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Bifrost",
                category: "web",
                description: "AI-powered image-to-code converter that transforms UI screenshots into HTML & CSS. Built with Django, OpenCV, and EasyOCR.",
                image: "images/Bifrost.png",
                technologies: ["Python", "Django", "OpenCV", "EasyOCR", "JavaScript", "Tailwind CSS"],
                link: "#",
                github: "https://github.com/Saranprakash18/bifrost"
            },

            {
                id: 2,
                title: "Barter",
                category: "web",
                description: "A product exchange platform where users can trade items of equal value. Built with Django, SQLite, and a responsive frontend.",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400",
                technologies: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript"],
                link: "#",
                github: "https://github.com/Saranprakash18/barter"
            },
            {
                id: 3,
                title: "URL Shortener",
                category: "web",
                description: "Custom URL shortener with analytics and tracking. Built with Django and Tailwind CSS.",
                image: "images/url.png",
                technologies: ["Python", "Django", "SQLite", "Tailwind CSS", "JavaScript"],
                link: "#",
                github: "https://github.com/Saranprakash18/714022201092"
            },
            {
                id: 4,
                title: "WeatherNow",
                category: "web",
                description: "Responsive weather web app fetching real-time weather data from APIs. Features clean UI with Bootstrap and JavaScript.",
                image: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=600&h=400",
                technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "API"],
                link: "#",
                github: "https://github.com/Saranprakash18/weather_now"
            },
            {
                id: 5,
                title: "Social Credits",
                category: "web",
                description: "Web app for managing and rewarding contributions with credits. Includes dashboards, analytics, and secure transactions.",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400",
                technologies: ["Python", "Django", "SQLite", "Tailwind CSS", "JavaScript"],
                link: "#",
                github: "https://github.com/Saranprakash18/social-credits"
            },
            {
                id: 6,
                title: "Skill Swap",
                category: "web",
                description: "A collaborative platform where users can exchange skills with others. Built with Django backend and modern frontend design.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400",
                technologies: ["Python", "Django", "HTML", "CSS", "JavaScript", "Bootstrap"],
                link: "#",
                github: "https://github.com/Saranprakash18/skill-swap"
            }
        ];


        this.skills = [
            {"name": "Python", "percentage": 80, "icon": "fab fa-python"},
            {"name": "Django", "percentage": 70, "icon": "fas fa-server"},
            {"name": "JavaScript", "percentage": 70, "icon": "fab fa-js-square"},
            {"name": "React", "percentage": 60, "icon": "fab fa-react"},
            {"name": "Tailwind CSS", "percentage": 70, "icon": "fas fa-paint-brush"},
            {"name": "HTML5", "percentage": 80, "icon": "fab fa-html5"},
            {"name": "CSS3", "percentage": 80, "icon": "fab fa-css3-alt"},
            {"name": "SQL / MySQL", "percentage": 75, "icon": "fas fa-database"},
            {"name": "Git & GitHub", "percentage": 85, "icon": "fab fa-git-alt"},
            {"name": "OpenCV / EasyOCR", "percentage": 60, "icon": "fas fa-camera"},
            {"name": "Bootstrap", "percentage": 70, "icon": "fab fa-bootstrap"},
            {"name": "REST APIs", "percentage": 70, "icon": "fas fa-network-wired"}
        ];


        this.currentFilter = 'all';
        this.currentTestimonial = 0;
        this.particles = [];
        this.animationId = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParticles();
        this.populateProjects();
        this.populateSkills();
        this.startTypingAnimation();
        this.hideLoadingScreen();
        this.initIntersectionObserver();
        this.initTestimonialSlider();
        this.updateActiveNavLink();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.add('hidden');
        }, 1500);
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // Navigation
        document.getElementById('navToggle').addEventListener('click', this.toggleMobileNav.bind(this));
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Back to top
        document.getElementById('backToTop').addEventListener('click', this.scrollToTop.bind(this));

        // Project filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        // About tabs
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', this.handleTabClick.bind(this));
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', this.handleFormSubmit.bind(this));

        // Modal events
        document.getElementById('modalBackdrop').addEventListener('click', this.closeModal.bind(this));
        document.getElementById('modalClose').addEventListener('click', this.closeModal.bind(this));

        // Testimonial dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.showTestimonial(index));
        });

        // Resize event
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const themeIcon = document.getElementById('themeIcon');
        
        html.setAttribute('data-color-scheme', newTheme);
        
        if (newTheme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    toggleMobileNav() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            this.smoothScrollTo(targetElement);
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    smoothScrollTo(element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');
        const scrolled = window.scrollY > 50;
        
        // Update navbar
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    startTypingAnimation() {
        const texts = [
            'Full Stack Developer',
            'Frontend Developer', 
            'Backend Developer', 
            'Problem Solver',
            'Creative Thinker'
        ];
        const typingText = document.getElementById('typingText');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    initParticles() {
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
                ctx.fill();
            });

            // Draw connections
            this.particles.forEach((particle, i) => {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = particle.x - this.particles[j].x;
                    const dy = particle.y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    populateProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';

        this.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        // Trigger animation
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 100);
            });
        }, 100);
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.setAttribute('data-category', project.category);
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="overlay-content">
                        <i class="fas fa-eye"></i>
                        <p>View Details</p>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            </div>
        `;

        card.addEventListener('click', () => this.openProjectModal(project));
        return card;
    }

    handleFilterClick(e) {
        const filterValue = e.target.getAttribute('data-filter');
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter projects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('show');
                }, 100);
            } else {
                card.classList.remove('show');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    openProjectModal(project) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="modal-project">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 10px; margin-bottom: 1.5rem;">
                <h2>${project.title}</h2>
                <p style="color: var(--portfolio-text-secondary); margin-bottom: 2rem; line-height: 1.6;">
                    ${project.description}
                </p>
                <div class="project-tech" style="margin-bottom: 2rem;">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link}" class="btn btn--primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.github}" class="btn btn--outline" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    populateSkills() {
        const skillsGrid = document.getElementById('skillsGrid');
        skillsGrid.innerHTML = '';

        this.skills.forEach(skill => {
            const skillCard = this.createSkillCard(skill);
            skillsGrid.appendChild(skillCard);
        });
    }

    createSkillCard(skill) {
        const card = document.createElement('div');
        card.className = 'skill-item';
        
        card.innerHTML = `
            <div class="skill-header">
                <i class="${skill.icon} skill-icon"></i>
                <span class="skill-name">${skill.name}</span>
            </div>
            <div class="skill-progress">
                <div class="skill-bar" data-percentage="${skill.percentage}"></div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
        `;

        return card;
    }

    animateSkills() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, index * 200);
        });
    }

    handleTabClick(e) {
        const tabName = e.target.getAttribute('data-tab');
        
        // Update active tab button
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Show corresponding tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabName + '-tab').classList.add('active');

        // Animate counters if about tab is selected
        if (tabName === 'about') {
            this.animateCounters();
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    initTestimonialSlider() {
        setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }

    showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');

        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        this.currentTestimonial = index;
    }

    nextTestimonial() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        this.currentTestimonial = (this.currentTestimonial + 1) % testimonials.length;
        this.showTestimonial(this.currentTestimonial);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.form-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.sendForm("service_xnjnd4l", "template_61xoi5t", form)
            .then(() => {
                this.showNotification("Message sent successfully! I'll get back to you soon.", "success");
                
                // Reset form
                form.reset();
                
                // Reset button state
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                this.showNotification("Failed to send message. Try again!", "error");
                
                // Reset button state
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
                submitBtn.disabled = false;
            });
    }


    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--portfolio-glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--portfolio-glass-border);
            color: var(--portfolio-text-primary);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    // Special animations for specific sections
                    if (entry.target.id === 'skills') {
                        this.animateSkills();
                    } else if (entry.target.id === 'about') {
                        const aboutTab = document.querySelector('.tab-button[data-tab="about"]');
                        if (aboutTab.classList.contains('active')) {
                            this.animateCounters();
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe sections for fade-in animations
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }

    handleResize() {
        // Resize canvas for particles
        const canvas = document.getElementById('particlesCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPortfolio();
});

// Add some additional smooth scrolling for anchor links
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

// Preload images for better performance
window.addEventListener('load', () => {
    const imageUrls = [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400',
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400',
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400',
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});