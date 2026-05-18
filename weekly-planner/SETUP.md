# BUILT2WIN — Weekly Planner (V7)

Dein Wochen-System in Google Sheets. Läuft synchron auf iPhone, iPad und MacBook
über deinen Google-Account (`ilguezcaner@gmail.com`).

## Dein Sheet

https://docs.google.com/spreadsheets/d/1WcpaYC1rHPyecMZhWXkCVDJzTBcOxMDwJhrRZHPL_NE/edit

## Einmalig einrichten (~1 Min, am Mac/Laptop)

1. Sheet über den Link oben öffnen
2. Menü **Erweiterungen → Apps Script**
3. Inhalt von `BuildPlanner.gs` komplett reinkopieren (alles ersetzen)
4. Oben Funktion **`buildPlanner`** auswählen → **Run / Ausführen**
5. Beim ersten Mal Google-Zugriff bestätigen (dein eigenes Konto)

Fertig — die 5 Tabs sind aufgebaut. `buildPlanner` erneut laufen zu lassen
baut alles sauber neu auf (vorher kopieren, wenn du Notizen behalten willst).

## Die 5 Tabs

| Tab | Zweck |
|-----|-------|
| **Wochenplan** | **Stundengenau 06:00 → 05:00**, Mo–So. Farbcodiert: 🟨 Gebet · 🟩 Training · 🟪 Agentur · 🟧 Uni/Lernen · 🟦 Werkstudentenjob · ⬜ Schlaf. Echte Wochentermine + Hannover-Gebetszeiten eingebaut. |
| **Trainingsplan** | Wochenstruktur + Plan 1–4 (je Version A/B), Cardio-Detail, Norweger 4×4, Progressive Overload. |
| **Projekte & Kunden** | Smuuve (1.600 €), Castello (600 €), Mon Frere (500 €) → 2.700 € Bestand. Feste Wochen-Tage je Kunde. |
| **Daily Wins** | 4 Wins × 7 Tage zum Abhaken. Auto-Score pro Tag (x/4) und pro Win (x/7). |
| **Wochen-Review** | Sonntagabend-Reflexion + Fokus für die nächste Woche. |

## Gebetszeiten Hannover (Diyanet, ~KW21 / Mai)

Fajr **02:53** · Dhuhr **13:22** · Asr **17:38** · Maghrib **21:27** · Yatsi **23:35**
— im Wochenplan direkt in den Stunden eingetragen. Driften saisonal: in deiner
App gegenchecken; sag mir Bescheid, dann aktualisiere ich sie.

## Feste Wochentermine (Stand diesen Monat)

- **Aufstehen 07:00**, Gym ca. 07:30–08:00 (außer Di + Sa)
- **Di:** Gym ~10:00 → 12:00 nach Salzgitter → ab 17:00 Uni/BWL lernen
- **Mi:** Gym morgens → 12:00–16:00 Braunschweig → danach lernen bis abends
- **Do:** Training = **PUSH** (Plan 3)
- **Fr:** Pull + Kreuzheben vormittags, Werkstudentenjob **15:30–00:00**
- **Sa:** Laufen vormittags, Werkstudentenjob **12:00–20:00**
- **So:** Pause + Wochenplanung + Review
- Mo/Do (kein Job): Uni vormittags, nachmittags **Dreh / Agentur ~13–19**
- **Täglich:** Heimtrainer 25–30 Min Zone 2 direkt nach dem Aufstehen (nüchtern)

## Tageslogik (warum so)

Heimtrainer nüchtern als Start, Krafteinheit/Cardio danach → Uni/Lernen,
nachmittags Dreh/Agentur. Gebete bleiben die Anker im Tag. An Job-Tagen (Fr/Sa)
liegt der Lern- und Trainings-Fokus vormittags, weil der Nachmittag/Abend durch
die Arbeit weg ist. Trainingssplit fest pro Wochentag (Details im Trainings-Tab).

## Updaten

Sag mir einfach, was sich ändert (neuer Kunde, BWL bestanden, andere Zeiten) —
ich passe `BuildPlanner.gs` an, du lässt `buildPlanner` neu laufen.
