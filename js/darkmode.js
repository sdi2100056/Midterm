//Waiting until dom is fully loaded
document.addEventListener ('DOMContentLoaded',function(){
    //Initialize dark mode with very short delay
    setTimeout(initDarkMode,100);
});

function initDarkMode(){
    const toggle = document.querySelector ('#darkModeToggle');//Dark mode toggle button
    const icon = document.querySelector('#darkModeIcon');
    const body = document.body;

// Load last preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        icon.className = 'bi bi-sun-fill';
    }


//Add click event listener to the toggle button
    toggle.addEventListener('click',() =>{
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

//Icons for toggle button view
        icon.className= isDark? 'bi bi-sun-fill' :'bi bi-moon-fill';

//Save preferences to the local storage
        localStorage.setItem('darkMode',isDark ? 'enabled' :'disabled');
    });
}
