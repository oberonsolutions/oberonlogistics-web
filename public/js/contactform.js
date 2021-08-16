'use strict';

//grab a form
const form = document.querySelector('#form-lead');
form.addEventListener('submit', handleFormSubmit);

//push on form submit
function handleFormSubmit(event) {
  event.preventDefault();

  const backendURL = 'https://us-central1-oberonlogistics-2a5d9.cloudfunctions.net/api/leads';

  const data = new FormData(event.target);
  const formJSON = Object.fromEntries(data.entries());

  axios.post(backendURL, formJSON)
    .then((response) => {
      const submit = document.querySelector("#form-lead button[type='submit']");
      submit.innerHTML = 'Sent!';
    })
    .catch((error) => {
      console.warn("error: ", error);
    });
}