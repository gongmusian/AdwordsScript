// JavaScript File

function main() {
    // set google doc url
    var url = 'https://docs.google.com/spreadsheets/d/1GQraZ2dD4wKfwgBLkaK3XqTQQYNlJ1t2xrs-fCgdzJs/edit#gid=0';
    // set sheet name
    var sheet_name = 'test';
    // get all activated campaigns
    var campaign_list = getAllActiveCampaigns();
    // output all campaigns to google sheet
    appendARow(url, sheet_name , campaign_list);
    Logger.log('Success :)');
}

function getAllActiveCampaigns() {
//   get all campaigns with condition which status is Enabled
  var campaignIterator = AdWordsApp.campaigns().withCondition("Status = ENABLED").get();
//   log the all campaign's name
  Logger.log('Total Active campaigns found : ' +
      campaignIterator.totalNumEntities());
//   set a list will save all campaign's name
  var campaign_list = [];
  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    Logger.log(campaign.getName());
// save campagn's name inn campaign_list
    campaign_list.push(campaign.getName())
  }
  return campaign_list
}

// open a google sheet
function appendARow(url, name, list) {
//   var SPREADSHEET_URL = 'INSERT_SPREADSHEET_URL_HERE';
  var SPREADSHEET_URL = url;
//   var SHEET_NAME = 'INSERT_SHEET_NAME_HERE';
  var SHEET_NAME = name;
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Appends a new row with 3 columns to the bottom of the
  // spreadsheet containing the values in the array.
//   output the campaign_list
  sheet.appendRow(list);
}