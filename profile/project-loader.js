document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const limit = grid ? parseInt(grid.getAttribute('data-limit')) || 0 : 0;
    loadProjects(limit);

    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) nav.classList.add('nav-scrolled'); else nav.classList.remove('nav-scrolled');
    });
});

async function loadProjects(limit = 0) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const response = await fetch('projects.json');
        let projects = await response.json();

        // If a limit is set (e.g., for the home page), slice the array
        if (limit > 0) {
            projects = projects.slice(0, limit);
        }

        grid.innerHTML = ''; // Clear existing content

        projects.forEach(project => {
            const cardHTML = createProjectCard(project);
            grid.innerHTML += cardHTML;
        });

        // Re-initialize animations and event listeners
        initializeAnimations();
        initializeFilters();

    } catch (error) {
        console.error('Error loading projects:', error);
        grid.innerHTML = '<p class="text-center text-red-500 w-full">Failed to load projects. Please try again later.</p>';
    }
}

function createProjectCard(project) {
    // Handle Image vs Gradient Placeholder
    let imageSection = '';
    if (project.image.startsWith('gradient-')) {
        const gradientClass = project.image === 'gradient-purple' ? 'from-purple-700 to-pink-800' : 'from-gray-700 to-gray-800';
        const icon = project.image === 'gradient-purple' ? '🧠' : '🔧';
        imageSection = `
            <div class="w-full h-48 bg-gradient-to-r ${gradientClass} rounded-lg mb-4 flex items-center justify-center">
                <div class="text-center"><div class="text-4xl mb-2">${icon}</div><div class="text-white font-bold">${project.category === 'nlp' ? 'Research' : 'Integration'}</div></div>
            </div>`;
    } else {
        imageSection = `<img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-lg mb-4">`;
        if (project.badge) {
            imageSection = `
            <div class="relative mb-4">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-lg">
                <div class="absolute top-4 right-4 achievement-badge bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">${project.badge}</div>
            </div>`;
        }
    }

    // Handle Title Color based on category (optional, mimicking original design)
    const titleColors = {
        ai: 'text-indigo-400',
        web: 'text-blue-400',
        healthcare: 'text-cyan-400',
        analytics: 'text-yellow-400'
    };
    const titleColor = titleColors[project.category] || 'text-white';

    // Handle Tags
    const tagsHTML = project.tags.map(tag => {
        // Randomize tag colors slightly or just use a default set
        const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return `<span class="${randomColor} text-white px-3 py-1 rounded-full text-sm">${tag}</span>`;
    }).join('');

    // Handle Buttons
    let mainBtn = `<button class="btn-primary flex-1" onclick="openProjectModal('${project.id}')">🚀 View Details</button>`;
    if (project.links.demo && project.links.demo !== '#') {
        mainBtn = `<a href="${project.links.demo}" target="_blank" class="btn-primary flex-1 text-center">🚀 Live Demo</a>`;
    }

    let secondaryBtn = `<button class="btn-secondary flex-1" onclick="showComingSoon()">📄 Source Code</button>`;
    if (project.links.code && project.links.code !== '#') {
        secondaryBtn = `<a href="${project.links.code}" target="_blank" class="btn-secondary flex-1 text-center">🐙 GitHub</a>`;
    }

    // Handle Features List (First 4 items)
    const featuresList = project.details.features.slice(0, 4).map(f => `<li>• ${f}</li>`).join('');

    return `
        <div class="project-item" data-category="${project.category}">
            <div class="project-card glass-card p-6 h-full flex flex-col">
                ${imageSection}
                <h3 class="text-2xl font-bold mb-3 ${titleColor}">${project.title}</h3>
                <p class="text-gray-300 mb-4 leading-relaxed line-clamp-3">${project.description}</p>
                
                <div class="mb-4 flex-grow">
                    <h4 class="text-lg font-semibold mb-2 text-white">Features:</h4>
                    <ul class="text-sm text-gray-400 space-y-1">
                        ${featuresList}
                    </ul>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                    ${tagsHTML}
                </div>
                
                <div class="flex gap-3 mt-auto">
                    ${mainBtn}
                    ${secondaryBtn}
                </div>
            </div>
        </div>
    `;
}

// --- Animation & Interaction Functions ---

function initializeAnimations() {
    // Intersection Observer for fade-in
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

    // Hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => anime({ targets: card, scale: 1.02, rotateY: 5, duration: 300, easing: 'easeOutCubic' }));
        card.addEventListener('mouseleave', () => anime({ targets: card, scale: 1, rotateY: 0, duration: 300, easing: 'easeOutCubic' }));
    });
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        // Remove old listeners to avoid duplicates if re-initialized (though typically we just run this once)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    // Re-select fresh buttons
    document.querySelectorAll('.project-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.project-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.project-item');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    anime({ targets: item, opacity: [0, 1], scale: [0.8, 1], duration: 300, easing: 'easeOutCubic' });
                } else {
                    item.classList.add('hidden');
                }
            });
            anime({ targets: btn, scale: [1, 1.1, 1], duration: 300, easing: 'easeOutCubic' });
        });
    });
}

// --- Modal Functions ---

let projectsData = []; // Cache for modal

// Fetch again for specific modal details if needed, or use the global data if we scope it correctly.
// Simpler: Just fetch in loadProjects and store in a global variable or pass it around.
// We'll just fetch it again or store it. Let's store it.
fetch('projects.json').then(res => res.json()).then(data => projectsData = data);

function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    // Tech stack HTML
    const techStack = project.details.techStack ? project.details.techStack.map(t => `<span class="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">${t}</span>`).join('') : '';

    // Achievements HTML
    const achievements = project.details.achievements && project.details.achievements.length > 0
        ? `<div><h5 class="text-lg font-semibold text-green-400 mb-2">Achievements</h5><ul class="text-gray-300 space-y-1">${project.details.achievements.map(a => `<li>🏆 ${a}</li>`).join('')}</ul></div>`
        : '';

    modalBody.innerHTML = `
        <div class="space-y-6">
            <div>
                <h4 class="text-xl font-bold text-white mb-3">${project.title}</h4>
                <p class="text-gray-300">${project.details.fullDescription || project.description}</p>
            </div>
            <div>
                <h5 class="text-lg font-semibold text-cyan-400 mb-2">Key Features</h5>
                <ul class="text-gray-300 space-y-1">
                    ${project.details.features.map(f => `<li>• ${f}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h5 class="text-lg font-semibold text-purple-400 mb-2">Technology Stack</h5>
                <div class="flex flex-wrap gap-2">${techStack}</div>
            </div>
            ${achievements}
            <div class="flex gap-3 mt-6">
                ${project.links.demo && project.links.demo !== '#' ? `<a href="${project.links.demo}" target="_blank" class="btn-primary block text-center">View Live Demo</a>` : '<button class="btn-primary" onclick="showComingSoon()">View Live Demo</button>'}
                ${project.links.code && project.links.code !== '#' ? `<a href="${project.links.code}" target="_blank" class="btn-secondary block text-center">View Code</a>` : '<button class="btn-secondary" onclick="showComingSoon()">View Code</button>'}
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
}

function showComingSoon() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = '🚀 Coming Soon! This feature is under development.';
    document.body.appendChild(notification);
    anime({ targets: notification, translateX: [300, 0], opacity: [0, 1], duration: 300, easing: 'easeOutCubic' });
    setTimeout(() => {
        anime({ targets: notification, translateX: [0, 300], opacity: [1, 0], duration: 300, easing: 'easeInCubic', complete: () => notification.remove() });
    }, 3000);
}

// Global listeners for modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeProjectModal(); });
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectModal(); });
});
