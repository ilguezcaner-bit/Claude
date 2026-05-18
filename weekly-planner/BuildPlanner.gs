/**
 * BUILT2WIN — Weekly Planner (V7)  ·  Generator
 * --------------------------------------------------------------
 * Baut den kompletten Weekly Planner in 4 Tabs auf:
 *   1) Wochenplan        2) Projekte & Kunden
 *   3) Daily Wins        4) Wochen-Review
 *
 * BEDIENUNG (einmalig):
 *   Sheet oeffnen  ->  Erweiterungen  ->  Apps Script
 *   Diesen Code einfuegen  ->  oben "buildPlanner" waehlen  ->  Run
 *
 * Erneut "buildPlanner" laufen lassen = baut sauber neu auf
 * (Inhalte gehen dabei verloren -> vorher kopieren wenn noetig).
 */

var THEME = {
  header:  '#13293D',  // dunkles Navy
  headerT: '#FFFFFF',
  anchor:  '#FCEFC7',  // Gebets-Anker (warmes Gold)
  win:     '#1B998B',  // Daily-Win Gruen
  accent:  '#E0FBFC',  // helle Sektionsfarbe
  total:   '#13293D'
};

function buildPlanner() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('BUILT2WIN — Weekly Planner (V7)');

  var keep = ['Wochenplan', 'Projekte & Kunden', 'Daily Wins', 'Wochen-Review'];

  buildWochenplan_(freshSheet_(ss, 'Wochenplan'));
  buildProjekte_(freshSheet_(ss, 'Projekte & Kunden'));
  buildDailyWins_(freshSheet_(ss, 'Daily Wins'));
  buildReview_(freshSheet_(ss, 'Wochen-Review'));

  // Reihenfolge der Tabs setzen + Fremd-Tabs entfernen
  for (var i = 0; i < keep.length; i++) {
    ss.setActiveSheet(ss.getSheetByName(keep[i]));
    ss.moveActiveSheet(i + 1);
  }
  ss.getSheets().forEach(function (sh) {
    if (keep.indexOf(sh.getName()) === -1) ss.deleteSheet(sh);
  });
  ss.setActiveSheet(ss.getSheetByName('Wochenplan'));

  SpreadsheetApp.getUi().alert('BUILT2WIN Weekly Planner V7 ist fertig aufgebaut. Yallah. 💪');
}

/* ---------- Helpers ---------- */

function freshSheet_(ss, name) {
  var sh = ss.getSheetByName(name);
  if (sh) ss.deleteSheet(sh);
  return ss.insertSheet(name);
}

function styleHeader_(sh, range) {
  range.setBackground(THEME.header).setFontColor(THEME.headerT)
       .setFontWeight('bold').setVerticalAlignment('middle')
       .setHorizontalAlignment('center');
  sh.setRowHeight(range.getRow(), 34);
}

/* ---------- TAB 1: Wochenplan (stundengenau 06:00 → 05:00) ---------- */

function buildWochenplan_(sh) {
  var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var header = ['Zeit'].concat(days);

  var hours = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
               '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00',
               '22:00','23:00','00:00','01:00','02:00','03:00','04:00','05:00'];

  var S  = 'Schlaf';
  var Sf = 'Schlaf · Fajr-Fenster (Sommer ~03:30, Wecker optional)';

  // Index 0 = 06:00 ... Index 23 = 05:00
  var Mo = [S,
    'Aufstehen 07:00 · Wasser · Intention',
    'Gym — Training (lt. Trainingsplan)',
    'Gym / Dusche / Frühstück',
    'Uni: Vorlesung / Übung / Lernen',
    'Uni: Vorlesung / Übung / Lernen',
    'Uni / BWL Lernen',
    '🕌 Dhuhr · Lunch · Reset',
    'Dreh / Content-Produktion (Agentur)',
    'Agentur: Dreh / Schnitt',
    'Agentur: Smuuve Wochen-Checkup',
    '🕌 Asr · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light / Content',
    '🕌 Maghrib · 3 Dankbarkeiten',
    'Freizeit / Prep nächster Tag',
    '🕌 Yatsi · Shutdown (Walk·Journal·Read)',
    S, S, S, Sf, S, S];

  var Di = [S,
    'Aufstehen 07:00 · Routine · Frühstück',
    'Prep / Orga',
    'Anfahrt Gym',
    'Gym — Training (lt. Trainingsplan)',
    'Gym / Dusche / Snack to-go',
    'Fahrt nach Salzgitter',
    'Salzgitter (Uni) · 🕌 Dhuhr unterwegs',
    'Salzgitter (Uni)',
    'Salzgitter (Uni)',
    'Rückfahrt / Puffer',
    'Uni: BWL Lernen · 🕌 Asr',
    'BWL Lernen',
    'BWL Lernen / Abendessen',
    'Lernen light / Agentur Minimal-Check',
    '🕌 Maghrib · 3 Dankbarkeiten',
    'Shutdown-Vorbereitung',
    '🕌 Yatsi · Shutdown',
    S, S, S, Sf, S, S];

  var Mi = [S,
    'Aufstehen 07:00 · Wasser · Intention',
    'Gym — Training (lt. Trainingsplan)',
    'Gym / Dusche / Frühstück',
    'BWL Lernen / Prep Braunschweig',
    'Fahrt nach Braunschweig',
    'Braunschweig (Uni)',
    'Braunschweig (Uni) · 🕌 Dhuhr',
    'Braunschweig (Uni)',
    'Braunschweig (Uni)',
    'Rückfahrt',
    'BWL Lernen · 🕌 Asr',
    'BWL Lernen',
    'Lernen / Abendessen',
    'Lernen light / Agentur Check',
    '🕌 Maghrib · 3 Dankbarkeiten',
    'Freizeit',
    '🕌 Yatsi · Shutdown',
    S, S, S, Sf, S, S];

  var Do = [S,
    'Aufstehen 07:00 · Wasser · Intention',
    'Gym — PUSH (Brust · Schulter · Trizeps)',
    'Gym / Dusche / Frühstück',
    'Uni: Vorlesung / Übung / Lernen',
    'Uni: Vorlesung / Übung / Lernen',
    'Uni / BWL Lernen',
    '🕌 Dhuhr · Lunch · Reset',
    'Dreh / Content-Produktion (Agentur)',
    'Agentur: Dreh / Schnitt',
    'Agentur: Mon Frere Content-Planung',
    '🕌 Asr · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light / Content',
    '🕌 Maghrib · 3 Dankbarkeiten',
    'Freizeit / Prep nächster Tag',
    '🕌 Yatsi · Shutdown (Walk·Journal·Read)',
    S, S, S, Sf, S, S];

  var Fr = [S,
    'Aufstehen 07:00 · Routine',
    'Gym — Training (lt. Trainingsplan)',
    'Gym / Dusche / Frühstück',
    'BWL Lernen',
    'BWL Lernen',
    'Castello: Video Batch-Schnitt',
    '🕌 Dhuhr · Lunch',
    'Castello / Agentur Abschluss',
    'Vorbereitung / Fahrt — Job ab 15:30',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Asr (kurz)',
    'Werkstudentenjob',
    'Werkstudentenjob',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Maghrib (kurz)',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Yatsi (kurz)',
    'Feierabend 00:00 · Heimfahrt',
    'Shutdown / Schlaf',
    S, Sf, S, S];

  var Sa = [S,
    'Schlaf / Ausschlafen',
    'Aufstehen · Frühstück',
    'Gym — Training (lt. Trainingsplan)',
    'Gym / Dusche',
    'Vorbereitung / Fahrt Arbeit',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Dhuhr (kurz)',
    'Werkstudentenjob',
    'Werkstudentenjob',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Asr (kurz)',
    'Werkstudentenjob',
    'Werkstudentenjob',
    'Feierabend 20:00 · Heimfahrt',
    '🕌 Maghrib · Abendessen',
    'Freizeit / Familie',
    '🕌 Yatsi · Shutdown',
    S, S, S, Sf, S, S];

  var So = [S,
    'Schlaf / Ausschlafen erlaubt',
    'Aufstehen · ruhiger Morgen',
    'Spaziergang / leichtes Cardio (oder Rest)',
    'Frühstück / Familie',
    'Wochenplanung (Tab Projekte & Kunden)',
    'BWL Lernen light',
    '🕌 Dhuhr · Lunch',
    'BWL Vorbereitung kommende Woche',
    'Agentur Wochenvorbereitung',
    'Puffer / Familie',
    '🕌 Asr · Freizeit',
    'Wochen-Review Tab ausfüllen',
    'Abendessen',
    'Entspannung',
    '🕌 Maghrib · 3 Dankbarkeiten',
    'Freizeit (früh runterfahren)',
    '🕌 Yatsi · Shutdown (früh ins Bett für Mo)',
    S, S, S, Sf, S, S];

  var cols = [Mo, Di, Mi, Do, Fr, Sa, So];
  var rows = [];
  for (var h = 0; h < hours.length; h++) {
    var row = [hours[h]];
    for (var d = 0; d < cols.length; d++) row.push(cols[d][h]);
    rows.push(row);
  }

  sh.getRange(1, 1, 1, header.length).setValues([header]);
  styleHeader_(sh, sh.getRange(1, 1, 1, header.length));
  sh.getRange(2, 1, rows.length, header.length).setValues(rows);

  sh.getRange(2, 1, rows.length, 1)
    .setFontWeight('bold').setBackground(THEME.header).setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');

  for (var rr = 0; rr < rows.length; rr++) {
    for (var cc = 1; cc < header.length; cc++) {
      sh.getRange(rr + 2, cc + 1).setBackground(cellColor_(rows[rr][cc]));
    }
  }

  sh.getRange(1, 1, rows.length + 1, header.length)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle').setWrap(true).setFontSize(9);
  sh.setColumnWidth(1, 64);
  for (var c = 2; c <= header.length; c++) sh.setColumnWidth(c, 188);
  for (var rh = 2; rh <= rows.length + 1; rh++) sh.setRowHeight(rh, 30);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);

  var lr = rows.length + 3;
  sh.getRange(lr, 1).setValue(
    '🟨 Gebet/Anker   🟩 Gym/Training   🟪 Agentur/Dreh   '
    + '🟧 Uni/Lernen/Fahrt   🟦 Werkstudentenjob   ⬜ Schlaf').setFontWeight('bold');
  sh.getRange(lr + 1, 1).setValue(
    '⚠️ Gebetszeiten saisonal an deine lokale App anpassen · '
    + 'Uni (Salzgitter Di, Braunschweig Mi) an echten Stundenplan anpassen · '
    + 'Job: Fr 15:30–00:00, Sa 12:00–20:00 (Stand diesen Monat)')
    .setFontStyle('italic').setFontColor('#7A7A7A');
}

/* Faerbt eine Wochenplan-Zelle nach Inhalt */
function cellColor_(t) {
  if (!t || t.indexOf('Schlaf') === 0) return '#EDEDED';
  if (t.indexOf('🕌') > -1) return '#FCEFC7';
  if (t.indexOf('Gym') > -1 || t.indexOf('PUSH') > -1) return '#D6F5D6';
  if (t.indexOf('Werkstudentenjob') > -1 || t.indexOf('Feierabend') > -1) return '#D6E4F5';
  if (t.indexOf('Salzgitter') > -1 || t.indexOf('Braunschweig') > -1
      || t.indexOf('Uni') > -1 || t.indexOf('Lernen') > -1
      || t.indexOf('Vorlesung') > -1 || t.indexOf('Fahrt') > -1) return '#FDEBD0';
  if (t.indexOf('Agentur') > -1 || t.indexOf('Dreh') > -1
      || t.indexOf('Castello') > -1 || t.indexOf('Content') > -1) return '#E8DAEF';
  return '#FFFFFF';
}

/* ---------- TAB 2: Projekte & Kunden ---------- */

function buildProjekte_(sh) {
  var header = ['Kunde', 'Status', 'Budget (€)', 'Wöchentliche Aktion',
                'Fester Tag', 'Nächste Deadline', 'Notiz'];
  var data = [
    ['Smuuve', 'Bestand', 1600, 'Wochen-Checkup (Automatisierung)', 'Montag', '', 'Größter Kunde — stabil halten'],
    ['Ristorante Castello', 'Bestand', 600, 'Video Batch-Schnitt', 'Freitag', '', 'Wochencontent'],
    ['Mon Frere', 'Bestand', 500, 'Content-Planung', 'Dienstag', '', '']
  ];

  sh.getRange(1, 1, 1, header.length).setValues([header]);
  styleHeader_(sh, sh.getRange(1, 1, 1, header.length));
  sh.getRange(2, 1, data.length, header.length).setValues(data);

  var totalRow = data.length + 2;
  sh.getRange(totalRow, 1, 1, header.length).setValues([[
    'GESAMT BESTAND', 'STABIL', '', '', '', '', 'Deckt Fixkosten + Sicherheit'
  ]]);
  sh.getRange(totalRow, 3).setFormula('=SUM(C2:C' + (data.length + 1) + ')');
  sh.getRange(totalRow, 1, 1, header.length)
    .setBackground(THEME.total).setFontColor('#FFFFFF').setFontWeight('bold');

  var goal = totalRow + 2;
  sh.getRange(goal, 1).setValue('🎯 Ziel: ~3.000 € Stabilität → Kopf frei für BWL. '
    + 'Bestand halten ist der Win, nicht Neukunden-Jagd.');
  sh.getRange(goal, 1).setFontStyle('italic').setFontColor('#7A7A7A');

  sh.getRange(1, 1, totalRow, header.length)
    .setBorder(true, true, true, true, true, true).setVerticalAlignment('middle');
  sh.setColumnWidth(1, 180); sh.setColumnWidth(2, 90); sh.setColumnWidth(3, 100);
  sh.setColumnWidth(4, 230); sh.setColumnWidth(5, 110); sh.setColumnWidth(6, 140);
  sh.setColumnWidth(7, 230);
  sh.getRange(2, 3, data.length + 1, 1).setNumberFormat('#,##0 €');
  sh.setFrozenRows(1);
}

/* ---------- TAB 3: Daily Wins ---------- */

function buildDailyWins_(sh) {
  var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var header = ['Daily Win'].concat(days).concat(['Woche']);
  var wins = [
    '🧠 MENTAL — 90+ Min BWL vor Mittag',
    '🕌 SPIRITUAL — alle 5 Gebete',
    '💪 PHYSICAL — Training / Cardio erledigt',
    '📓 ACCOUNTABILITY — Abend-Journaling'
  ];

  sh.getRange(1, 1, 1, header.length).setValues([header]);
  styleHeader_(sh, sh.getRange(1, 1, 1, header.length));

  for (var i = 0; i < wins.length; i++) {
    var rowNum = i + 2;
    sh.getRange(rowNum, 1).setValue(wins[i]).setFontWeight('bold');
    sh.getRange(rowNum, 2, 1, 7).insertCheckboxes();
    sh.getRange(rowNum, 9).setFormula('=COUNTIF(B' + rowNum + ':H' + rowNum + ',TRUE)&" / 7"');
  }

  var scoreRow = wins.length + 2;
  sh.getRange(scoreRow, 1).setValue('TAGESSCORE').setFontWeight('bold');
  for (var c = 0; c < 7; c++) {
    var col = String.fromCharCode(66 + c); // B..H
    sh.getRange(scoreRow, 2 + c)
      .setFormula('=COUNTIF(' + col + '2:' + col + (wins.length + 1) + ',TRUE)&" / 4"');
  }
  sh.getRange(scoreRow, 1, 1, header.length)
    .setBackground(THEME.accent).setFontWeight('bold');

  // Gruen einfaerben wenn Haekchen gesetzt
  var cbRange = sh.getRange(2, 2, wins.length, 7);
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=B2=TRUE')
    .setBackground(THEME.win).setFontColor('#FFFFFF')
    .setRanges([cbRange]).build();
  sh.setConditionalFormatRules([rule]);

  sh.getRange(1, 1, scoreRow, header.length)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle').setHorizontalAlignment('center');
  sh.getRange(2, 1, wins.length, 1).setHorizontalAlignment('left');
  sh.setColumnWidth(1, 300);
  for (var d = 2; d <= 9; d++) sh.setColumnWidth(d, 70);
  sh.setColumnWidth(9, 80);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);

  var hint = sh.getRange(scoreRow + 2, 1);
  hint.setValue('Regel: Wer den Vormittag holt (Mental + Physical vor 12 Uhr), '
    + 'dem gehört der Rest des Tages ohne schlechtes Gewissen.');
  hint.setFontStyle('italic').setFontColor('#7A7A7A');
}

/* ---------- TAB 4: Wochen-Review ---------- */

function buildReview_(sh) {
  sh.getRange(1, 1).setValue('🔁 WOCHEN-REVIEW (Sonntagabend, 10 Min)');
  sh.getRange(1, 1, 1, 2).merge();
  styleHeader_(sh, sh.getRange(1, 1, 1, 2));

  var prompts = [
    'Woche vom – bis',
    '✅ Was lief diese Woche richtig gut?',
    '⚠️ Was lief nicht / größtes Hindernis?',
    '🧠 BWL-Fortschritt — konkret, was geschafft?',
    '💼 Kunden ausgeliefert? (Smuuve / Castello / Mon Frere)',
    '🕌 Spiritueller Check — alle Gebete konsequent?',
    '💪 Training — wie viele Einheiten?',
    '🎯 1 Hauptfokus nächste Woche',
    '📌 3 konkrete Ziele nächste Woche',
    '💬 Notiz an Claude — was nächste Woche anpassen?'
  ];

  for (var i = 0; i < prompts.length; i++) {
    var r = i + 2;
    sh.getRange(r, 1).setValue(prompts[i]).setFontWeight('bold')
      .setBackground(THEME.accent).setVerticalAlignment('top').setWrap(true);
    sh.getRange(r, 2).setBackground('#FFFFFF').setWrap(true)
      .setVerticalAlignment('top');
    sh.setRowHeight(r, 60);
  }

  sh.getRange(1, 1, prompts.length + 1, 2)
    .setBorder(true, true, true, true, true, true);
  sh.setColumnWidth(1, 300);
  sh.setColumnWidth(2, 560);
  sh.setFrozenRows(1);
}
