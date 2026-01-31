// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('portfolioForm');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = collectFormData();
            saveToLocalStorage(formData);
            window.location.href = 'portfolio.html';
        }
    });
    
    // Load existing data if editing
    loadExistingData();
});

// Validate form inputs
function validateForm() {
    const requiredFields = [
        'fullName',
        'title',
        'email',
        'bio',
        'skills'
    ];
    
    let isValid = true;
    let firstInvalidField = null;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            isValid = false;
            field.style.borderColor = '#ff0066';
            
            if (!firstInvalidField) {
                firstInvalidField = field;
            }
            
            // Remove error styling on input
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        }
    });
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value && !emailRegex.test(email.value)) {
        isValid = false;
        email.style.borderColor = '#ff0066';
        alert('Please enter a valid email address');
        
        if (!firstInvalidField) {
            firstInvalidField = email;
        }
    }
    
    if (!isValid) {
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidField.focus();
        }
        alert('Please fill in all required fields marked with *');
    }
    
    return isValid;
}

// Collect all form data
function collectFormData() {
    const formData = {
        // Personal Information
        fullName: document.getElementById('fullName').value.trim(),
        title: document.getElementById('title').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        bio: document.getElementById('bio').value.trim(),
        
        // Skills
        skills: document.getElementById('skills').value.trim(),
        
        // Experience
        experience: [],
        
        // Projects
        projects: [],
        
        // Education
        degree: document.getElementById('degree').value.trim(),
        university: document.getElementById('university').value.trim(),
        gradYear: document.getElementById('gradYear').value.trim(),
        
        // Social Links
        github: document.getElementById('github').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        twitter: document.getElementById('twitter').value.trim(),
        website: document.getElementById('website').value.trim()
    };
    
    // Collect experience entries
    const jobTitles = document.getElementsByName('jobTitle[]');
    const companies = document.getElementsByName('company[]');
    const durations = document.getElementsByName('duration[]');
    const jobDescriptions = document.getElementsByName('jobDescription[]');
    
    for (let i = 0; i < jobTitles.length; i++) {
        if (jobTitles[i].value.trim()) {
            formData.experience.push({
                jobTitle: jobTitles[i].value.trim(),
                company: companies[i].value.trim(),
                duration: durations[i].value.trim(),
                description: jobDescriptions[i].value.trim()
            });
        }
    }
    
    // Collect project entries
    const projectNames = document.getElementsByName('projectName[]');
    const projectTechs = document.getElementsByName('projectTech[]');
    const projectDescriptions = document.getElementsByName('projectDescription[]');
    const projectLinks = document.getElementsByName('projectLink[]');
    
    for (let i = 0; i < projectNames.length; i++) {
        if (projectNames[i].value.trim()) {
            formData.projects.push({
                name: projectNames[i].value.trim(),
                tech: projectTechs[i].value.trim(),
                description: projectDescriptions[i].value.trim(),
                link: projectLinks[i].value.trim()
            });
        }
    }
    
    return formData;
}

// Save data to localStorage
function saveToLocalStorage(data) {
    try {
        localStorage.setItem('portfolioData', JSON.stringify(data));
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving your data. Please try again.');
    }
}

// Load existing data for editing
function loadExistingData() {
    try {
        const savedData = localStorage.getItem('portfolioData');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Populate personal information
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('title').value = data.title || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('location').value = data.location || '';
            document.getElementById('bio').value = data.bio || '';
            
            // Populate skills
            document.getElementById('skills').value = data.skills || '';
            
            // Populate education
            document.getElementById('degree').value = data.degree || '';
            document.getElementById('university').value = data.university || '';
            document.getElementById('gradYear').value = data.gradYear || '';
            
            // Populate social links
            document.getElementById('github').value = data.github || '';
            document.getElementById('linkedin').value = data.linkedin || '';
            document.getElementById('twitter').value = data.twitter || '';
            document.getElementById('website').value = data.website || '';
            
            // Populate experience
            if (data.experience && data.experience.length > 0) {
                const experienceContainer = document.getElementById('experienceContainer');
                experienceContainer.innerHTML = '';
                
                data.experience.forEach((exp, index) => {
                    addExperience(exp);
                });
            }
            
            // Populate projects
            if (data.projects && data.projects.length > 0) {
                const projectsContainer = document.getElementById('projectsContainer');
                projectsContainer.innerHTML = '';
                
                data.projects.forEach((project, index) => {
                    addProject(project);
                });
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Add new experience entry
function addExperience(data = {}) {
    const container = document.getElementById('experienceContainer');
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    
    experienceItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="jobTitle[]" placeholder="Senior Developer" value="${data.jobTitle || ''}">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="company[]" placeholder="Tech Corp" value="${data.company || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="duration[]" placeholder="2020 - Present" value="${data.duration || ''}">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="jobDescription[]" rows="3" placeholder="Describe your key responsibilities and achievements...">${data.description || ''}</textarea>
        </div>
        <button type="button" class="remove-button" onclick="removeExperience(this)">Remove</button>
    `;
    
    container.appendChild(experienceItem);
}

// Add new project entry
function addProject(data = {}) {
    const container = document.getElementById('projectsContainer');
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    
    projectItem.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" name="projectName[]" placeholder="E-Commerce Platform" value="${data.name || ''}">
        </div>
        <div class="form-group">
            <label>Technologies</label>
            <input type="text" name="projectTech[]" placeholder="React, Node.js, MongoDB" value="${data.tech || ''}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="projectDescription[]" rows="3" placeholder="Describe what you built and its impact...">${data.description || ''}</textarea>
        </div>
        <div class="form-group">
            <label>Project Link (optional)</label>
            <input type="url" name="projectLink[]" placeholder="https://github.com/username/project" value="${data.link || ''}">
        </div>
        <button type="button" class="remove-button" onclick="removeProject(this)">Remove</button>
    `;
    
    container.appendChild(projectItem);
}

// Remove experience entry
function removeExperience(button) {
    const experienceItem = button.closest('.experience-item');
    experienceItem.remove();
}

// Remove project entry
function removeProject(button) {
    const projectItem = button.closest('.project-item');
    projectItem.remove();
}

// Add remove button styles dynamically
const style = document.createElement('style');
style.textContent = `
    .remove-button {
        background: transparent;
        border: 1px solid rgba(255, 0, 102, 0.5);
        color: #ff0066;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        margin-top: 1rem;
        transition: all 0.2s ease;
    }
    
    .remove-button:hover {
        background: rgba(255, 0, 102, 0.1);
        border-color: #ff0066;
    }
`;
document.head.appendChild(style);
