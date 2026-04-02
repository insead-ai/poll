// ============================================
// GOOGLE APPS SCRIPT for INSEAD AI Survey v3
// Paste this entire file into Apps Script, then deploy as Web App
// ============================================

// Column headers matching the survey v3 payload
const HEADERS = [
  'Timestamp',
  'Q1: AI Proficiency',
  'Q2: Usage Frequency',
  'Q3b: Programme / Intake',
  'Q3c: Section',
  'Q4: Background',
  'Q5: ChatGPT',
  'Q5: Claude',
  'Q5: Perplexity',
  'Q5: Microsoft Copilot',
  'Q5: GitHub Copilot',
  'Q5: Gemini',
  'Q5: Mistral / Le Chat',
  'Q5: NotebookLM',
  'Q5: Other',
  'Q5: Other Name',
  'Q5a: Go-to Tool',
  'Q6a: Free Access Awareness',
  'Q6b: Actually Activated',
  'Q7b: INSEAD Learning Use',
  'Q7c: During Lectures',
  'Q8: Barriers (ranked)',
  'Q9: Fund Which Tool',
  'Q10: Usefulness',
  'Q11: Disclosure',
  'Q12a: AI Education Demand',
  'Q12b: Curriculum Topics (ranked)',
  'Q13: Format Preference (ranked)',
  'Q14: Support Model',
  'Q15: AI Setup Description',
  'Q16: Useful Example',
  'Q17: Interview Consent',
  'Q17: Email'
];

// Payload keys in the same order as HEADERS
const KEYS = [
  'timestamp',
  'q1_proficiency',
  'q2_frequency',
  'q3b_programme',
  'q3c_section',
  'q4_background',
  'q5_chatgpt',
  'q5_claude',
  'q5_perplexity',
  'q5_copilot_ms',
  'q5_copilot_gh',
  'q5_gemini',
  'q5_mistral',
  'q5_notebooklm',
  'q5_other',
  'q5_other_name',
  'q5a_goto',
  'q6a_awareness',
  'q6b_activated',
  'q7b_insead_learning',
  'q7c_lectures',
  'q8_barriers',
  'q9_fund_tool',
  'q10_usefulness',
  'q11_disclosure',
  'q12a_demand',
  'q12b_curriculum',
  'q13_format',
  'q14_support_model',
  'q15_setup',
  'q16_useful_example',
  'q17_interview',
  'q17_email'
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add headers if first row is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    // Bold + freeze header row
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const data = JSON.parse(e.postData.contents);

  // Build row in header order, defaulting missing fields to empty string
  const row = KEYS.map(key => data[key] !== undefined ? data[key] : '');

  sheet.appendRow(row);

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
