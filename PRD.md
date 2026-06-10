# PRD: Landing Page E-commerce "THE ARCHEMIST"

## 1. Project Overview & Tech Stack
- **Progetto:** Landing page per brand di profumazione d'ambiente premium (lusso intelligente, sostenibilità, innovazione italiana).
- **Obiettivo:** Pagina vetrina/educativa che converta verso la scelta dei prodotti.
- **Tech Stack Requisito:** HTML5 semantico, CSS3 (usando CSS Variables) e Vanilla JavaScript. Nessun framework (No React, No Tailwind), in quanto il codice dovrà essere facilmente convertibile in sezioni `.liquid` per Shopify.
- **Assets:** Non generare immagini esterne. Usa placeholder locali chiari (es. `<img src="./assets/hero-bg.mp4" alt="Hero Video">`) per foto e video.

## 2. Design System & Typography
- **Font Principale:** Montserrat (da importare via Google Fonts).
- **Stile Tipografico:** Minimalista, elegante. **Tassativo: divieto assoluto di usare emoji.**
- **Palette Corporate (CSS Variables da impostare):**
  - `--primary-dark`: #473728 (RGB 71, 55, 40)
  - `--secondary-beige`: #A8977E (RGB 168, 151, 126)
  - `--bg-color`: Sfondo pulito/bianco naturale.
- **Palette Fragranze (Accent Colors):**
  - O1. Animapura: #00A3CC
  - O2. Esperide: #F28B2D
  - O3. Noor: #E62D39
  - O4. Kiyomi: #84C6A0
  - O5. Nayeli: #A7A2C2
  - O6. Joy: #E35499
  - O7. Aurum: #C5AB00

## 3. UI/UX Global Rules
- **Bottoni (Hover Effect):** Sfondo sfumato orizzontale elegante usando la palette corporate, testo in Montserrat Bold/SemiBold maiuscolo e spaziato (letter-spacing).
- **Responsive:** Approccio mobile-first.
- **Modulari:** Scrivi il codice dividendo idealmente CSS e JS per sezioni, facilitando la futura migrazione su Shopify.

## 4. Page Architecture (Top to Bottom)

### 4.1. Navbar & Hero Section
- **Navbar:** Sticky, minimalista.
- **Hero Background:** Video in loop e autoplay a tutto schermo (`<video autoplay loop muted playsinline>`).
- **Hero Content (allineato a sinistra):** 
  - H1: "THE ARCHEMIST è una rivoluzione gentile."
  - Sottotitolo: "Una fiala da 35ml che sostituisce flaconi da 250ml. Pura alchimia italiana racchiusa in uno spazio minimo, con un impatto massimo."
  - CTA Button.

### 4.2. Manifesto
- **Layout:** Testo grande e centrato, molto negative space.
- **Typography:** Gioco di contrasti dinamici usando la famiglia Montserrat (es. mescolare pesi Black maiuscoli con Light corsivi per parole chiave come "alchimia").
- **CTA:** Bottone centrato sotto il testo.

### 4.3. Features (Vantaggi)
- **Layout:** Griglia a 3 colonne (1 colonna su mobile).
- **Contenuto per colonna:** 
  1. Purezza Olfattiva inalterata.
  2. Sicurezza e Benessere.
  3. Sostenibilità (-80% impatto ambientale).
- **Design:** Icona "line art" sottile ed elegante a sinistra del titolo e del paragrafo descrittivo in ogni colonna.

### 4.4. Le 7 Essenze (Tab Interattiva)
- **Layout:** Sezione interattiva gestita con Vanilla JS.
- **Design:** Elenco/menu testuale laterale o superiore con i nomi delle 7 fragranze.
- **Interazione:** Al click su una fragranza, l'area visiva cambia senza ricaricare la pagina aggiornando:
  1. Immagine della fragranza (`fragrance-[nome].jpg`).
  2. Descrizione e note olfattive (Testa, Cuore, Fondo).
  3. Il colore dell'interfaccia/dettagli della sezione (usando la "Palette Fragranze" dichiarata nel Design System).

### 4.5. I 3 Prodotti
- **Layout:** Griglia con 3 product cards.
- **Prodotti:** Refill (19,90€), Kit Spray (49,90€), Kit Bastoncini (49,90€).
- **CTA:** Pulsante di intermezzo (es. "Scopri" o "Scegli l'essenza") invece dell'Add to Cart diretto.

### 4.6. Come Funziona (Il Rituale)
- **Layout:** Split screen (2 colonne).
- **Colonna Sinistra:** Elenco testuale di 4 step numerati (Prepara, Versa, Diffondi, Trasforma).
- **Colonna Destra:** Immagine/Video dimostrativo del gesto (placeholder `rituale-gesto.mp4`).

### 4.7. FAQ & Footer
- **FAQ:** Modulo ad accordion (tendina) espandibile in Vanilla JS con le domande frequenti.
- **Footer:** Informazioni legali, iscrizione newsletter, link utili.