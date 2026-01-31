// Portfolio page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    setupSmoothScrolling();
    setupMobileMenu();
});

// Load and display portfolio data
function loadPortfolioData() {
    try {
        const savedData = localStorage.getItem('portfolioData');
        
        if (!savedData) {
            // If no data, show default/demo data
            showDemoData();
            return;
        }
        
        const data = JSON.parse(savedData);
        
        // Update page title
        document.getElementById('pageTitle').textContent = `${data.fullName} - Portfolio`;
        
        // Update navigation name
        document.getElementById('navName').textContent = data.fullName;
        
        // Update hero section
        document.getElementById('heroName').textContent = data.fullName;
        document.getElementById('heroTitle').textContent = data.title;
        document.getElementById('heroBio').textContent = data.bio;
        
        if (data.location) {
            document.getElementById('heroLocation').innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 18px; height: 18px;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                ${data.location}
            `;
        }
        
        // Update social links
        renderSocialLinks(data);
        
        // Render skills
        renderSkills(data.skills);
        
        // Render experience
        renderExperience(data.experience);
        
        // Render projects
        renderProjects(data.projects);
        
        // Render education
        renderEducation(data);
        
        // Update contact section
        document.getElementById('contactEmail').textContent = data.email;
        
        if (data.phone) {
            document.getElementById('contactPhone').textContent = data.phone;
        } else {
            document.getElementById('contactPhoneContainer').style.display = 'none';
        }
        
        // Update footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        document.getElementById('footerName').textContent = data.fullName;
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        showDemoData();
    }
}

// Render social links
function renderSocialLinks(data) {
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinksContainer.innerHTML = '';
    
    const socialLinks = [
        { url: data.github, icon: 'github', label: 'GitHub' },
        { url: data.linkedin, icon: 'linkedin', label: 'LinkedIn' },
        { url: data.twitter, icon: 'twitter', label: 'Twitter' },
        { url: data.website, icon: 'website', label: 'Website' }
    ];
    
    socialLinks.forEach(social => {
        if (social.url) {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.title = social.label;
            
            link.innerHTML = getSocialIcon(social.icon);
            socialLinksContainer.appendChild(link);
        }
    });
}

// Get social media icon SVG
function getSocialIcon(type) {
    const icons = {
        github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
        website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>'
    };
    
    return icons[type] || icons.website;
}

// Render skills
function renderSkills(skillsString) {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    
    if (!skillsString) {
        skillsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No skills added yet</p>';
        return;
    }
    
    const skills = skillsString.split(',').map(s => s.trim()).filter(s => s);
    
    skills.forEach(skill => {
        const skillBadge = document.createElement('div');
        skillBadge.className = 'skill-badge';
        skillBadge.textContent = skill;
        skillsGrid.appendChild(skillBadge);
    });
}

// Render experience
function renderExperience(experience) {
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    
    if (!experience || experience.length === 0) {
        timeline.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No work experience added yet</p>';
        return;
    }
    
    experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="timeline-title">${exp.jobTitle}</h3>
                    <p class="timeline-subtitle">${exp.company}</p>
                    <p class="timeline-duration">${exp.duration}</p>
                </div>
                <p class="timeline-description">${exp.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Render projects
function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No projects added yet</p>';
        return;
    }
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const linkHtml = project.link ? `
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                View Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            </a>
        ` : '';
        
        projectCard.innerHTML = `
            <h3 class="project-title">${project.name}</h3>
            <p class="project-tech">${project.tech}</p>
            <p class="project-description">${project.description}</p>
            ${linkHtml}
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Render education
function renderEducation(data) {
    const educationContent = document.getElementById('educationContent');
    
    if (!data.degree && !data.university) {
        educationContent.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No education information added yet</p>';
        return;
    }
    
    educationContent.innerHTML = `
        <h3 class="education-degree">${data.degree || 'Degree'}</h3>
        <p class="education-institution">${data.university || 'University'}</p>
        <p class="education-year">${data.gradYear || ''}</p>
    `;
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// Mobile menu toggle function (called from HTML)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Show demo data if no user data exists
function showDemoData() {
    const demoData = {
        fullName: 'Alex Thompson',
        title: 'Full Stack Developer',
        email: 'alex.thompson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I love solving complex problems and creating elegant solutions that make a difference.',
        skills: 'JavaScript, React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Git',
        experience: [
            {
                jobTitle: 'Senior Full Stack Developer',
                company: 'Tech Innovators Inc.',
                duration: '2021 - Present',
                description: 'Leading development of cloud-based applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.'
            },
            {
                jobTitle: 'Full Stack Developer',
                company: 'Digital Solutions Co.',
                duration: '2019 - 2021',
                description: 'Developed and maintained multiple client projects using React and Node.js. Implemented CI/CD pipelines and improved deployment efficiency by 40%.'
            }
        ],
        projects: [
            {
                name: 'E-Commerce Platform',
                tech: 'React, Node.js, PostgreSQL, Stripe',
                description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and real-time analytics dashboard.',
                link: 'https://github.com'
            },
            {
                name: 'Task Management App',
                tech: 'React Native, Firebase, Redux',
                description: 'Cross-platform mobile app for team collaboration with real-time updates and offline support.',
                link: 'https://github.com'
            },
            {
                name: 'Analytics Dashboard',
                tech: 'Vue.js, D3.js, Python, Flask',
                description: 'Interactive data visualization dashboard for business intelligence with customizable reports and export features.',
                link: 'https://github.com'
            }
        ],
        degree: 'Bachelor of Science in Computer Science',
        university: 'University of California, Berkeley',
        gradYear: '2019',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        website: ''
    };
    
    // Save demo data temporarily
    localStorage.setItem('portfolioData', JSON.stringify(demoData));
    
    // Reload to display demo data
    location.reload();
}

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 243, 255, 0.2);
            z-index: 999;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-links a {
            font-size: 1.2rem;
            padding: 0.5rem 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);
