// ============================================
// GOOGLE APPS SCRIPT - Paste this into your Google Sheet
//
// Steps:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1n8Yhf3yMBmqOJ7MZlPG6Zk2ZddA6sTfMgt9kXEQgMas/edit
// 2. Extensions > Apps Script
// 3. Delete any existing code, paste this entire file
// 4. Click Deploy > New deployment
// 5. Type: Web app
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy
// 9. Copy the Web app URL
// 10. Replace 'APPS_SCRIPT_URL_HERE' in poll/index.html with that URL
// ============================================

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add headers if first row is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Section',
      'Email',
      'Q1: What do you want (ranked top 3)',
      'Q2: AI proficiency',
      'Q3: What would you build/learn',
      'Q4: Would you lead'
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp,
    data.name,
    data.section,
    data.email,
    data.q1_want,
    data.q2_proficiency,
    data.q3_build,
    data.q4_lead
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Required for CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
