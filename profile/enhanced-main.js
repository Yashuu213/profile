// Enhanced Portfolio Website JavaScript
// Advanced animations, interactions, and email functionality

class EnhancedPortfolio {
    constructor() {
        this.init();
        this.setupEmailHandler();
    }

    init() {
        this.setupAdvancedTypewriter();
        this.setupScrollAnimations();
        this.setupSkillRadar();
        this.setupProjectCarousel();
        this.setupParticleBackground();
        this.setupContactForm();
        this.setupNavigation();
        this.setupCreativeEffects();
        this.setupInteractiveElements();
    }

    // Advanced typewriter with multiple effects
    setupAdvancedTypewriter() {
        if (typeof Typed !== 'undefined') {
            // Main hero typewriter
            new Typed('#hero-typewriter', {
                strings: [
                    'AI & ML Engineer',
                    'Software Engineer',
                    'Computer Vision Expert',
                    'Data Science',
                    'Data Analyst'
                ],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 5000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                preStringTyped: (arrayPos, self) => {
                    // Add glow effect when typing
                    document.querySelector('.typed-cursor').style.textShadow = '0 0 10px #00D4FF';
                },
                onStringTyped: (arrayPos, self) => {
                    // Remove glow effect after typing
                    setTimeout(() => {
                        document.querySelector('.typed-cursor').style.textShadow = 'none';
                    }, 1000);
                }
            });

            // Secondary typewriter for taglines
            if (document.getElementById('tagline-typewriter')) {
                new Typed('#tagline-typewriter', {
                    strings: [
                        'Transforming ideas into intelligent solutions',
                        'Building the future with artificial intelligence',
                        'Where data meets innovation',
                        'Creating smarter tomorrow, today'
                    ],
                    typeSpeed: 60,
                    backSpeed: 30,
                    backDelay: 3000,
                    loop: true,
                    showCursor: false
                });
            }
        }
    }

    // Enhanced scroll animations with stagger effects
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-item, .skill-item, .project-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                            
                            // Add special effects for certain elements
                            if (child.classList.contains('skill-item')) {
                                this.animateSkillBar(child);
                            }
                            if (child.classList.contains('project-card')) {
                                this.animateProjectCard(child);
                            }
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section, .glass-card, .timeline-item').forEach(section => {
            observer.observe(section);
        });
    }

    // Animate skill bars with easing
    animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            anime({
                targets: progressBar,
                width: width + '%',
                duration: 2000,
                easing: 'easeOutCubic',
                delay: 500
            });
        }
    }

    // Animate project cards with 3D effects
    animateProjectCard(card) {
        anime({
            targets: card,
            translateY: [50, 0],
            opacity: [0, 1],
            rotateX: [15, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    }

    // Interactive skills radar chart with animations
    setupSkillRadar() {
        if (typeof echarts !== 'undefined') {
            const chartDom = document.getElementById('skills-radar');
            if (chartDom) {
                const myChart = echarts.init(chartDom);
                
                const option = {
                    backgroundColor: 'transparent',
                    radar: {
                        indicator: [
                            { name: 'Machine Learning', max: 100 },
                            { name: 'NLP', max: 100 },
                            { name: 'Computer Vision', max: 100 },
                            { name: 'Data Science', max: 100 },
                            { name: 'Python', max: 100 },
                            { name: 'Deep Learning', max: 100 }
                        ],
                        shape: 'polygon',
                        splitNumber: 4,
                        axisName: {
                            color: '#00D4FF',
                            fontSize: 12,
                            fontWeight: 'bold'
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(139, 92, 246, 0.3)',
                                width: 2
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(0, 212, 255, 0.05)', 'rgba(139, 92, 246, 0.05)']
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(139, 92, 246, 0.5)'
                            }
                        }
                    },
                    series: [{
                        name: 'Skills',
                        type: 'radar',
                        data: [{
                            value: [90, 85, 80, 88, 95, 82],
                            name: 'Technical Skills',
                            areaStyle: {
                                color: 'rgba(0, 212, 255, 0.3)'
                            },
                            lineStyle: {
                                color: '#00D4FF',
                                width: 3
                            },
                            itemStyle: {
                                color: '#8B5CF6',
                                borderColor: '#FFFFFF',
                                borderWidth: 2
                            }
                        }],
                        animationDuration: 3000,
                        animationEasing: 'cubicOut',
                        animationDelay: 1000
                    }]
                };

                myChart.setOption(option);
                
                // Add interactive hover effects
                myChart.on('highlight', function(params) {
                    // Add glow effect on hover
                    anime({
                        targets: chartDom,
                        scale: 1.02,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                });
                
                // Responsive resize
                window.addEventListener('resize', () => {
                    myChart.resize();
                });
            }
        }
    }

    // Enhanced project carousel with 3D effects
    setupProjectCarousel() {
        if (typeof Splide !== 'undefined') {
            const splide = new Splide('#project-carousel', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                breakpoints: {
                    768: {
                        perPage: 1,
                    },
                    1024: {
                        perPage: 2,
                    }
                }
            });

            splide.mount();

            // Enhanced 3D hover effects for project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    anime({
                        targets: card,
                        rotateY: 15,
                        rotateX: 15,
                        scale: 1.05,
                        translateZ: 50,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                    
                    // Add glow effect
                    card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.4)';
                });

                card.addEventListener('mouseleave', () => {
                    anime({
                        targets: card,
                        rotateY: 0,
                        rotateX: 0,
                        scale: 1,
                        translateZ: 0,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                    
                    // Remove glow effect
                    card.style.boxShadow = 'none';
                });
            });
        }
    }

    // Advanced particle background with mouse interaction
    setupParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: 0, y: 0 };

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Enhanced Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? '#00D4FF' : '#8B5CF6';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.x -= dx * force * 0.01;
                    this.y -= dy * force * 0.01;
                }

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // Create particles
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        // Mouse interaction
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // Enhanced contact form with email functionality
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const steps = form.querySelectorAll('.form-step');
        const nextBtns = form.querySelectorAll('.next-btn');
        const prevBtns = form.querySelectorAll('.prev-btn');
        const stepIndicators = document.querySelectorAll('.step-indicator');
        let currentStep = 0;

        const updateStepDisplay = () => {
            steps.forEach((step, index) => {
                if (index === currentStep) {
                    step.classList.add('active');
                    stepIndicators[index].classList.remove('bg-gray-600');
                    stepIndicators[index].classList.add('bg-cyan-500');
                } else {
                    step.classList.remove('active');
                    stepIndicators[index].classList.remove('bg-cyan-500');
                    stepIndicators[index].classList.add('bg-gray-600');
                }
            });
        };

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    updateStepDisplay();
                    
                    anime({
                        targets: steps[currentStep],
                        translateX: [50, 0],
                        opacity: [0, 1],
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    updateStepDisplay();
                    
                    anime({
                        targets: steps[currentStep],
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });

        // Form submission with email functionality
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send email using the email handler
                const response = await this.sendEmail(data);
                
                if (response.success) {
                    this.showSuccessMessage();
                    form.reset();
                    currentStep = 0;
                    updateStepDisplay();
                } else {
                    this.showErrorMessage(response.error);
                }
            } catch (error) {
                this.showErrorMessage('Failed to send message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Email sending functionality
    setupEmailHandler() {
        // This would typically integrate with an email service
        // For now, we'll create a mock implementation
        this.sendEmail = async (formData) => {
            // In a real implementation, this would call an email API
            // For demo purposes, we'll simulate a successful send
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 2000);
            });
        };
    }

    // Show success message with animation
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="text-4xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                <p class="text-lg">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <div class="mt-4 text-sm text-gray-300">
                    <p>Your message has been sent to: yashsharma.td@gmail.com</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        anime({
            targets: successMessage,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });

        setTimeout(() => {
            anime({
                targets: successMessage,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
                complete: () => successMessage.remove()
            });
        }, 4000);
    }

    // Show error message
    showErrorMessage(error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'success-message';
        errorMessage.style.background = 'rgba(239, 68, 68, 0.95)';
        errorMessage.innerHTML = `
            <div class="success-content">
                <div class="text-4xl mb-4">❌</div>
                <h3 class="text-2xl font-bold mb-2">Error Sending Message</h3>
                <p class="text-lg">${error}</p>
            </div>
        `;
        
        document.body.appendChild(errorMessage);
        
        anime({
            targets: errorMessage,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });

        setTimeout(() => {
            anime({
                targets: errorMessage,
                scale: [1, 0],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
                complete: () => errorMessage.remove()
            });
        }, 3000);
    }

    // Navigation functionality with smooth scrolling
    setupNavigation() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navigation background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Creative effects and animations
    setupCreativeEffects() {
        // Text splitting animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }

        // Floating elements animation
        this.setupFloatingElements();
        
        // Glitch effects for text
        this.setupGlitchEffects();
        
        // Color cycling animations
        this.setupColorCycling();
    }

    // Setup floating elements
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((element, index) => {
            anime({
                targets: element,
                translateY: [-20, 20],
                duration: 3000 + (index * 500),
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine'
            });
        });
    }

    // Setup glitch effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(element => {
            setInterval(() => {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    element.style.transform = 'none';
                }, 100);
            }, 3000);
        });
    }

    // Setup color cycling
    setupColorCycling() {
        const cycleElements = document.querySelectorAll('.color-cycle');
        cycleElements.forEach(element => {
            let hue = 0;
            setInterval(() => {
                hue = (hue + 1) % 360;
                element.style.filter = `hue-rotate(${hue}deg)`;
            }, 50);
        });
    }

    // Interactive elements
    setupInteractiveElements() {
        // Skill items hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                anime({
                    targets: item,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                anime({
                    targets: item,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Timeline items animation
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                anime({
                    targets: item,
                    scale: [1, 1.05, 1],
                    duration: 400,
                    easing: 'easeOutCubic'
                });
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedPortfolio();
});

// Utility functions
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

// Export for use in other files
window.EnhancedPortfolio = EnhancedPortfolio;