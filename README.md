# Codices — Digital library of illuminated manuscripts

Project for the course **Humanities Informatics**
(academic year 2026/2027). Bibliographic reference: F. Tomasi, *Metodologie informatiche
per le discipline umanistiche*, Carocci, Roma, 2008.

---

## What it is

A small-scale digital library that describes six illuminated manuscripts with
normalised metadata (Dublin Core), accompanies them with TEI P5 transcriptions and makes
them publicly accessible through a static site.

The six items are **sample records**, declared as such on the site. The
metadata structure, the controlled vocabularies and the export formats are
instead real and applicable to an authentic collection.

---

## Repository structure

```
.
├── site/                        The web resource
│   ├── index.html               Home: presentation and featured records
│   ├── collezione.html          Catalogue with filters
│   ├── scheda.html              Full catalogue record
│   ├── metodo.html              Method, standards and accessibility statement
│   ├── progetto.html            Objectives, phases, licence, contacts
│   ├── css/style.css            Single stylesheet, in twelve sections
│   ├── js/main.js               Theme, menu and collection filter
│   └── assets/                  Vector illustrations and icon
│
├── docs/                        Project documentation
│   ├── 01-piano-di-progetto.md          Project plan (source)
│   ├── 01-piano-di-progetto.docx        Project plan (submission)
│   ├── 02-piano-di-comunicazione.md     Communication plan (source)
│   ├── 02-piano-di-comunicazione.docx   Communication plan (submission)
│   ├── 03-guida-html-css.md             Preparation guide (source)
│   ├── 03-guida-html-css.docx           Preparation guide (submission)
│   └── 04-checklist-consegna.md         Submission checklist
│
├── .github/workflows/deploy.yml Automatic publication on GitHub Pages
└── .gitignore
```

---

## How to view the site locally

The site is static: it requires neither compilation nor dependencies. It is enough to serve the
`site/` folder with any HTTP server.

```bash
cd site
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

> **Why not open the files by double-clicking.** Opening `index.html` as
> `file://`, the browser applies stricter security rules and some
> behaviours (in particular `localStorage` for the theme memory) may
> be blocked. A local server avoids the problem.

---

## How to put the site online

The resource **must be online**: the address must be sent to the lecturer by
12:00 on the day before the exam, otherwise admission is excluded.

Three routes are envisaged, all free. The first is already configured.

### Option A — GitHub Pages (requires a GitHub account)

The workflow is already in `.github/workflows/deploy.yml`.

1. Create an empty repository on GitHub.
2. Link it and upload the contents:

   ```bash
   git remote add origin git@github.com:UTENTE/NOME-REPOSITORY.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source → GitHub Actions**.
4. Wait for the action to complete in the **Actions** tab.
5. The address will be `https://UTENTE.github.io/NOME-REPOSITORY/`.

### Option B — Netlify or Cloudflare Pages (without the command line)

1. Log in to the service and choose "Add new site" → "Deploy manually".
2. Drag the **`site/` folder** into the upload window.
3. The address is assigned immediately; the subdomain can be customised.

This is the fastest route and does not require Git. It has one limitation: to update the
site you have to repeat the upload by hand.

### Option C — Any static hosting

The site has no dependencies. By uploading the contents of `site/` to any
web space (even a university space) it works without changes, provided
that the paths remain relative — which they already are.

---

## How to check the site before submission

```bash
cd site
npx --yes html-validate@latest index.html collezione.html scheda.html metodo.html progetto.html
```

The command must finish without errors. The complete list of checks is in
`docs/04-checklist-consegna.md`.

---

## Licence

- **Content** (texts, metadata, illustrations): CC BY 4.0
- **Code** (HTML, CSS, JavaScript): MIT licence

The dual licence is deliberate: the data are meant to circulate as widely as possible, the
code must be reusable even within projects with different licences.

---

## Note on the nature of the data

The six manuscripts described are **sample records**, built on real models
of Italian illuminated manuscripts but not corresponding to shelfmarks held
at a specific institution. The site declares this on the first screen of the home page.
