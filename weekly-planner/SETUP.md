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

Fertig — die 6 Tabs sind aufgebaut. `buildPlanner` erneut laufen zu lassen
baut alles sauber neu auf (vorher kopieren, wenn du Notizen behalten willst).

## Die 6 Tabs

| Tab | Zweck |
|-----|-------|
| **Woche (aktuell)** | Diese Woche, stundengenau 06:00 → 05:00. Enthält die **einmaligen** myChicken-Termine: Di Salzgitter, Mi Braunschweig. |
| **Woche (Vorlage)** | Grundstruktur, gilt **jede Woche**. Kein Reisen, Uni in Hannover, Mi 13:00 myChicken-Call (Google Meet). Diese Vorlage in einen neuen Tab kopieren = Plan für die nächste Woche. |
| **Trainingsplan** | Wochenstruktur + Plan 1–4 (je Version A/B), Cardio-Detail, Norweger 4×4, Progressive Overload. |
| **Projekte & Kunden** | Smuuve (1.600 €), Castello (600 €), Mon Frere (500 €), myChicken. Feste Wochen-Tage je Kunde. |
| **Daily Wins** | 4 Wins × 7 Tage zum Abhaken. Auto-Score pro Tag (x/4) und pro Win (x/7). |
| **Wochen-Review** | Sonntagabend-Reflexion + Fokus für die nächste Woche. |

Farbcodierung in beiden Wochen-Tabs: 🟨 Gebet · 🟩 Training · 🟪 Agentur/myChicken/Call · 🟧 Uni/BWL/Fahrt · 🟦 Werkstudentenjob · ⬜ Schlaf.

## Gebetszeiten Hannover (Diyanet, ~KW21 / Mai)

Fajr **02:53** · Dhuhr **13:22** · Asr **17:38** · Maghrib **21:27** · Yatsi **23:35**
— in beiden Wochen-Tabs direkt in den Stunden eingetragen. Driften saisonal: in
deiner App gegenchecken; sag mir Bescheid, dann aktualisiere ich sie.

## Routine (gilt jede Woche — Tab „Woche (Vorlage)")

- **Aufstehen 07:00** + Heimtrainer 25–30 Min Zone 2 (nüchtern), täglich
- **Mo:** Brust + Rücken · Uni Hannover · Agentur nachmittags
- **Di:** Beine + Schulter/Arm · Uni Hannover · Agentur nachmittags
- **Mi:** Schwimmen · Uni Hannover · **13:00 myChicken-Call (Google Meet, ~75 Min)** · Agentur
- **Do:** Push · Uni Hannover · Agentur nachmittags
- **Fr:** Pull + Kreuzheben vormittags · Werkstudentenjob **15:30–00:00**
- **Sa:** Laufen vormittags · Werkstudentenjob **12:00–20:00**
- **So:** Pause + Wochenplanung + Review

## Nur diese Woche (Tab „Woche (aktuell)")

- **Di:** statt Uni → **myChicken Salzgitter** (Anfahrt 12:00, einmalig)
- **Mi:** statt normalem Tag → **myChicken Braunschweig** 12:00–16:00 (einmalig)

Salzgitter/Braunschweig sind **keine** feste Routine — nur diese Woche wegen
myChicken. Für die nächsten Wochen die Vorlage nutzen.

## Tageslogik (warum so)

Heimtrainer nüchtern als Start, Krafteinheit/Cardio danach → Uni Hannover /
Lernen, nachmittags Agentur. Gebete bleiben die Anker im Tag. An Job-Tagen
(Fr/Sa) liegt Lern- und Trainings-Fokus vormittags, weil der Nachmittag/Abend
durch die Arbeit weg ist. Trainingssplit fest pro Wochentag (Details im
Trainings-Tab).

## Updaten

Sag mir einfach, was sich ändert (neuer Kunde, BWL bestanden, andere Zeiten) —
ich passe `BuildPlanner.gs` an, du lässt `buildPlanner` neu laufen.
