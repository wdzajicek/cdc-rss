import createHtml from "./createHtml";

const apiKey = 'AIzaSyAUAfvITHm6rfXD5hYwsGA-AYjc2onrm1g';
const spreadsheetId = '1_fc2lDA-UBFxINhj1QaOZ07ZlLlufzg4lrOCoVKXwEI';

const sheetParamsNews = {
  spreadsheetId: spreadsheetId,
  range: 'RSS Import'
};
const sheetParamsUs = {
  spreadsheetId: spreadsheetId,
  range: 'US Outbreaks'
};
const sheetParamsIntr = {
  spreadsheetId: spreadsheetId,
  range: 'International Outbreaks'
};

async function fetchSheetData(spreadsheetId, range, apiKey) {
  // Use encodeURIComponent to handle spaces and '!' in the range string
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google Sheets API Error: ${error.error.message}`);
    }

    const data = await response.json();
    
    // Google returns an empty object if the range is empty; 
    // we default to an empty array for consistency.
    return data.values || [];
  } catch (err) {
    console.error("Failed to fetch sheet data:", err);
    throw err;
  }
}

async function getSheetData() {
  const usData = await fetchSheetData(sheetParamsUs.spreadsheetId, sheetParamsUs.range, apiKey);
  const intrData = await fetchSheetData(sheetParamsIntr.spreadsheetId, sheetParamsIntr.range, apiKey);
  const newsData = await fetchSheetData(sheetParamsNews.spreadsheetId, sheetParamsNews.range, apiKey);

  createHtml(usData, 'Latest US Outbreaks', false, true);
  createHtml(intrData, 'Latest International Outbreaks', false, false);
  createHtml(newsData, 'Latest CDC News Releases', true, false);
}

export default getSheetData;
