const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const axios = require('axios');
const {google} = require('googleapis');
const sheets = google.sheets("v4");

async function updateSheets (data) {
  // Get Secrets
  const serviceAccount = functions.config().service_account;
  const spreadsheetId = functions.config().sheets.id;

  // Authenticate
  const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const jwtAuthPromise = jwtClient.authorize();
  await jwtAuthPromise;

  const aData = [
    new Date().toLocaleDateString("en-US"),
    'New',
    data.name,
    data.phone,
    data.email,
    data.memo
  ];
  const range = 'Leads!A2:F';

  await sheets.spreadsheets.values.append(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [ aData ] },
    },
    {}
  );

  return;
};

exports.processFormLead = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    // Verify Recaptcha Token
    const secret = functions.config().recaptcha.key;
    const token = req.body.token;
    const formJSON = req.body.formJSON;

    axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
    .then ((recaptcha) => {
      if (recaptcha.data.success) {
        if (recaptcha.data.score > 0.2) {
          // Add Lead to Database Here
          updateSheets(formJSON);
        }
        return res.status(200).send({ score: recaptcha.data.score });
      } else {
        return res.status(500).send(recaptcha);
      }
    })
    .catch ((error) => {
      return res.status(500).send(error);
    });
  });
});