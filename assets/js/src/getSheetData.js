import createHtml from "./createHtml";

const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyAUAfvITHm6rfXD5hYwsGA-AYjc2onrm1g',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

const SHEET_PARAMS = {
  spreadsheetId: '1_fc2lDA-UBFxINhj1QaOZ07ZlLlufzg4lrOCoVKXwEI',
  range: 'RSS Import'
};

function getSheetData() {
  gapi.load('client', () => {
    gapi.client.init(API_PARAMS).then(() => {
      return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
    }).then(response => {
      createHtml(response);
    }, err => {
      console.error("Error trying to fetch the alert from gapi:", err);
    })
  });
}

export default getSheetData;
