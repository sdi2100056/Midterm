//Function for load and insert footer

function loadFooter (){
//Fetch the footer HTML file from a specific path
    fetch ('../html/footer.html')
    .then(response =>response.text())
    .then (data =>{
//Insert the footer HTML at the end of the boddy
        document.body.insertAdjacentHTML('beforeend', data);
    })
}
//Execute the loadfooter when DOM si fully loaded

document.addEventListener('DOMContentLoaded', loadFooter);
