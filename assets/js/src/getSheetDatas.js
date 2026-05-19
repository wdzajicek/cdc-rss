import createHtml from "./createHtml";

const SPREADSHEET_ID = '1_fc2lDA-UBFxINhj1QaOZ07ZlLlufzg4lrOCoVKXwEI';
const API_PARAMS = { // This is configuration for API call with spreadsheets that are setup as readonly
  'apiKey': 'AIzaSyAUAfvITHm6rfXD5hYwsGA-AYjc2onrm1g',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};
const SHEET_PARAMS_NEWS = {
  spreadsheetId: SPREADSHEET_ID,
  range: 'RSS Import'
};
const SHEET_PARAMS_US = {
  spreadsheetId: SPREADSHEET_ID,
  range: 'US Outbreaks'
};
const SHEET_PARAMS_WORLD = {
  spreadsheetId: SPREADSHEET_ID,
  range: 'International Outbreaks'
};

function getSheetData() {
  gapi.load('client', () => {
    gapi.client.init(API_PARAMS).then(() => {
      return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS_US);
    }).then(response => {
      createHtml(response, 'Latest US Outbreaks', false, true);

      return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS_WORLD);
    }).then(response => {
      createHtml(response, 'Latest International Outbreaks', false, false);

      return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS_NEWS);
    }).then(response => {
      createHtml(response, 'Latest CDC News Releases', true, false);
    }, err => {
      console.error("Error trying to fetch the alert from gapi:", err);
    })
  });
}

export default getSheetData;
