document.addEventListener('DOMContentLoaded', function() {
    // Project data - you can expand this with more details
    const projectsData = {
        'bifrost': {
            title: 'Bifrost',
            description: 'Bifrost is an innovative Image to Code Converter that bridges the gap between design and development. It uses advanced computer vision algorithms to analyze design images and generate clean, semantic HTML/CSS code.',
            features: [
                'Converts design mockups to production-ready code',
                'Supports responsive design output',
                'Integration with popular design tools',
                'Customizable code templates'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django', 'OpenCV', 'MySQL'],
            image: 'images/bifrost-details.jpg',
            liveLink: '#',
            codeLink: '#'
        },
        'social-credits': {
            title: 'Social Credits',
            description: 'A reward system platform that incentivizes positive social activities and community engagement. Users earn credits for participating in community events, volunteering, and other socially beneficial activities.',
            features: [
                'Credit earning and redemption system',
                'Activity tracking and verification',
                'Community leaderboards',
                'Partnerships with local businesses'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django', 'MySQL'],
            image: 'images/social-credits-details.jpg',
            liveLink: '#',
            codeLink: '#'
        },
        'skill-swap': {
            title: 'Skill Swap',
            description: 'A peer-to-peer skill exchange platform where users can trade skills and knowledge without monetary transactions. The platform matches users based on their offered and desired skills.',
            features: [
                'Skill matching algorithm',
                'User rating and review system',
                'In-app messaging',
                'Session scheduling'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django', 'MySQL'],
            image: 'images/skill-swap-details.jpg',
        }
    };

    // Select all project cards and view buttons
    const projectCards = document.querySelectorAll('.project-card');
    const detailsContainer = document.getElementById('project-details');
    const closeDetails = document.createElement('div');
    closeDetails.className = 'close-details';
    closeDetails.innerHTML = '&times;';

    // Add click event to each project card
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.view-details-btn');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = card.getAttribute('data-project');
            showProjectDetails(projectId);
        });
        
        // Also make the whole card clickable if desired
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });

    // Function to show project details
    function showProjectDetails(projectId) {
        const project = projectsData[projectId];
        
        if (!project) return;
        
        const detailsContent = `
            <div class="project-details-content">
                ${closeDetails.outerHTML}
                <div class="project-details-header" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${project.image}'); background-size: cover; background-position: center; padding: 40px 20px; color: white;">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                </div>
                <div class="project-details-body" style="padding: 30px;">
                    <div class="details-row" style="display: flex; flex-wrap: wrap; gap: 30px; margin-bottom: 30px;">
                        <div class="details-col" style="flex: 1; min-width: 300px;">
                            <h3 style="margin-bottom: 15px; color: #2c3e50;">Features</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                ${project.features.map(feature => `<li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                                    <i class="fas fa-check" style="position: absolute; left: 0; color: #2ecc71;"></i> ${feature}
                                </li>`).join('')}
                            </ul>
                        </div>
                        <div class="details-col" style="flex: 1; min-width: 300px;">
                            <h3 style="margin-bottom: 15px; color: #2c3e50;">Technologies</h3>
                            <div class="tech-tags" style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${project.technologies.map(tech => `<span style="background: #3498db; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem;">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        detailsContainer.innerHTML = detailsContent;
        detailsContainer.classList.add('active');
        
        // Add event listener to close button
        document.querySelector('.close-details').addEventListener('click', () => {
            detailsContainer.classList.remove('active');
        });
        
        // Close when clicking outside content
        detailsContainer.addEventListener('click', (e) => {
            if (e.target === detailsContainer) {
                detailsContainer.classList.remove('active');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('#projects .section-header, .project-card').forEach(el => {
        observer.observe(el);
    });

  // Resume Modal Functionality
    const resumeModal = document.getElementById('resume-modal');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const closeResumeModal = document.querySelector('.close-modal');
    const downloadResumeBtn = document.getElementById('download-resume');
    const resumeIframe = document.getElementById('resume-iframe');

    // Path to resume PDF
    const resumePath = 'assets/SaranPrakash_Resume.pdf';

    // Open modal when view button is clicked
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function() {
            // First check if PDF exists
            fetch(resumePath)
                .then(response => {
                    if (!response.ok) throw new Error('PDF not found');
                    resumeIframe.src = resumePath;
                    resumeModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                })
                .catch(error => {
                    console.error('Error loading resume:', error);
                    alert('Resume PDF not found. Please check the file path.');
                    // Fallback - open in new tab if available
                    window.open(resumePath, '_blank');
                });
        });
    }

    // Close modal when X is clicked
    if (closeResumeModal) {
        closeResumeModal.addEventListener('click', function() {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resumeIframe.src = '';
        });
    }

    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === resumeModal) {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resumeIframe.src = '';
        }
    });

    if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function (e) {
      e.preventDefault();

      //  Force a download using an invisible anchor
      const tempLink = document.createElement('a');
      tempLink.href = resumePath;
      tempLink.setAttribute('download', 'SaranPrakash_Resume.pdf');
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });
  }
});