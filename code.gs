/**
 * Vishmitha & Binuri wedding – RSVP + Wishes → Google Sheets
 *
 * Sheet: https://docs.google.com/spreadsheets/d/18UB21Mrm0B9DX-OJPQAUSIIgaL8-mAYTzC-dvCO5mQs/edit
 *
 * SETUP
 * 1. Open the sheet → Extensions → Apps Script.
 * 2. Delete everything in Code.gs, paste this whole file, click Save.
 * 3. Deploy → New deployment → type "Web app"
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    → Deploy → Authorize → copy the Web app URL (ends with /exec).
 * 4. Put that URL in NEXT_PUBLIC_GOOGLE_SCRIPT_URL (.env and Vercel), redeploy the site.
 *
 * After editing this script later: Deploy → Manage deployments → ✏️ → Version: New version → Deploy
 * (keeps the same URL).
 */

var SPREADSHEET_ID = '18UB21Mrm0B9DX-OJPQAUSIIgaL8-mAYTzC-dvCO5mQs';
var TIMEZONE = 'Asia/Colombo';

var SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Submitted At', 'Guest Name', 'Attending', 'Invited By', 'Invitation Name'],
  },
  wish: {
    name: 'Wishes',
    headers: ['Submitted At', 'Name', 'Message', 'Invited By', 'Invitation Name'],
  },
};

function doGet() {
  return ContentService.createTextOutput('RSVP script is running. Send a POST request to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // avoid two guests writing the same row at once

    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(body);
    var formType = String(payload.formType || '').toLowerCase();
    var config = SHEETS[formType];
    if (!config) throw new Error('Invalid formType. Expected rsvp or wish.');

    var sheet = getSheet_(config);
    var when = Utilities.formatDate(
      payload.submittedAt ? new Date(payload.submittedAt) : new Date(),
      TIMEZONE,
      'yyyy-MM-dd HH:mm:ss'
    );
    var invitedBy = payload.side === 'bride' ? "Bride's side" : payload.side === 'groom' ? "Groom's side" : '';

    var row;
    if (formType === 'rsvp') {
      var attending = String(payload.attending || '').toLowerCase();
      row = [
        when,
        clean_(payload.name),
        attending === 'yes' ? 'Yes' : attending === 'no' ? 'No' : clean_(payload.attending),
        invitedBy,
        clean_(payload.invitationName),
      ];
    } else {
      row = [when, clean_(payload.name), clean_(payload.message), invitedBy, clean_(payload.invitationName)];
    }

    sheet.appendRow(row);
    return json_({ success: true });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Get (or create) the tab and make sure it has a bold, frozen header row. */
function getSheet_(config) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(config.name) || ss.insertSheet(config.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(config.headers);
    sheet.getRange(1, 1, 1, config.headers.length)
      .setFontWeight('bold')
      .setBackground('#f3e0dc');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Trim, limit length and stop values being read as spreadsheet formulas. */
function clean_(value) {
  var s = String(value == null ? '' : value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Optional: run once from the editor (▶ Run → setup) to create both tabs and authorize. */
function setup() {
  getSheet_(SHEETS.rsvp);
  getSheet_(SHEETS.wish);
}
