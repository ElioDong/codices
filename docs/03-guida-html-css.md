# Preparation Guide — HTML and CSS

## Study material for the exam interview

|  |  |
|---|---|
| **Author** | YU DONG, student ID 0001090264 |
| **Course** | Humanities Informatics |
| **Academic year** | 2026/2027 |
| **Reference** | F. Tomasi, *Metodologie informatiche per le discipline umanistiche*, Carocci, Roma, 2008 |

---

## How to use this guide

The exam consists of two parts: the discussion of the web resource you have built
and a series of questions on HTML and CSS. This guide is built around the second
part, but it is not an abstract manual: every concept is illustrated **with the
code actually written in the Codices site**. Studying from your own canvas is more
effective than studying from generic examples, because during the interview you
will be able to say "I used it here, for this reason".

The guide is organised in three parts:

- **Part I — HTML**: structure, semantics, validity.
- **Part II — CSS**: cascade, selectors, box model, layout, responsive.
- **Part III — Questions and answers**: thirty questions with the expected answer.

---

# Part I — HTML

## 1. What HTML is and what it is not

HTML (*HyperText Markup Language*) is a **markup** language, not a programming
language. It contains no variables, loops or conditions. Its only task is to
describe the **structure** and the **meaning** of a document.

The point is often misunderstood. HTML does not say "this text is large and red",
it says "this text is a first-level heading". The decision about how a first-level
heading should look belongs to CSS. This separation between **content** and
**presentation** is the founding principle of the web.

In the Codices site the separation is respected rigorously: **there is not a single
`style` attribute in the HTML files**. All presentation is in the stylesheet
`css/style.css`.

## 2. Structure of an HTML5 document

```html
<!DOCTYPE html>
<html lang="en" data-tema="chiaro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Collection — Codices</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- visible content -->
</body>
</html>
```

### What each element does

| Element | Function | If it is missing |
|----------|----------|----------|
| `<!DOCTYPE html>` | Declares that the document is HTML5 | The browser enters *quirks mode* and interprets CSS unpredictably |
| `lang="en"` | Declares the language of the content | Screen readers use the wrong pronunciation; hyphenation does not work |
| `<meta charset="UTF-8">` | Declares the character encoding | Accented letters and special characters appear corrupted |
| `viewport` | Adapts the page to mobile device screens | The phone shows the page shrunk as on a monitor |
| `<title>` | Title of the browser tab and of search results | Mandatory; it is the first accessibility criterion (WCAG 2.4.2) |
| `<link rel="stylesheet">` | Links the external stylesheet | The page appears unstyled |

### Why `UTF-8` is indispensable

Accented characters make the difference visible. A letter such as *é* takes up one
byte in a single-byte encoding and two in UTF-8. If the document is written in
UTF-8 but the browser interprets it as `ISO-8859-1`, that letter is corrupted into
two wrong characters (`Ã©`). The problem can be avoided only by declaring the
encoding explicitly.

## 3. Semantic HTML

### 3.1 The principle

Semantic elements describe what a portion of content **is**, not how it should
appear. A `<div>` means nothing; a `<nav>` means "this is a navigation area".

```html
<!-- Not semantic: five divs, no meaning -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">...</div>
<div class="footer">...</div>

<!-- Semantic: the structure is machine-readable -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>
<main>...</main>
<footer>...</footer>
```

The two versions look identical on screen. They differ in three ways that matter:

1. **A screen reader** can jump straight to the main content instead of re-reading
   the whole menu on every page.
2. **A search engine** understands which parts of the page are content and which
   are frame.
3. **Whoever reads the code** understands the structure without having to deduce it
   from the class names.

### 3.2 Elements used in Codices

| Element | Where | Why |
|----------|------|--------|
| `<header>` | Header of every page | Recognised as *banner* by assistive technologies |
| `<nav>` | Main menu, breadcrumbs | Recognised as a navigation area |
| `<main>` | Content of every page | Unique per page; allows skipping the frame |
| `<footer>` | Footer | Recognised as *contentinfo* |
| `<section>` | Thematic sections | Groups content under its own heading |
| `<article>` | Manuscript records | Self-contained content, distributable on its own |
| `<figure>` and `<figcaption>` | Image with caption | Binds the caption to the image |
| `<table>` with `<caption>` | Metadata, material data | Genuine tabular data, not page layout |
| `<blockquote>` and `<cite>` | Quotations | Distinguishes the quotation from its attribution |
| `<time datetime="2026-09-19">` | Update date | Machine-readable format |
| `<ol>` for steps | Workflow | The order is meaningful |

### 3.3 A concrete case: `<article>` versus `<section>`

The rule of thumb: if the content would make sense **on its own**, outside the
context of the page — as in a *feed* or a search result — it is an `<article>`.
Otherwise it is a `<section>`.

In the site, the record for the manuscript `De civitate Dei` is an `<article>`: it
would make sense read on its own. The "Featured" section that contains it is a
`<section>`: on its own it would mean nothing.

## 4. Attributes

### 4.1 Global attributes

They apply to any element.

| Attribute | Function | Example in the site |
|-----------|----------|------------------|
| `class` | Assigns one or more classes, reusable | `class="scheda scheda--pubblicata"` |
| `id` | Identifies an element uniquely within the page | `id="elenco-schede"` |
| `lang` | Language of a portion of text | `lang="lat"` on a Latin quotation |
| `hidden` | Hides the element | `hidden` on the "no results" message |
| `data-*` | Custom data, readable by JavaScript | `data-secolo="12"` |

**Difference between `class` and `id`.** An `id` is unique within the page and has
greater specificity in CSS. A `class` is reusable. The rule is to use `class` for
styling and `id` only for anchors and for links from JavaScript.

### 4.2 Accessibility attributes (ARIA)

ARIA (*Accessible Rich Internet Applications*) is a set of attributes that fills
the gaps in HTML when native elements are not enough.

**The first rule of ARIA is not to use ARIA.** If a native HTML element exists that
does the same thing, you use that one. `<button>` is already keyboard-accessible
and already announced correctly; a `<div role="button">` does not receive focus and
has to be rebuilt by hand.

ARIA is used in the site only where it is genuinely needed:

| Attribute | Where | What it communicates |
|-----------|------|-------------------|
| `aria-label` | Theme button, menu button | A name that the element does not have visually |
| `aria-current="page"` | Menu item of the current page | "This is the page you are on" |
| `aria-expanded` | Menu button | "The menu is open or closed" |
| `aria-controls` | Menu button | "The button controls that element" |
| `aria-labelledby` | Sections | "The heading of this section is that element" |
| `aria-live="polite"` | Results count | "Announce this text when it changes" |
| `aria-hidden="true"` | Decorative icons | "Ignore this element" |

### 4.3 The alternative text of images

```html
<!-- Content image: describes what is seen -->
<img class="scheda__immagine" src="assets/codice-01.svg"
     alt="Illuminated page with a historiated initial in gold and red on a blue ground">

<!-- Decorative image: empty alt, it is not announced -->
<svg class="marchio__simbolo" aria-hidden="true">…</svg>
```

Three mistakes to avoid:

1. **Omitting `alt`.** The screen reader announces the file name.
2. **Writing `alt=""` on a content image.** The information disappears.
3. **Starting with "Image of…".** The screen reader already says so.

## 5. Forms

```html
<form class="filtri" id="filtri" role="search" aria-label="Filter the collection">
  <div class="campo">
    <label for="filtro-testo">Search by title</label>
    <input type="search" id="filtro-testo" name="q" autocomplete="off">
  </div>

  <div class="campo">
    <label for="filtro-secolo">Century</label>
    <select id="filtro-secolo" name="secolo">
      <option value="">All centuries</option>
      <option value="12">12th century</option>
    </select>
  </div>
</form>
```

### The link between `label` and field

The `for` attribute of the `<label>` must contain **exactly** the `id` of the
field. This link produces three effects:

1. Clicking the label text moves the cursor into the field.
2. The screen reader announces the label when the field receives focus.
3. The clickable area widens, which is useful on touch screens.

A disconnected label is the most common accessibility defect in forms, and it is
the first one an automated tool flags.

### Types of `input`

| Type | Use | Advantage |
|------|-----|-----------|
| `text` | Generic text | Normal keyboard |
| `search` | Search | Native clear button |
| `email` | Email | Keyboard with the at sign on mobile; native validation |
| `date` | Date | Native calendar picker |
| `checkbox` | Multiple choice | — |
| `radio` | Single choice | — |
| `submit` / `reset` | Submit / reset | `reset` restores the initial values |

Using the right type is more efficient than writing the validation by hand: the
browser provides it for free.

## 6. Validity of the document

A valid HTML document respects the rules of the language. Three rules generate most
errors:

1. **Elements close in the reverse order to the one in which they open.**
   `<p><em>testo</em></p>` is correct; `<p><em>testo</p></em>` is not.
2. **Elements do not overlap.** You cannot close an outer element before an inner
   one.
3. **Nesting is respected.** An `<a>` cannot contain another `<a>`; a `<button>`
   cannot contain another `<button>`.

**Practical consequence in the site.** In the collection grid, the card is entirely
clickable but does not contain a link wrapping the whole thing: the link is only on
the title, and it is a shadow (`::after`) that extends its area. Nesting interactive
elements is forbidden by HTML and is a problem for those who navigate by keyboard,
because the focus would become ambiguous.

---

# Part II — CSS

## 7. How CSS is applied

There are three ways, in order of preference.

| Way | Syntax | Judgement |
|------|----------|----------|
| **External stylesheet** | `<link rel="stylesheet" href="css/style.css">` | **Preferable**: reusable, cached, separates content and presentation |
| Internal stylesheet | `<style>…</style>` in the `<head>` | Acceptable only for a few rules specific to one page |
| `style` attribute | `<p style="color:red">` | **To be avoided**: not reusable, hard to maintain, hard to override |

Codices uses an external stylesheet. There is **a single exception** and it is
deliberate: the script that applies the theme is inline in the `<head>`, but it is
JavaScript, not CSS, and its presence is justified (§ 12).

## 8. The cascade and specificity

### 8.1 What the cascade is

When several rules apply to the same element, the browser has to decide which one
wins. The order of decision is:

1. **Importance**: rules with `!important` take precedence.
2. **Specificity**: the more specific rule wins.
3. **Order of appearance**: with equal specificity, the last one declared wins.

### 8.2 How specificity is calculated

Specificity is a triple of values, compared from left to right.

| Component | Weight | Example |
|-----------|:----:|---------|
| Identifiers | (1,0,0) | `#elenco-schede` |
| Classes, attributes, pseudo-classes | (0,1,0) | `.scheda`, `[aria-current]`, `:hover` |
| Elements and pseudo-elements | (0,0,1) | `article`, `::before` |

Concrete examples from the site's stylesheet:

| Selector | Specificity | Where |
|-----------|:-----------:|------|
| `.nav__voce` | (0,1,0) | Menu item |
| `.nav__voce[aria-current="page"]` | (0,2,0) | Active item |
| `.nav__voce:hover` | (0,2,0) | Item under the pointer |
| `.tabella-metadati th` | (0,1,1) | Table header |
| `:root[data-tema="scuro"] .bottone` | (0,3,0) | Button in dark theme |

### 8.3 A real error made in this project

It is worth recounting because it is instructive.

In the dark theme the accent colour becomes a light pink. The white text of the
primary button no longer had sufficient contrast, so this rule had been added:

```css
:root[data-tema="scuro"] .bottone {
  color: #1a1113;   /* dark text on a light pink background */
}
```

The problem: the rule has specificity (0,3,0) and beats `.bottone--secondario`,
which has (0,1,0). The secondary button has a transparent background, so it ended
up with almost-black text on an almost-black background: **invisible**.

The diagnosis was not immediate because the defect appeared only in the dark theme
and only on the second button. It was identified by comparing the computed values
with the expected ones, not by looking at the page.

The fix excludes the secondary button from the rule:

```css
:root[data-tema="scuro"] .bottone:not(.bottone--secondario) {
  color: #1a1113;
}
```

**Lesson.** Raising specificity to solve a local problem is a solution that creates
problems elsewhere. The `:not()` pseudo-class makes it possible to narrow a rule
without having to increase its weight.

### 8.4 Inheritance

Some properties are passed down from parent to child, others are not.

| Are inherited | Are not inherited |
|--------------|------------------|
| `color` | `margin` |
| `font-family` | `padding` |
| `font-size` | `border` |
| `line-height` | `background-color` |
| `text-align` | `width` |

Why the distinction makes sense: it makes sense that the text colour is passed down
(the text of the children must be readable like that of the parent), it does not
make sense that the margin is passed down (otherwise every nested element would add
space).

You can force the behaviour with the keywords `inherit`, `initial` and `unset`. In
the site, `.bottone` declares `font-family: inherit` because `<button>` and
`<input>` elements do **not** inherit the typeface from the `body`: without this
line the buttons would use the system default typeface.

## 9. Selectors

| Type | Syntax | Example in the site |
|------|----------|------------------|
| Type | `elemento` | `h1`, `table` |
| Class | `.nome` | `.scheda` |
| ID | `#nome` | `#contenuto-principale` |
| Descendant | `a b` | `.passi p` (any `p` inside `.passi`) |
| Direct child | `a > b` | `.prosa > p` (direct children only) |
| Attribute | `[attr="val"]` | `[aria-current="page"]` |
| Pseudo-class | `:nome` | `:hover`, `:focus-visible` |
| Pseudo-element | `::nome` | `::before`, `::after` |
| Negation | `:not(x)` | `.bottone:not(.bottone--secondario)` |

### 9.1 Descendant versus direct child

```css
.prosa p   { }   /* all p inside .prosa, at any depth */
.prosa > p { }   /* only the direct child p of .prosa */
```

`.prosa > p` is used in the site to enlarge only the top-level paragraphs of a
block of prose, without touching those nested in lists or boxes.

### 9.2 Useful pseudo-classes

| Pseudo-class | Meaning |
|---------------|-------------|
| `:hover` | The pointer is over the element |
| `:focus` | The element has focus |
| `:focus-visible` | The element has focus **and it is appropriate to show it** |
| `:first-child` / `:last-child` | First / last child |
| `:nth-child(n)` | The nth child |
| `:not(x)` | Everything except those that match `x` |

**`:focus` versus `:focus-visible`.** The first is triggered even when you click
with the mouse, producing a ring around a button that was just pressed: visually
annoying. The second is triggered only when focus arrives from the keyboard, which
is the case in which the ring is genuinely needed. Codices uses `:focus-visible`.

### 9.3 Pseudo-elements

| Pseudo-element | Function | Example in the site |
|-----------------|----------|------------------|
| `::before` | Inserts content before | The number of the numbered steps |
| `::after` | Inserts content after | The arrow of links, the bar of separators |
| `::marker` | Styles the bullet of lists | `li::marker { color: … }` |
| `::selection` | Selected text | — |

Pseudo-elements are **decorative**: the content they generate does not exist in the
DOM and is not read by screen readers. This is why the breadcrumb separators are
inserted with `::before` and not written in the HTML.

## 10. The box model

### 10.1 The four zones

Every element is a rectangle made up of four concentric zones:

```
┌─────────────────────────────────────────┐
│ MARGIN                                  │
│  ┌───────────────────────────────────┐  │
│  │ BORDER                            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ PADDING                     │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │      CONTENT          │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

| Zone | What it is | Properties |
|------|-----------|-----------|
| Content | Text or image | `width`, `height` |
| Padding | **Internal** space, between content and border | `padding` |
| Border | Outline line | `border` |
| Margin | **External** space, between the element and its neighbours | `margin` |

### 10.2 `box-sizing: border-box`

By default, `width: 300px` indicates the width of the **content alone**: adding
padding and border, the actual width becomes larger.

```css
/* Default: the actual width is 300 + 20 + 20 + 2 + 2 = 344 px */
.riquadro { width: 300px; padding: 20px; border: 1px solid; }

/* With border-box: the actual width is exactly 300 px */
.riquadro { box-sizing: border-box; width: 300px; padding: 20px; border: 1px solid; }
```

Codices applies `border-box` to **everything**:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

It is the first rule of the stylesheet and it is current practice: it makes the
calculation of dimensions predictable.

### 10.3 Margin collapsing

Two adjacent vertical margins merge into one, equal to the larger of the two. It is
not a defect but a historical rule of CSS. You avoid it with `padding`, with
`overflow: auto` on the container, or by using `gap` in grids — which is the
solution adopted throughout the site.

## 11. Layout

### 11.1 Normal flow

Without instructions, elements arrange themselves according to the **normal flow**:
block elements one below the other, inline ones side by side. It is the starting
point, and it is often enough.

### 11.2 Flexbox

Suited to arrangement **along a single axis**, when the size of the children is not
known in advance.

```css
.intestazione__interno {
  display: flex;
  align-items: center;              /* centring on the cross axis */
  justify-content: space-between;   /* distribution on the main axis */
  gap: var(--sp-4);
}
```

| Property | Effect |
|-----------|---------|
| `display: flex` | Activates the flexible context on the container |
| `flex-direction` | Chooses the main axis: `row` (default) or `column` |
| `justify-content` | Distributes along the main axis |
| `align-items` | Aligns along the cross axis |
| `gap` | Space between children, without margins |
| `flex-wrap` | Allows wrapping |
| `flex-grow` | How much a child grows relative to the others |

In the site Flexbox is used for the header, the button groups, the card footers and
the navigation.

### 11.3 Grid

Suited to arrangement **in two dimensions**.

```css
.griglia {
  display: grid;
  gap: var(--sp-5);
  grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
}
```

This single line deserves to be explained piece by piece, because it replaces what
once required three media queries.

| Part | Meaning |
|-------|-------------|
| `repeat()` | Repeats the column definition |
| `auto-fit` | Creates as many columns as fit, and widens them to fill the space |
| `minmax(a, b)` | Each column is at least `a` and at most `b` wide |
| `min(17rem, 100%)` | The minimum width **or** 100% of the container, if the latter is smaller |
| `1fr` | The maximum is a fraction of the available space |

The `min(17rem, 100%)` is the detail that solves the problem: without it, on a
screen narrower than 17rem the column would be wider than the container and the
page would scroll horizontally.

**Flexbox or Grid?** If the arrangement is along a single direction, Flexbox. If you
need control over rows and columns together, Grid. When in doubt, Grid for the page
structure, Flexbox for the components within it.

### 11.4 Positioning

| Value | Behaviour | Use in the site |
|--------|---------------|--------------|
| `static` | Default, follows the flow | Almost everything |
| `relative` | Shifted relative to its position, without leaving the flow | Card container, to anchor the link's shadow |
| `absolute` | Removed from the flow, positioned relative to the positioned ancestor | Dropdown menu on narrow screens, card shadow |
| `fixed` | Fixed relative to the window | Not used |
| `sticky` | Behaves like `relative` until it reaches a threshold | Header of every page |

The header is `position: sticky; top: 0`: it stays visible during scrolling. It is
a usability choice — the menu is always reachable — that has a cost: internal
anchors would need `scroll-padding-top`, and that is exactly what the stylesheet
declares.

### 11.5 Stacking

When two elements overlap, `z-index` decides, and it works only on positioned
elements. The site uses only three values, far apart from each other and chosen to
leave room for intermediate levels:

| Value | Element | Why |
|:------:|----------|--------|
| `50` | Fixed header | It must sit above the content that scrolls beneath it |
| `100` | "Skip to content" link | It must sit above the header: it is the first focusable element |
| `1` | Link shadow in the card | It brings the clickable area above the rest of the card |

Numbers that are far apart and documented, not random values: inserting a level
between 50 and 100 does not require renumbering anything.

## 12. Units of measurement and values

### 12.1 Absolute and relative units

| Unit | Type | Characteristic |
|-------|------|----------------|
| `px` | Absolute | Does not change with the user's preferences |
| `rem` | Relative | Root of the document (the `font-size` of `<html>`) |
| `em` | Relative | `font-size` of the current element |
| `%` | Relative | Relative to the container |
| `vw` / `vh` | Relative | 1% of the width / height of the window |
| `ch` | Relative | Width of the character "0" |
| `fr` | Relative | Fraction of the available space in Grid |
| `dvh` | Relative | Dynamic height of the window, excluding browser chrome |

**Why `rem` and not `px` for text.** If the user has enlarged the browser's default
font for reasons of eyesight, a measurement in `px` ignores that preference; one in
`rem` respects it. It is an accessibility requirement (WCAG 1.4.4).

### 12.2 The `clamp()` function

```css
h1 {
  font-size: clamp(2.25rem, 1.6rem + 3vw, 4rem);
}
```

Three values: **minimum**, **ideal**, **maximum**. The text grows with the window
but does not fall below 2.25 rem nor exceed 4 rem. In a single line you get what
once required a media query.

In the site all typographic sizes use `clamp()`. It is the reason why the stylesheet
has so few media queries.

### 12.3 Colour units

| Notation | Example | Use |
|-----------|---------|-----|
| Hexadecimal | `#8c2f39` | The most widespread |
| `rgb()` | `rgb(140, 47, 57)` | When calculated values are needed |
| `rgba()` | `rgba(28, 23, 18, 0.09)` | With transparency |
| `color-mix()` | `color-mix(in srgb, var(--colore-accento) 5%, var(--colore-superficie))` | Mixes two colours |

`color-mix()` is used in the site to generate variants without having to define
them by hand: instead of choosing a fifth colour for the background of an alert,
you mix the accent at 5% with the background. If the accent changes, the variant
updates on its own.

**Contrast is not an aesthetic matter.** WCAG requires a minimum ratio of 4.5:1 for
normal text and 3:1 for large text. In the site the minimum measured ratio is
7.66:1.

## 13. Custom properties

```css
:root {
  --colore-accento: #8c2f39;
  --sp-4: 1rem;
}

.bottone {
  background-color: var(--colore-accento);
  padding: var(--sp-3) var(--sp-5);
}
```

Custom properties (also called CSS variables) are the mechanism that makes the
stylesheet maintainable. In the site they serve three functions:

1. **Single source of truth.** The spacing scale is defined once only. Changing
   `--sp-5` updates every corresponding space in the site.
2. **Theme.** The dark theme is obtained by redefining the values on
   `:root[data-tema="scuro"]`, without touching a single component rule.
3. **Documentation.** The names declare the intention: `--colore-tenue` says more
   than `#6f6555`.

**Difference from preprocessor variables.** Sass variables are substituted at
compile time; custom properties exist in the browser, are readable and modifiable by
JavaScript, and **take part in the cascade**, so they have a scope (`:root` or a
specific element).

## 14. Responsive design

### 14.1 The three pillars

1. **Fluid grid.** Widths are in percentages or in `fr`, not in pixels.
2. **Flexible images.** `img { max-width: 100%; height: auto; }` prevents an image
   from overflowing its container.
3. **Media queries.** Different rules for different conditions.

### 14.2 Mobile first

It means writing the style for the narrow screen first and then adding
`@media (min-width: …)` for large screens. The advantage is that the simple case —
one column — is the default style, and every media query adds complexity instead of
removing it.

### 14.3 The site's media queries

The stylesheet contains **six** of them, and it is a direct consequence of the use
of `clamp()` and `auto-fit`: without those, adaptation to width alone would require
three times as many.

| Condition | What changes | Type |
|------------|-----------------|------|
| `max-width: 46rem` | The hamburger button appears; the menu becomes a dropdown | Width |
| `max-width: 34rem` | The metadata tables become block lists; the index switches to a single column | Width |
| `min-width: 64rem` | Increases the vertical breathing room of the sections | Width |
| `prefers-reduced-motion: reduce` | Animations and transitions are reduced to zero | Preference |
| `prefers-contrast: more` | Muted colours are replaced with full-contrast colours | Preference |
| `print` | Navigation, filters and buttons are hidden; links show their own address | Medium |

**Watch out for a distinction that is often got wrong.** The light and dark theme is
**not** handled by a CSS media query. The system preference `prefers-color-scheme`
is read by JavaScript, which writes the `data-tema` attribute on the `<html>`
element; the CSS reacts to that attribute. The reason is that the user must be able
to **force** a theme different from the system one, which a media query alone does
not allow.

### 14.4 User preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Those who have set "reduce animations" in their operating system suffer from
vestibular or attention disorders: animations cause them physical discomfort.
Respecting this preference is an accessibility requirement, not a kindness.

## 15. The dark theme

### 15.1 The mechanism

```css
:root[data-tema="scuro"] {
  --colore-pergamena: #14110d;
  --colore-inchiostro: #f2ece1;
  /* … */
}
```

Redefining the custom properties on `:root` with a different attribute changes the
entire site without rewriting any component rule. It is the practical demonstration
of the value of CSS variables.

### 15.2 The flash of the wrong colour and how it is avoided

If the theme were applied by a script at the bottom of the page, the browser would
first draw the light version and then change it: you would see a white flash. The
solution is a script **inline in the `<head>`**, which is executed before the first
paint:

```html
<script>
  (function () {
    try {
      var salvato = localStorage.getItem('codices-tema');
      var preferito = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'scuro' : 'chiaro';
      document.documentElement.setAttribute('data-tema', salvato || preferito);
    } catch (e) {}
  })();
</script>
```

The `try / catch` block is there for browsers in private browsing, where
`localStorage` is available but raises an exception if used.

**This is the only point in the site where HTML, CSS and JavaScript have to
coordinate closely**, and that is why it is worth knowing how to recount it.

## 16. Accessibility in CSS

| WCAG Requirement | How it is met |
|----------------|------------------|
| 1.4.1 Use of colour | The active state is indicated not only by colour but also by an underline |
| 1.4.3 Minimum contrast | Minimum measured ratio 7.66:1, against a threshold of 4.5:1 |
| 1.4.4 Resize text | Measurements in `rem`: the text enlarges to 200% without loss |
| 1.4.10 Reflow | No horizontal scrolling down to 320 px |
| 1.4.12 Text spacing | Line heights and spacings withstand the increase without overlapping |
| 2.4.7 Focus visible | `:focus-visible` with a 3 px outline and 2 px offset |
| 2.3.3 Animation | Respect for `prefers-reduced-motion` |

### The "skip to content" link

```css
.salta-al-contenuto {
  position: absolute;
  top: -100%;       /* off-screen */
}
.salta-al-contenuto:focus {
  top: 0;           /* visible when it receives focus */
}
```

This link is invisible to those who use a mouse and indispensable to those who use
the keyboard: it allows skipping the menu, which would otherwise have to be
traversed on every page with seven presses of the Tab key.

---

# Part III — Questions and answers

## A. HTML

**1. What is the difference between HTML and CSS?**
HTML describes the structure and meaning of the content; CSS describes its
presentation. They are separate because the same content must be able to be rendered
on different media — screen, print, screen reader — without being rewritten.

**2. What does `<!DOCTYPE html>` do?**
It declares that the document is HTML5 and makes the browser use standard mode
instead of compatibility mode, in which CSS would be interpreted with unpredictable
historical rules.

**3. Why is `lang="en"` important?**
Because screen readers choose the pronunciation based on that attribute and search
engines use it for ranking. It is also a WCAG 3.1.1 requirement.

**4. Difference between `<section>` and `<article>`?**
`<article>` contains something that would make sense even on its own, outside the
context of the page. `<section>` groups content that makes sense only there.

**5. Why are `<div>` and `<span>` called neutral elements?**
Because they carry no meaning: they serve only as containers to apply styles or
group elements. They should be used only when no semantic element is suitable.

**6. What does "semantic HTML" mean and why is it worth it?**
It means choosing the element that describes the meaning of the content. It is worth
it for three reasons: assistive technologies understand the structure, search engines
distinguish the content from the frame, whoever reads the code understands it without
deducing it.

**7. Difference between `class` and `id`?**
`id` is unique within the page, has specificity (1,0,0) and is used for anchors and
for JavaScript. `class` is reusable, has specificity (0,1,0) and is the normal tool
for styling.

**8. What is the `alt` attribute and when is the empty value used?**
`alt` provides the textual description of an image. The empty value (`alt=""`) is
used only for purely decorative images, which must be ignored by assistive
technologies.

**9. Why should the text of a link not be "click here"?**
Because those who use a screen reader can browse the list of links out of context:
"click here" says nothing, "Explore the collection" does.

**10. What is the `for` attribute of `<label>` for?**
For linking the label to the field, using the field's `id` as its value. The link
causes focus to move to the field when the label is clicked and the screen reader to
announce the right label.

**11. What is ARIA and what is its first rule?**
ARIA is a set of attributes that add accessibility information. The first rule is not
to use it if a native HTML element exists that does the same thing: a `<button>` is
already accessible, a `<div role="button">` has to be rebuilt by hand.

**12. Why can you not nest two interactive elements?**
Because it is forbidden by HTML and because the focus becomes ambiguous: those who
navigate by keyboard would not know which of the two elements they are activating. In
the site, the card is entirely clickable but the link is only on the title, extended
with a pseudo-element.

**13. What is the difference between `<ol>` and `<ul>`?**
`<ol>` is an ordered list, where the sequence is meaningful; `<ul>` is not. The
four-phase workflow uses `<ol>` because the order matters.

**14. What does `<meta name="viewport">` do?**
It prevents the mobile device from showing the page shrunk as on a desktop monitor,
adapting its width to that of the screen.

**15. Why declare `<meta charset="UTF-8">`?**
Because without the declaration the browser may interpret the bytes with the wrong
encoding, and accented letters appear corrupted.

## B. CSS

**16. What is specificity and how is it calculated?**
It is the weight of a selector, expressed as a triple: identifiers, classes (plus
attributes and pseudo-classes), elements (plus pseudo-elements). It is compared from
left to right. With equal specificity the last rule declared wins.

**17. What is the box model?**
It is the way CSS calculates the dimensions of an element: content, padding, border
and margin, from the innermost to the outermost.

**18. What does `box-sizing: border-box` do and why is it used almost always?**
It makes `width` include padding and border. Without it, adding padding widens the
element beyond the declared width, making the calculation unpredictable.

**19. Difference between `padding` and `margin`?**
`padding` is the internal space, between content and border, and is part of the
element's background. `margin` is the external space, between the element and its
neighbours, and is always transparent.

**20. When is Flexbox used and when Grid?**
Flexbox for arrangement along a single direction, Grid when you need control over
rows and columns together.

**21. Explain `grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr))`.**
It creates as many columns as fit in the container, each at least 17 rem wide or
100% of the container if the latter is narrower, and widens them in equal parts to
fill the space. The `min(17rem, 100%)` avoids horizontal scrolling on very narrow
screens.

**22. What does `position: sticky` do?**
The element behaves like `relative` until it reaches the threshold indicated by
`top`, then it fixes. The site's header uses it to stay visible during scrolling.

**23. Why use `rem` instead of `px`?**
Because `rem` respects the text enlargement set by the user in the browser, while
`px` ignores it. It is an accessibility requirement.

**24. What does `clamp()` do?**
It returns a value between a minimum and a maximum, interpolating between the two
based on the ideal value. It is used to make typographic sizes fluid without media
queries.

**25. What are custom properties and how do they differ from Sass variables?**
They are variables defined in CSS with `--nome` and used with `var(--nome)`. Unlike
Sass variables, they exist in the browser, take part in the cascade, have a scope and
can be modified by JavaScript.

**26. What is `:focus-visible` for and how does it differ from `:focus`?**
`:focus-visible` activates the style only when focus arrives from the keyboard, that
is, when the indicator is useful. `:focus` is also triggered by a mouse click,
showing an annoying outline.

**27. Why is the site's dropdown menu not made with `display: none` managed only by CSS?**
Because the open state is driven by JavaScript through the `data-aperto` attribute,
and the CSS selects it with an attribute selector. This way the state is declared in
the HTML, is readable by developer tools and can be announced to assistive
technologies with `aria-expanded`.

**28. What happens if two vertical margins touch?**
They merge into one, equal to the larger of the two. It is margin collapsing. In the
site it is avoided by using `gap` in grids and flexible containers.

**29. How do you write a comment in CSS and what is it for?**
`/* like this */`. In the site comments explain the **why** of a choice, not what the
rule does: that is read from the code.

**30. What is a media query and how many does the site use?**
It is a rule that applies only if a condition is true, typically the width of the
window. The site uses six: three on width, two on user preferences and one for print.
The number is low because `clamp()` and `auto-fit` solve most of the adaptation
without them.

---

## C. Questions about the resource you built

These questions concern the project and require a reasoned answer, not a definition.

**31. Why did you choose not to use a CSS framework?**
Because with six pages the cost of a framework — overriding other people's styles at
every customisation — outweighs the benefit. The estimated breaking point is around
fifty records, beyond which repeating the header on every page becomes a risk of
inconsistency and a static site generator is preferable.

**32. Why is your data sample data?**
Because digitising authentic manuscripts requires access to the originals and
equipment that the project does not have. The metadata structure, the controlled
vocabularies and the export formats are, however, real and applicable to an authentic
collection. The site declares this in the first screen of the home page.

**33. What happens if I disable JavaScript?**
Three conveniences are lost: the collection filter, the memory of the chosen theme
and the dropdown menu on narrow screens. No content becomes inaccessible, because
everything is present in the HTML.

**34. Why does the record page use a table for the metadata and not `div`s?**
Because the metadata are genuine tabular data: label and value pairs with a structured
relationship. A table communicates that relationship to assistive technologies, which
can announce "label: title, value: De civitate Dei".

**35. What was the hardest defect to find and how did you solve it?**
The dark theme made the text of the secondary button invisible. The cause was a rule
with too-high specificity that overrode the colour. I found it by comparing the
computed values with the expected ones, not by looking at the page: by eye it simply
looked as if the button had no text.

---

## Glossary

| Term | Meaning |
|---------|-------------|
| **ARIA** | Set of attributes that add accessibility information |
| **Cascade** | Mechanism by which the browser decides which rule to apply |
| **Custom property** | Variable defined in CSS with `--nome` |
| **DOM** | Tree representation of the document, used by JavaScript |
| **Dublin Core** | Standard of fifteen descriptive elements for digital resources |
| **Flexbox** | One-dimensional layout model |
| **Grid** | Two-dimensional layout model |
| **IIIF** | Standard for the interoperability of digital images |
| **Media query** | CSS rule conditioned by a device characteristic |
| **Pseudo-class** | State of an element, written with `:` |
| **Pseudo-element** | Part of an element, written with `::` |
| **Responsive** | Ability to adapt to screens of different sizes |
| **Specificity** | Weight of a selector in the cascade |
| **TEI** | XML standard for the encoding of texts |
| **WCAG** | International guidelines for the accessibility of web content |

---

## References

1. F. Tomasi, *Metodologie informatiche per le discipline umanistiche*, Carocci, Roma, 2008.
2. W3C, *HTML Living Standard*, https://html.spec.whatwg.org/
3. W3C, *CSS Snapshot 2023*, https://www.w3.org/TR/css-2023/
4. W3C, *Web Content Accessibility Guidelines (WCAG) 2.1*, 2018.
5. MDN Web Docs, *CSS: Cascading Style Sheets*, https://developer.mozilla.org/
