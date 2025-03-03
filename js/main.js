document.addEventListener('DOMContentLoaded', () => {
  // Projects data
  const projects = [
    {
      title: 'AI Chat Application',
      description: 'An interactive chat application powered by machine learning models.',
      tags: ['AI', 'JavaScript', 'Machine Learning'],
      demoLink: '#',
      codeLink: '#'
    },
    {
      title: 'Interactive Data Visualizer',
      description: 'A tool for visualizing complex datasets with interactive elements.',
      tags: ['Data Viz', 'JavaScript', 'SVG'],
      demoLink: '#',
      codeLink: '#'
    }
  ];

  // Load projects
  const projectsContainer = document.getElementById('projects-container');
  
  if (projectsContainer) {
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      
      // Create project content
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="skills-container">
          ${project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.demoLink}" target="_blank">Live Demo</a>
          <a href="${project.codeLink}" target="_blank">Source Code</a>
        </div>
      `;
      
      projectsContainer.appendChild(projectCard);
    });
  }

  // Add a theme toggle functionality in the future
  // const themeToggle = document.getElementById('theme-toggle');
  // if (themeToggle) {
  //   themeToggle.addEventListener('click', () => {
  //     document.body.classList.toggle('dark-theme');
  //   });
  // }
});