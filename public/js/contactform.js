'use strict';

//grab a form
const form = document.querySelector('#form-lead');
form.addEventListener('submit', handleFormSubmit);

//push on form submit
function handleFormSubmit(event) {
  event.preventDefault();

  const recaptchaKey = '6LcAKMgbAAAAAI1v-qN1hMhcgiv--3ka-sU5vsaZ';
  const backendURL = 'https://us-central1-oberonlogistics-web.cloudfunctions.net/processFormLead';

  const data = new FormData(event.target);
  const formJSON = Object.fromEntries(data.entries());

  grecaptcha.ready(() => {
    grecaptcha.execute(recaptchaKey, {action: 'submit'})
    .then((token) => {
      axios.post(backendURL, { token: token, formJSON: formJSON })
      .then((response) => {
        const score = response.data.score;
 
        //Take action here based on score.
        if (score > 0.2) {
          const submit = document.querySelector("#form-lead button[type='submit']");
          submit.innerHTML = 'Sent!';
        }
      })
      .catch((error) => {
        console.warn("error: ", error);
      });
    });
  });
}