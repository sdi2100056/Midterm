
//Event listener to the contact form
document.querySelector('#contactForm').addEventListener('submit',function(e){
e.preventDefault();

//Get form input values
const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const subject = document.querySelector('#subject').value;
const message = document.querySelector('#message').value;

//Display form data in modal
document.querySelector('#modalName').textContent =name;
document.querySelector('#modalEmail').textContent =email;
document.querySelectord('#modalSubject').textContent =subject;
document.querySelectord('#modalMessage').textContent =message;

//Show modal with bootstrap
const modal = new bootstrap.Modal(document.querySelector('#successModal'));
modal.show();

//Reset form fields after submission completed
this.reset();
})
