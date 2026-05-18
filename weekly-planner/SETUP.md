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

Fertig — die 4 Tabs sind aufgebaut. `buildPlanner` erneut laufen zu lassen
baut alles sauber neu auf (vorher kopieren, wenn du Notizen behalten willst).

## Die 4 Tabs

| Tab | Zweck |
|-----|-------|
| **Wochenplan** | Mo–So × Tagesblöcke. Gebete = Anker (gold). Gym morgens, BWL-Deep-Work vormittags, Uni nachmittags, Agentur spätnachmittags. |
| **Projekte & Kunden** | Smuuve (1.600 €), Castello (600 €), Mon Frere (500 €) → 2.700 € Bestand. Feste Wochen-Tage je Kunde. |
| **Daily Wins** | 4 Wins × 7 Tage zum Abhaken. Auto-Score pro Tag (x/4) und pro Win (x/7). |
| **Wochen-Review** | Sonntagabend-Reflexion + Fokus für die nächste Woche. |

## Tageslogik (warum so)

Gym zuerst pusht die Konzentration → danach immer noch **vormittags** der
BWL-Deep-Work-Block (3. Versuch). Körperlicher + mentaler Win vor 12 Uhr.
Uni-Vorlesungen liegen nachmittags (passiver Input, eh durch Stundenplan fix),
Agentur spätnachmittags. Gebetszeiten saisonal an deine lokale App anpassen.

## Updaten

Sag mir einfach, was sich ändert (neuer Kunde, BWL bestanden, andere Zeiten) —
ich passe `BuildPlanner.gs` an, du lässt `buildPlanner` neu laufen.
