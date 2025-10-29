//Load and isnert nav bar

function loadNavigation() {
    fetch('../html/navbar.html') //Fetch navbar file from specific path
    .then(response => response.text())

//Process html data when it is loaded
    .then(data =>{
        document.querySelector('#nav-placeholder').innerHTML = data; //Replace content of nav placeholder with the navbar html
    })
}

//Execute function loadnav when DOMis fully loaded
document.addEventListener('DOMContentLoaded',loadNavigation);
