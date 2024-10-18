document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { title: 'Portfolio Website', description: 'A personal portfolio built with HTML, CSS, and JavaScript.' },
        { title: 'Atmosfare', description: 'A weather forecasting web app created using HTML, CSS, JavaScript and OpenWeatherMap API.' },
        { title: 'Calculator', description: 'A Calculator built with HTML, CSS, and JavaScript.' },

    ];

    const skills = ['C & C++', 'Data Structures & Algorithms', 'Java', 'HTML & CSS', 'GitHub'];

    const projectList = document.getElementById('project-list');
    const skillsList = document.getElementById('skills-list');

    // Dynamically render projects
    projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project';
        div.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        projectList.appendChild(div);
    });

    // Dynamically render skills
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });


    // Reveal elements on scroll with 1-second delay and fade-out on scroll up
    const fadeIns = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a 1-second delay before adding the 'show' class
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, 750); // 1 second delay
            } else {
                // Remove the 'show' class when the element goes out of view
                entry.target.classList.remove('show');
            }
        });
    });

    // Observe each fade-in element
    fadeIns.forEach(fadeIn => observer.observe(fadeIn));

});