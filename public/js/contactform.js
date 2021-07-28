'use strict';

//grab a form
const form = document.querySelector('#form-lead');
form.addEventListener('submit', handleFormSubmit);

//push on form submit
function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const formJSON = Object.fromEntries(data.entries());
  const results = JSON.stringify(formJSON);

  grecaptcha.ready(function() {
    grecaptcha.execute('6LcAKMgbAAAAAI1v-qN1hMhcgiv--3ka-sU5vsaZ', {action: 'submit'}).then(function(token) {
        // Add your logic to submit to your backend server here.
    });
  });
}