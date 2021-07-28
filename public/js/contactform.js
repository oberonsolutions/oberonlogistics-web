'use strict';

//grab a form
const form = document.querySelector('#form-lead');

//push on form submit
if (form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // CAPTCHA
    grecaptcha.ready(function() {
      grecaptcha.execute('6LcAKMgbAAAAAI1v-qN1hMhcgiv--3ka-sU5vsaZ', {action: 'submit'}).then(function(token) {
          // Add your logic to submit to your backend server here.
          console.log(token);
      });
    });
/*
    var mailsRef = firebase.database().ref('leads').push().set(
      {
        mail: input.value
      }
    );
*/
  })
}