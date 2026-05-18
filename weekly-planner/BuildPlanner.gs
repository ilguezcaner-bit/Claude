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

/* ---------- TAB 1: Wochenplan ---------- */

function buildWochenplan_(sh) {
  var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var header = ['Block / Anker'].concat(days);

  // Jede Zeile: [Blocklabel, Mo, Di, Mi, Do, Fr, Sa, So]
  var A = 'Smuuve — Wochen-Checkup (Automatisierung)';
  var Mf = 'Mon Frere — Content-Planung';
  var Ca = 'Castello — Video Batch-Schnitt';
  var rows = [
    ['🕓 Fajr (~04:00) — Anker',
      'Intention + Quran 5 Min','Intention + Quran 5 Min','Intention + Quran 5 Min',
      'Intention + Quran 5 Min','Intention + Quran 5 Min','Intention','Intention + Wochenfokus setzen'],
    ['💪 Morgen (~06:30) — GYM',
      'Gym / Cardio','Gym / Cardio','Gym / Cardio','Gym / Cardio','Gym / Cardio',
      'Gym locker / Spaziergang','Aktive Erholung / Ruhe'],
    ['🧠 Vormittag (~08:15) — DEEP WORK',
      'BWL 3. Versuch · 90+ Min','BWL 3. Versuch · 90+ Min','BWL 3. Versuch · 90+ Min',
      'BWL 3. Versuch · 90+ Min','BWL 3. Versuch · 90+ Min',
      'BWL Catch-up / Altklausuren','FREI — kein Drill (Erholung)'],
    ['🕌 Dhuhr (~13:00) — Reset',
      'Dhuhr + Lunch + 10 Min Reset','Dhuhr + Lunch + 10 Min Reset','Dhuhr + Lunch + 10 Min Reset',
      'Dhuhr + Lunch + 10 Min Reset','Dhuhr + Lunch + 10 Min Reset',
      'Dhuhr + Lunch','Dhuhr + Lunch'],
    ['🎓 Nachmittag (~13:30) — UNI',
      'Uni / Vorlesung (Stundenplan)','Uni / Vorlesung (Stundenplan)','Uni / Vorlesung (Stundenplan)',
      'Uni / Vorlesung (Stundenplan)','Uni / Vorlesung (Stundenplan)',
      '—','Woche planen (Tab „Projekte & Kunden“)'],
    ['🕌 Asr (~17:15) — Anker',
      'Asr','Asr','Asr','Asr','Asr','Asr','Asr'],
    ['💼 Spätnachm. (~17:30) — AGENTUR',
      A, Mf, 'Reporting + Kunden-Kommunikation', 'Smuuve Feinschliff / Puffer', Ca,
      'Wochenvorbereitung / Rechnungen','— (Rest)'],
    ['🕌 Maghrib (~21:00) — Dankbarkeit',
      'Maghrib + 3 Dankbarkeiten','Maghrib + 3 Dankbarkeiten','Maghrib + 3 Dankbarkeiten',
      'Maghrib + 3 Dankbarkeiten','Maghrib + 3 Dankbarkeiten',
      'Maghrib + 3 Dankbarkeiten','Maghrib + 3 Dankbarkeiten'],
    ['🌙 Abend — Puffer',
      'Content / Lernen light','Content / Lernen light','Content / Lernen light',
      'Content / Lernen light','Content / Lernen light',
      'Familie / Soziales','Tab „Wochen-Review“ ausfüllen'],
    ['🕌 Yatsi (~22:45) — Anker',
      'Yatsi','Yatsi','Yatsi','Yatsi','Yatsi','Yatsi','Yatsi'],
    ['😴 Nacht (~23:00) — SHUTDOWN',
      'Walk · Journal · Reading · Sleep','Walk · Journal · Reading · Sleep','Walk · Journal · Reading · Sleep',
      'Walk · Journal · Reading · Sleep','Walk · Journal · Reading · Sleep',
      'Walk · Journal · Reading · Sleep','Walk · Journal · Reading · Sleep']
  ];

  sh.getRange(1, 1, 1, header.length).setValues([header]);
  styleHeader_(sh, sh.getRange(1, 1, 1, header.length));
  sh.getRange(2, 1, rows.length, header.length).setValues(rows);

  // Anker-Zeilen einfaerben (enthalten "Anker" oder Gebet)
  for (var r = 0; r < rows.length; r++) {
    var label = rows[r][0];
    if (label.indexOf('Anker') > -1 || label.indexOf('Dankbarkeit') > -1) {
      sh.getRange(r + 2, 1, 1, header.length).setBackground(THEME.anchor);
    }
  }

  sh.getRange(2, 1, rows.length, 1).setFontWeight('bold');
  sh.getRange(1, 1, rows.length + 1, header.length)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle').setWrap(true);
  sh.setColumnWidth(1, 260);
  for (var c = 2; c <= header.length; c++) sh.setColumnWidth(c, 170);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);

  var note = sh.getRange(rows.length + 3, 1);
  note.setValue('⚠️ Gebetszeiten saisonal anpassen (deine lokale App / Diyanet). '
    + 'Uni-Zeiten an deinen echten Stundenplan anpassen.');
  note.setFontStyle('italic').setFontColor('#7A7A7A');
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
