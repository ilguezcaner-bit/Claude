/**
 * BUILT2WIN — Weekly Planner (V7)  ·  Generator
 * --------------------------------------------------------------
 * Baut den kompletten Weekly Planner in 6 Tabs auf:
 *   1) Woche (aktuell)   2) Woche (Vorlage)   3) Trainingsplan
 *   4) Projekte & Kunden 5) Daily Wins        6) Wochen-Review
 *
 * "Woche (aktuell)"  = diese Woche inkl. myChicken Salzgitter (Di)
 *                       + Braunschweig (Mi) — einmalig.
 * "Woche (Vorlage)"  = Grundstruktur, gilt jede Woche (kein Reisen,
 *                       Uni in Hannover, Mi 13:00 myChicken Call).
 *
 * BEDIENUNG (einmalig):
 *   Sheet oeffnen  ->  Erweiterungen  ->  Apps Script
 *   Diesen Code einfuegen  ->  oben "buildPlanner" waehlen  ->  Run
 *
 * Erneut "buildPlanner" laufen lassen = baut sauber neu auf.
 */

var THEME = {
  header:  '#13293D',
  headerT: '#FFFFFF',
  anchor:  '#FCEFC7',
  win:     '#1B998B',
  accent:  '#E0FBFC',
  total:   '#13293D'
};

function buildPlanner() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('BUILT2WIN — Weekly Planner (V7)');

  var keep = ['Woche (aktuell)', 'Woche (Vorlage)', 'Trainingsplan',
              'Projekte & Kunden', 'Daily Wins', 'Wochen-Review'];

  buildWeekSheet_(freshSheet_(ss, 'Woche (aktuell)'), 'current');
  buildWeekSheet_(freshSheet_(ss, 'Woche (Vorlage)'), 'template');
  buildTrainingsplan_(freshSheet_(ss, 'Trainingsplan'));
  buildProjekte_(freshSheet_(ss, 'Projekte & Kunden'));
  buildDailyWins_(freshSheet_(ss, 'Daily Wins'));
  buildReview_(freshSheet_(ss, 'Wochen-Review'));

  for (var i = 0; i < keep.length; i++) {
    ss.setActiveSheet(ss.getSheetByName(keep[i]));
    ss.moveActiveSheet(i + 1);
  }
  ss.getSheets().forEach(function (sh) {
    if (keep.indexOf(sh.getName()) === -1) ss.deleteSheet(sh);
  });
  ss.setActiveSheet(ss.getSheetByName('Woche (aktuell)'));

  SpreadsheetApp.getUi().alert('BUILT2WIN Weekly Planner V7 ist fertig aufgebaut. Yallah.');
}

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

/* ---------- Woche (aktuell) + Woche (Vorlage) ---------- */

function buildWeekSheet_(sh, mode) {
  var days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var header = ['Zeit'].concat(days);

  var hours = ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
               '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00',
               '22:00','23:00','00:00','01:00','02:00','03:00','04:00','05:00'];

  var S  = 'Schlaf';
  var FA = 'Schlaf · 🕌 Fajr 02:53 (Wecker optional)';
  var HT = 'Aufstehen · Heimtrainer 25–30 Min Zone 2 (nüchtern, Buch)';

  var Mo = [S, HT,
    'Gym — Brust + Rücken (Plan 1 · Version A/B)',
    'Gym / Dusche / Frühstück',
    'Uni Hannover / BWL Lernen',
    'Uni Hannover / BWL Lernen',
    'Uni / BWL Lernen',
    '🕌 Dhuhr 13:22 · Lunch · Reset',
    'Agentur', 'Agentur', 'Agentur',
    '🕌 Asr 17:38 · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit / Prep nächster Tag',
    '🕌 Yatsi 23:35 · Shutdown (Walk·Journal·Read)',
    S, S, FA, S, S, S];

  var Do = [S, HT,
    'Gym — PUSH (Plan 3 · Version A/B)',
    'Gym / Dusche / Frühstück',
    'Uni Hannover / BWL Lernen',
    'Uni Hannover / BWL Lernen',
    'Uni / BWL Lernen',
    '🕌 Dhuhr 13:22 · Lunch · Reset',
    'Agentur', 'Agentur', 'Agentur',
    '🕌 Asr 17:38 · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit / Prep nächster Tag',
    '🕌 Yatsi 23:35 · Shutdown (Walk·Journal·Read)',
    S, S, FA, S, S, S];

  var Fr = [S, HT,
    'Gym — Pull + Kreuzheben (Plan 4 · Version A/B)',
    'Gym / Dusche / Frühstück',
    'BWL Lernen', 'BWL Lernen',
    'Agentur',
    '🕌 Dhuhr 13:22 · Lunch',
    'Agentur',
    'Vorbereitung / Fahrt — Work ab 15:30',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Asr 17:38 (kurz)',
    'Werkstudentenjob', 'Werkstudentenjob', 'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Maghrib 21:27 (kurz)',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Yatsi 23:35 (kurz)',
    'Feierabend 00:00 · Heimfahrt',
    'Shutdown / Schlaf',
    FA, S, S, S];

  var Sa = [S,
    'Schlaf / Ausschlafen',
    'Aufstehen · Frühstück',
    'Laufen 30–40 Min Zone 2 (oder Norweger 4×4)',
    'Dusche / Vorbereitung',
    'Fahrt Work',
    'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Dhuhr 13:22 (kurz)',
    'Werkstudentenjob', 'Werkstudentenjob', 'Werkstudentenjob',
    'Werkstudentenjob · 🕌 Asr 17:38 (kurz)',
    'Werkstudentenjob', 'Werkstudentenjob',
    'Feierabend 20:00 · Heimfahrt',
    '🕌 Maghrib 21:27 · Abendessen',
    'Freizeit / Familie',
    '🕌 Yatsi 23:35 · Shutdown',
    S, S, FA, S, S, S];

  var So = [S,
    'Schlaf / Ausschlafen erlaubt',
    'Aufstehen · ruhiger Morgen',
    'Heimtrainer locker / Spaziergang (Rest-Tag)',
    'Frühstück / Familie',
    'Wochenplanung (Tab Projekte & Kunden)',
    'BWL Lernen light',
    '🕌 Dhuhr 13:22 · Lunch',
    'BWL Vorbereitung kommende Woche',
    'Agentur Wochenvorbereitung',
    'Puffer / Familie',
    '🕌 Asr 17:38 · Freizeit',
    'Wochen-Review Tab ausfüllen',
    'Abendessen', 'Entspannung',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit (früh runterfahren)',
    '🕌 Yatsi 23:35 · Shutdown (früh ins Bett für Mo)',
    S, S, FA, S, S, S];

  // Di: Vorlage = normaler Tag · aktuell = myChicken Salzgitter (einmalig)
  var DiTemplate = [S, HT,
    'Gym — Beine + Schulter/Arm Finisher (Plan 2 · Version A/B)',
    'Gym / Dusche / Frühstück',
    'Uni Hannover / BWL Lernen',
    'Uni Hannover / BWL Lernen',
    'Uni / BWL Lernen',
    '🕌 Dhuhr 13:22 · Lunch · Reset',
    'Agentur', 'Agentur', 'Agentur',
    '🕌 Asr 17:38 · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit / Prep nächster Tag',
    '🕌 Yatsi 23:35 · Shutdown (Walk·Journal·Read)',
    S, S, FA, S, S, S];

  var DiCurrent = [S, HT,
    'Frühstück / Prep',
    'Anfahrt Gym',
    'Gym — Beine + Schulter/Arm Finisher (Plan 2)',
    'Gym Ende / Dusche / Snack to-go',
    'Fahrt nach Salzgitter (myChicken)',
    'myChicken Salzgitter · 🕌 Dhuhr 13:22',
    'myChicken Salzgitter',
    'myChicken Salzgitter',
    'Rückfahrt / Puffer',
    'BWL Lernen · 🕌 Asr 17:38',
    'BWL Lernen',
    'BWL Lernen / Abendessen',
    'Agentur Minimal-Check',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Shutdown-Vorbereitung',
    '🕌 Yatsi 23:35 · Shutdown',
    S, S, FA, S, S, S];

  // Mi: Routine = Schwimmen + 13:00 myChicken Call (Google Meet)
  //     aktuell = Braunschweig (myChicken) einmalig, Call vor Ort
  var MiTemplate = [S, HT,
    'Schwimmen 20–30 Min (Technik) · ggf. Norweger 4×4',
    'Dusche / Frühstück',
    'Uni Hannover / BWL Lernen',
    'Uni Hannover / BWL Lernen',
    'BWL Lernen / Prep myChicken Call',
    '🎥 myChicken Call (Google Meet, ~75 Min) · 🕌 Dhuhr 13:22 danach',
    'myChicken Call — Nachbereitung',
    'Agentur', 'Agentur',
    '🕌 Asr 17:38 · Agentur',
    'Agentur Abschluss / Puffer',
    'Abendessen / Pause',
    'BWL Lernen light',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit',
    '🕌 Yatsi 23:35 · Shutdown',
    S, S, FA, S, S, S];

  var MiCurrent = [S, HT,
    'Schwimmen 20–30 Min (Technik) · ggf. Norweger 4×4',
    'Dusche / Frühstück',
    'BWL Lernen / Prep Braunschweig',
    'Fahrt nach Braunschweig (myChicken)',
    'myChicken Braunschweig',
    '🎥 myChicken Call/Termin 13:00 (~75 Min) · 🕌 Dhuhr 13:22',
    'myChicken Braunschweig',
    'myChicken Braunschweig',
    'Rückfahrt',
    'BWL Lernen · 🕌 Asr 17:38',
    'BWL Lernen',
    'Lernen / Abendessen',
    'Agentur Check',
    '🕌 Maghrib 21:27 · 3 Dankbarkeiten',
    'Freizeit',
    '🕌 Yatsi 23:35 · Shutdown',
    S, S, FA, S, S, S];

  var Di = (mode === 'current') ? DiCurrent : DiTemplate;
  var Mi = (mode === 'current') ? MiCurrent : MiTemplate;

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
    '🟨 Gebet/Anker   🟩 Training   🟪 Agentur/myChicken/Call   '
    + '🟧 Uni/BWL/Fahrt   🟦 Werkstudentenjob   ⬜ Schlaf').setFontWeight('bold');
  sh.getRange(lr + 1, 1).setValue(
    '🕌 Gebetszeiten Hannover (Diyanet, ~KW21): Fajr 02:53 · Dhuhr 13:22 · '
    + 'Asr 17:38 · Maghrib 21:27 · Yatsi 23:35 — driften saisonal, in App prüfen')
    .setFontStyle('italic').setFontColor('#7A7A7A');
  var modeNote = (mode === 'current')
    ? 'ℹ️ DIESE WOCHE: Di myChicken Salzgitter + Mi myChicken Braunschweig '
      + '(einmalig). Routine-Version siehe Tab „Woche (Vorlage)“.'
    : 'ℹ️ GRUNDSTRUKTUR — gilt jede Woche. Routine: Mi 13:00 myChicken Call '
      + '(Google Meet). Uni in Hannover. Job: Fr 15:30–00:00, Sa 12:00–20:00. '
      + 'Diese Vorlage in einen neuen Tab kopieren = Plan für die nächste Woche.';
  sh.getRange(lr + 2, 1).setValue(modeNote)
    .setFontStyle('italic').setFontColor('#7A7A7A');
}

function cellColor_(t) {
  if (!t) return '#FFFFFF';
  if (t.indexOf('🕌') > -1) return '#FCEFC7';
  if (t.indexOf('Schlaf') === 0) return '#EDEDED';
  if (t.indexOf('Gym') > -1 || t.indexOf('PUSH') > -1 || t.indexOf('Schwimmen') > -1
      || t.indexOf('Laufen') > -1 || t.indexOf('Heimtrainer') > -1
      || t.indexOf('Norweger') > -1) return '#D6F5D6';
  if (t.indexOf('Werkstudentenjob') > -1 || t.indexOf('Feierabend') > -1
      || t.indexOf('Work') > -1) return '#D6E4F5';
  if (t.indexOf('Agentur') > -1 || t.indexOf('myChicken') > -1
      || t.indexOf('Call') > -1 || t.indexOf('Dreh') > -1) return '#E8DAEF';
  if (t.indexOf('Uni') > -1 || t.indexOf('Lernen') > -1 || t.indexOf('BWL') > -1
      || t.indexOf('Vorlesung') > -1 || t.indexOf('Fahrt') > -1
      || t.indexOf('Salzgitter') > -1 || t.indexOf('Braunschweig') > -1) return '#FDEBD0';
  return '#FFFFFF';
}

/* ---------- Projekte & Kunden ---------- */

function buildProjekte_(sh) {
  var header = ['Kunde', 'Status', 'Budget (€)', 'Wöchentliche Aktion',
                'Fester Tag', 'Nächste Deadline', 'Notiz'];
  var data = [
    ['Smuuve', 'Bestand', 1600, 'Wochen-Checkup (Automatisierung)', 'Montag', '', 'Größter Kunde — stabil halten'],
    ['Ristorante Castello', 'Bestand', 600, 'Video Batch-Schnitt', 'Freitag', '', 'Wochencontent'],
    ['Mon Frere', 'Bestand', 500, 'Content-Planung', 'Dienstag', '', ''],
    ['myChicken', 'Aktiv', '', 'Call Google Meet', 'Mittwoch 13:00', '', 'Diese Woche: Di Salzgitter + Mi Braunschweig (einmalig)']
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
  sh.setColumnWidth(4, 230); sh.setColumnWidth(5, 130); sh.setColumnWidth(6, 140);
  sh.setColumnWidth(7, 260);
  sh.getRange(2, 3, data.length + 1, 1).setNumberFormat('#,##0 €');
  sh.setFrozenRows(1);
}

/* ---------- Daily Wins ---------- */

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
    var col = String.fromCharCode(66 + c);
    sh.getRange(scoreRow, 2 + c)
      .setFormula('=COUNTIF(' + col + '2:' + col + (wins.length + 1) + ',TRUE)&" / 4"');
  }
  sh.getRange(scoreRow, 1, 1, header.length)
    .setBackground(THEME.accent).setFontWeight('bold');

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

/* ---------- Wochen-Review ---------- */

function buildReview_(sh) {
  sh.getRange(1, 1).setValue('🔁 WOCHEN-REVIEW (Sonntagabend, 10 Min)');
  sh.getRange(1, 1, 1, 2).merge();
  styleHeader_(sh, sh.getRange(1, 1, 1, 2));

  var prompts = [
    'Woche vom – bis',
    '✅ Was lief diese Woche richtig gut?',
    '⚠️ Was lief nicht / größtes Hindernis?',
    '🧠 BWL-Fortschritt — konkret, was geschafft?',
    '💼 Kunden ausgeliefert? (Smuuve / Castello / Mon Frere / myChicken)',
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
  sh.setColumnWidth(1, 320);
  sh.setColumnWidth(2, 560);
  sh.setFrozenRows(1);
}

/* ---------- Trainingsplan ---------- */

function buildTrainingsplan_(sh) {
  var r = 1;

  function title(t) {
    sh.getRange(r, 1, 1, 3).merge().setValue(t)
      .setBackground(THEME.header).setFontColor('#FFFFFF').setFontWeight('bold')
      .setFontSize(13).setHorizontalAlignment('center');
    sh.setRowHeight(r, 36); r++;
  }
  function section(t) {
    sh.getRange(r, 1, 1, 3).merge().setValue(t)
      .setBackground(THEME.total).setFontColor('#FFFFFF').setFontWeight('bold');
    sh.setRowHeight(r, 28); r++;
  }
  function sub(t) {
    sh.getRange(r, 1, 1, 3).merge().setValue(t)
      .setBackground(THEME.accent).setFontWeight('bold'); r++;
  }
  function exTable(rowsArr) {
    sh.getRange(r, 1, 1, 3).setValues([['Übung', 'Sätze', 'Wdh']])
      .setFontWeight('bold').setBackground('#EDEDED'); r++;
    sh.getRange(r, 1, rowsArr.length, 3).setValues(rowsArr); r += rowsArr.length;
  }
  function kv(rowsArr) {
    for (var i = 0; i < rowsArr.length; i++) {
      sh.getRange(r, 1).setValue(rowsArr[i][0]).setFontWeight('bold');
      sh.getRange(r, 2, 1, 2).merge().setValue(rowsArr[i][1]).setWrap(true);
      r++;
    }
  }
  function gap() { r++; }

  title('🏋️ TRAININGSPLAN — Caner V7');

  section('WOCHENSTRUKTUR');
  kv([
    ['Mo', 'Brust + Rücken (Plan 1)'],
    ['Di', 'Beine + Schulter/Arm Finisher (Plan 2)'],
    ['Mi', 'Schwimmen 20–30 Min (Technik / Kraul)'],
    ['Do', 'Push (Plan 3)'],
    ['Fr', 'Pull + Kreuzheben (Plan 4)'],
    ['Sa', 'Laufen 30–40 Min Zone 2'],
    ['So', 'Pause'],
    ['Täglich morgens', 'Heimtrainer 25–30 Min Zone 2 (nüchtern)'],
    ['Norweger 4×4', '2×/Woche — Mi nach Schwimmen oder Sa statt Lauf']
  ]);
  gap();

  section('PLAN 1 — Brust + Rücken (Mo)');
  sub('Version A');
  exTable([
    ['Klimmzüge', 4, 'max'],
    ['Seated Cable Row', 3, '8–10'],
    ['Bankdrücken', 4, '5–6 @ 102,5 kg'],
    ['Butterfly / Chest Fly', 3, '12–15'],
    ['Medizinball Slam', 3, '10 explosiv']
  ]);
  sub('Version B');
  exTable([
    ['Latzug', 4, '8–10'],
    ['Einarmiges KH Rudern', 3, '8–10'],
    ['Schrägbank Maschine', 4, '8–10'],
    ['Kabelzug Flyes', 3, '12–15'],
    ['Medizinball Chest Pass', 3, '8 explosiv']
  ]);
  gap();

  section('PLAN 2 — Beine + Schulter/Arm Finisher (Di)');
  sub('Version A');
  exTable([
    ['Box Jumps', 3, '5 Aktivierung'],
    ['Trap Bar Deadlift', 4, '5–6'],
    ['Bulgarischer Split Squat', 3, '8 pro Bein'],
    ['Beinbizeps Maschine', 3, '10–12'],
    ['Sprints 20–30m', 5, 'Vollgas'],
    ['Seitheben', 2, '12–15'],
    ['Face Pull', 2, '15'],
    ['Bizeps Curl', 2, '10–12'],
    ['Trizeps Pushdown', 2, '12']
  ]);
  sub('Version B');
  exTable([
    ['Box Jumps', 3, '5 Aktivierung'],
    ['Zercher Kniebeuge', 4, '6–8'],
    ['Ausfallschritte gehend', 3, '10 pro Bein'],
    ['Beinpresse', 3, '10–12'],
    ['Sprints 20–30m', 5, 'Vollgas'],
    ['Schulterdrücken KH', 2, '10–12'],
    ['Hintere Schulter Maschine', 2, '15'],
    ['Hammer Curl', 2, '12'],
    ['Skull Crushers', 2, '10–12']
  ]);
  gap();

  section('PLAN 3 — Push (Do)');
  sub('Version A');
  exTable([
    ['Bankdrücken', 4, '5–6'],
    ['Landmine Press', 3, '10 pro Seite'],
    ['Dips Maschine', 3, '8–10'],
    ['Seitheben', 3, '12–15'],
    ['Trizeps Pushdown', 3, '12'],
    ['Schlitten schieben', 4, '20–30m']
  ]);
  sub('Version B');
  exTable([
    ['Schrägbank Maschine', 4, '8–10'],
    ['Schulterdrücken KH', 3, '8–10'],
    ['Dips Maschine', 3, '8–10'],
    ['Seitheben Kabel', 3, '12–15'],
    ['Skull Crushers', 3, '10–12'],
    ['Schlitten ziehen', 4, '20–30m']
  ]);
  gap();

  section('PLAN 4 — Pull + Kreuzheben (Fr)');
  sub('Version A');
  exTable([
    ['Trap Bar Deadlift', 4, '4–5 schwer'],
    ['Klimmzüge', 3, 'max'],
    ['Seated Cable Row', 3, '8–10'],
    ['Face Pull', 3, '15'],
    ['Hammer Curl', 2, '12']
  ]);
  sub('Version B');
  exTable([
    ['Klassisches Kreuzheben', 4, '4–5 schwer'],
    ['Latzug', 3, '8–10'],
    ['T-Bar Row', 3, '8–10'],
    ['Face Pull', 2, '15'],
    ['Bizeps Curl LH', 2, '10–12']
  ]);
  gap();

  section('CARDIO — DETAIL');
  kv([
    ['Heimtrainer (täglich morgens)', '25–30 Min Zone 2 · Buch auf, locker fahren · nüchtern wenn möglich'],
    ['Schwimmen (Mi)', '20–30 Min · Fokus Technik, kein Wettkampftempo · Kraul lernen und festigen'],
    ['Laufen (Sa)', '30–40 Min Zone 2 · reden möglich, aber nicht gemütlich · kein Sprint, kein Pace-Druck'],
    ['Norwegische 4×4 (2×/Woche)', 'Heimtrainer/Fahrrad · 10 Min Warm-Up · 4 × (4 Min Vollgas / 3 Min locker) · 5 Min Cool-Down · beste Tage: Mi nach Schwimmen oder Sa statt Lauf']
  ]);
  gap();

  section('PROGRESSIVE OVERLOAD');
  sh.getRange(r, 1, 1, 3).setValues([['Bereich', 'Regel', '']])
    .setFontWeight('bold').setBackground('#EDEDED');
  sh.getRange(r, 2, 1, 2).merge(); r++;
  var po = [
    ['Grundübungen', '+2,5 kg wenn alle Sätze sauber'],
    ['Klimmzüge', '+1 Rep pro Satz als Wochenziel'],
    ['Cardio', '+5 Min pro Woche maximal'],
    ['Heimtrainer', 'Erst täglich etablieren, dann Intervalle einbauen']
  ];
  for (var p = 0; p < po.length; p++) {
    sh.getRange(r, 1).setValue(po[p][0]).setFontWeight('bold');
    sh.getRange(r, 2, 1, 2).merge().setValue(po[p][1]).setWrap(true);
    r++;
  }

  sh.getRange(1, 1, r - 1, 3)
    .setBorder(true, true, true, true, true, true).setVerticalAlignment('middle');
  sh.setColumnWidth(1, 240);
  sh.setColumnWidth(2, 80);
  sh.setColumnWidth(3, 320);
  sh.setFrozenRows(1);
}
