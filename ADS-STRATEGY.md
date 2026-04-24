# SMUUVE — Paid Ads Strategy
> Erstellt: 2026-04-24 | Plattformen: Meta + TikTok | Markt: Deutschland (DACH)

---

## 1. Situation & Ziel

| | |
|---|---|
| **Brand** | Smuuve — vegane Keratin-Haarglättung, DTC via Shopify |
| **Hero-Produkt** | Probe Kit €74,95 (77 Bewertungen, 4.9★) |
| **Markt** | Deutschland (primär), AT/CH (sekundär) |
| **Ziel** | Shopify-Conversions (Purchase) |
| **USP** | Erste vegane Keratin-Behandlung zuhause — 3 Monate Wirkung, ohne Formaldehyd |

---

## 2. Wettbewerber-Überblick

| Wettbewerber | Typ | Schwäche vs. Smuuve |
|---|---|---|
| KATIVA Keratin Xpress | Drogerie / Chemisch | Nicht vegan, Chemie-Image |
| Kerasilk (Goldwell) | Salon-only | Nicht für zuhause, teuer |
| Schwarzkopf Strait Styling | Drogerie | Massenmarkt, keine Transformation |
| L'Oréal Tecni Art | Drogerie | Tierisches Keratin, kein Claim |

**Gap:** Kein Wettbewerber besetzt "vegane At-Home-Keratin-Behandlung mit 3+ Monaten Wirkung" im Performance-Kanal aggressiv.

---

## 3. Plattform-Strategie

**Business-Typ:** E-Commerce DTC → laut Matrix: Meta 50-68%, TikTok 5-30%, Google PMax 20-30%

**Smuuve-Anpassung:** TikTok höher gewichten (Haar-Content ist nativ + CPM 40-60% günstiger als Meta)

| Plattform | Anteil | Begründung |
|---|---|---|
| **Meta Ads** | **55%** | Hauptkanal Conversions, Advantage+ Shopping, breite Zielgruppe DE |
| **TikTok Ads** | **35%** | Transformations-Content nativ, 40-60% günstigere CPMs, jüngere Zielgruppe |
| **Google PMax** | **10%** | Brand-Searches abfangen ("smuuve", "vegane Haarglättung kaufen") |

---

## 4. Zielgruppen

### Primary (Warm)
- Frauen 22–38, Deutschland
- Interessen: Haarpflege, Naturkosmetik, vegane Produkte, Keratin, Friseur
- Behavior: Online-Shopper, Beauty DTC Käufer

### Secondary (Lookalike)
- LAL 1-3% basierend auf Purchase-Events (Shopify → Meta CAPI)
- LAL 1% Website-Besucher Produktseite

### Retargeting
- Produktseiten-Besucher (7 Tage)
- Add-to-Cart ohne Purchase (14 Tage)
- Instagram-Profil-Interaktionen (30 Tage)

---

## 5. Budget-Plan (Empfehlung Monat 1-3)

### Einstieg: €1.500/Monat (Testing-Phase)

| Plattform | Budget/Monat | Tagesbudget |
|---|---|---|
| Meta Ads | €825 | €27,50 |
| TikTok Ads | €525 | €17,50 |
| Google PMax | €150 | €5 |

### Scale: €3.000/Monat (ab Monat 3 wenn ROAS ≥ 2.5)

| Plattform | Budget/Monat |
|---|---|
| Meta Ads | €1.650 |
| TikTok Ads | €1.050 |
| Google PMax | €300 |

**70/20/10 Regel ab Monat 3:**
- 70% → Best-performing Kampagne/Creative
- 20% → Zweitbeste Plattform (TikTok oder Meta)
- 10% → Testing (neue Creatives, Audiences, Google)

### KPI-Ziele

| Metric | Monat 1 (Basis) | Monat 3 | Monat 6 |
|---|---|---|---|
| ROAS | 1.5-2.0 | 2.5-3.5 | 3.5-5.0 |
| CPA (Purchase) | €40-60 | €30-45 | €25-35 |
| Meta CPM | ~€12.50 | ~€12.50 | ~€11 |
| TikTok CPM | ~€4.26 | ~€4.26 | ~€4 |
| Shopify CVR | Baseline | +10% | +20% |

---

## 6. Kampagnen-Architektur

### META

```
Meta Ads Account — Smuuve DE
├── [CONV] Advantage+ Shopping Campaign (ASC) — always-on
│   └── Budget: 50% des Meta-Budgets
│   └── Alle Produkte, breite Zielgruppe DE, Advantage+ Creative ON
│
├── [CONV] Prospecting — Kalte Audiences
│   ├── Ad Set 1: Haarpflege-Interessen (22-38, Frauen, DE)
│   ├── Ad Set 2: Vegane Beauty-Interessen (22-42, Frauen, DE)
│   └── Ad Set 3: Lookalike 1-3% Purchase (wenn 50+ Events)
│
└── [CONV] Retargeting
    ├── Ad Set 1: Produktseite 7d (ohne Purchase)
    ├── Ad Set 2: Add-to-Cart 14d (ohne Purchase)
    └── Ad Set 3: IG-Engagement 30d
```

### TIKTOK

```
TikTok Ads Account — Smuuve DE
├── [CONV] Smart+ Catalog — always-on
│   └── Produkt-Feed verknüpft, Conversion-Ziel: Purchase
│
├── [CONV] In-Feed Ads — Prospecting
│   ├── Ad Group 1: Interesse Hair Care / Beauty (22-35, Frauen, DE)
│   └── Ad Group 2: Broad (22-38, Frauen, DE)
│
└── [ENGAGE] Spark Ads — UGC boosen
    └── Best-performing organische TikTok-Posts (@smuuve.de) boosten
```

### NAMING CONVENTION
```
META_CONV_ASC_DE_2026Q2
META_CONV_Prospecting_HairInterest_DE_2026Q2
META_RET_CartAbandoner_14d_DE_2026Q2
TIKTOK_CONV_SmartPlus_DE_2026Q2
TIKTOK_SPARK_UGC_DE_2026Q2
```

---

## 7. Tracking Setup (vor Launch!)

| Schritt | Tool | Priorität |
|---|---|---|
| Meta Pixel installieren | Shopify → Meta-App | **P1** |
| Meta CAPI (Server-side) | Shopify → Meta CAPI App | **P1** |
| Purchase-Event konfigurieren | Pixel + CAPI | **P1** |
| TikTok Pixel installieren | Shopify → TikTok App | **P1** |
| TikTok Events API | Server-side | P2 |
| Google Analytics 4 | Shopify → GA4 | P2 |
| Google Tag Manager | Container einrichten | P2 |

**Ziel vor Launch:** EMQ (Event Match Quality) ≥ 7.0 auf Meta, Purchase-Event feuert zuverlässig.

---

## 8. Implementierungs-Roadmap

| Phase | Woche | Aktivitäten |
|---|---|---|
| **Foundation** | 1-2 | Pixel/CAPI installieren, Shopify-Produkt-Feed, Konten einrichten, erste Creatives in Higgsfield generieren |
| **Launch** | 3-4 | ASC + 1 Prospecting live, konservative Budgets, täglich monitoren |
| **Optimieren** | 5-8 | Daten auswerten, Creative-Killer pausieren (3x Kill Rule), TikTok Smart+ dazu |
| **Scalen** | 9-12 | Budget +20% auf Winner, Retargeting ausbauen, Google PMax testen |

---

## 9. Creative-Strategie

### Content-Pillars

| Pillar | Format | Framework | Plattform |
|---|---|---|---|
| **Transformation** | Reels / TikTok Video 15-30s | BAB | Meta + TikTok |
| **Problem/Pain** | Static Image + Copy | PAS | Meta Feed |
| **Social Proof** | UGC Testimonial Video | Star-Story-Solution | TikTok + Meta |
| **Produkt-Demo** | Tutorial Video 30-45s | FAB | TikTok + Reels |
| **Urgency/Offer** | Static + Carousel | AIDA | Retargeting |

### Kill Rule
```
IF Spend > 3× Ziel-CPA (€120) AND Conversions = 0 → Pausieren
IF CTR sinkt >20% über 14 Tage → Creative erneuern
IF TikTok Frequency > 3 → Neues Creative einsetzen
IF Meta Frequency > 4 → Audience erweitern oder Creative wechseln
```

---

## 10. Wachstums-Szenario

| Monat | Budget | Ziel-ROAS | Erwarteter Umsatz |
|---|---|---|---|
| 1 | €1.500 | 1.5 | €2.250 |
| 2 | €1.500 | 2.0 | €3.000 |
| 3 | €2.000 | 2.5 | €5.000 |
| 6 | €3.000 | 3.5 | €10.500 |
| 12 | €5.000 | 4.0 | €20.000 |
