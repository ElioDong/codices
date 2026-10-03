# Project plan

## Codices — Digital library of illuminated manuscripts

|  |  |
|---|---|
| **Author** | YU DONG, student ID 0001090264 |
| **Course** | Humanities Informatics |
| **Academic year** | 2026/2027 |
| **Document version** | 1.0 |
| **Date** | 19 September 2026 |
| **Status** | Final |

---

## 1. Executive summary

The **Codices** project delivers a small-scale digital library that describes
six illuminated manuscripts with standardised metadata and makes them publicly
available through a static website.

The project stems from a concrete and recurring problem in the humanities:
the description of a cultural object is produced once and then rarely reused,
because it is written in a format that only those who produced it know how to
read. Codices addresses this problem by adopting open standards and separating
the data from their presentation.

The result is a five-page site, written entirely in HTML5 and CSS3 without
frameworks, compliant with the WCAG 2.1 level AA guidelines, accompanied by
Dublin Core metadata and a sample TEI P5 transcription.

The project lasted **eight weeks**, for a total of **62 hours** of individual
work and no monetary expenditure.

---

## 2. Context and rationale

### 2.1 The problem

Whoever describes a manuscript — a librarian, a philologist, a student — typically
produces a record that remains locked inside a proprietary catalogue. There are
three consequences:

1. **The data cannot be reused.** A European aggregator cannot harvest it unless
   someone writes a bespoke converter.
2. **The data does not age well.** If the software changes, the record becomes
   unreadable.
3. **The data is not accessible.** The record is designed for those who already
   know how to look for it, not for those who arrive from a search engine or a
   screen reader.

### 2.2 The project's response

Codices tests, on a reduced scale, a response to all three points: describe
little, but describe it well and with standards that outlive the software that
produced them. The decision to limit the project to six items is deliberate: the
project does not demonstrate the ability to handle large volumes, it demonstrates
the quality of a method.

### 2.3 Bibliographic reference

The project sits within the theoretical horizon set out in F. Tomasi,
*Metodologie informatiche per le discipline umanistiche*, Carocci, Rome, 2008.

---

## 3. Objectives

### 3.1 General objective

To deliver a small-scale digital library that describes six illuminated
manuscripts with standardised metadata and makes them accessible to anyone, on
any device, without depending on proprietary technologies.

### 3.2 Specific objectives

The objectives are formulated so as to be verifiable. For each one, the criterion
by which it is established whether it has been met is given.

| No. | Objective | Verification criterion | Outcome |
|----|-----------|---------------------|-------|
| O1 | Describe six manuscripts with metadata conforming to Dublin Core | Every record passes schema validation; the fifteen elements are present or justifiably absent | Achieved |
| O2 | Publish the site online by the deadline | URL reachable and communicated to the lecturer at least one day before the exam | Achieved |
| O3 | Achieve WCAG 2.1 AA compliance | Automated validation with the WCAG rules enabled, with no errors; manual keyboard check | Achieved |
| O4 | Ensure readability without JavaScript | With JavaScript disabled all content remains readable | Achieved |
| O5 | Keep the weight of every page below 200 KB | Direct measurement of the files, uncompressed and compressed | Achieved |

### 3.3 Result indicators

In addition to the specific objectives, the project set itself six result
indicators. All the values reported were **measured**, not estimated.

| Indicator | Expected threshold | Measured value |
|-----------|---------------|-----------------|
| Weight of the heaviest page (collection) | < 200 KB | **88.2 KB** uncompressed, 19.9 KB compressed |
| Total weight of the site | — | **152.6 KB** uncompressed, 38.7 KB compressed |
| Markup validation errors | 0 | **0** across five pages |
| Maximum number of HTTP requests per page | < 15 | **9** (collection page) |
| Minimum text contrast | ≥ 4.5:1 | **7.66:1** |
| Horizontal scrolling at 320 px width | None | **None** across five pages |

*Methodological note.* The weight was measured on the files with `gzip -9`, which
is the form in which they travel over the network. The contrast was calculated
with the relative luminance formula from the WCAG 2.1 recommendation on the
colour values actually computed by the browser, not on those written in the
stylesheet. The validation was carried out with `html-validate`, which applies the
rules of the W3C validator and the WCAG accessibility rules.

---

## 4. Project scope

### 4.1 What is included

- Context analysis and scope definition.
- Design of the data model and selection of the metadata standards.
- Design of the interface and the visual system.
- Production of five HTML5 pages with a dedicated CSS3 stylesheet.
- Writing of the content: descriptive records, method texts, compiled metadata.
- Accessibility and performance verification.
- Going live with the site and writing the project documentation.

### 4.2 What is excluded

Defining the scope is part of the work. The following are explicitly outside the
project:

- **The actual digitisation of authentic items.** The six records are examples,
  declared as such on the site.
- **Optical character recognition (OCR)** on the transcriptions.
- **Full-text search** in the TEI transcriptions.
- **User authentication** and any form of restricted area.
- **Online editorial collaboration** among multiple editors.
- **Dynamic catalogue management**: adding a manuscript requires editing the HTML
  by hand. This is a knowingly accepted limitation (§ 6.3).

### 4.3 Constraints

| Type | Constraint |
|------|---------|
| Time | Eight weeks, with a non-extendable deadline set by the lecturer's announcement |
| Financial | No monetary budget available |
| Technological | The site must work without frameworks and without a build step |
| Institutional | The URL must be communicated to the lecturer by 12:00 on the day before the exam |
| Regulatory | The content must be accessible according to WCAG 2.1 AA |

### 4.4 Assumptions

- The student has a computer with an Internet connection.
- The student has access to a free static hosting service.
- The starting knowledge of HTML and CSS is that provided by the course.
- The lecturer assesses the project in a single exam session.

---

## 5. Audience analysis

The project's audiences are analysed in detail in the *Communication plan*.
Only the summary relevant to work planning is given here.

| Audience | Main interest | What they must be able to do |
|----------|---------------------|--------------------------|
| Lecturer | Assess method and technical skills | Recognise the design choices behind the result |
| Students on the course | See a complete example | Understand how to set up their own project |
| Manuscript scholars | Consult the descriptive data | Read and cite the metadata |
| General public | Understand what they are looking at | Find their way without specialist knowledge |

---

## 6. Technical solution

### 6.1 Architecture

The site is **static**: five HTML files, one stylesheet, one JavaScript file and
seven vector assets. There is no database and no server-side application.

```
site/
├── index.html          Home: introduction and featured records
├── collezione.html     Catalogue with filters by title, century and support
├── scheda.html         Full catalogue record (ms. 001)
├── metodo.html         Method documentation and accessibility statement
├── progetto.html       Objectives, phases, licence and contacts
├── css/style.css       Single stylesheet, organised into twelve sections
├── js/main.js          Theme, menu and collection filter
└── assets/             Vector illustrations and site icon
```

### 6.2 Standards adopted

| Standard | Scope | Reason for the choice |
|----------|--------|---------------------|
| HTML5 | Structure | Native semantics, universal support |
| CSS3 | Presentation | Custom properties, grids, comparison functions |
| Dublin Core | Descriptive metadata | Minimum interoperability standard between digital libraries |
| TEI P5 | Transcriptions | Describes the nature of the text, not only its rendering |
| IIIF | Images | Comparison between items held in different institutions |
| WCAG 2.1 AA | Accessibility | Regulatory obligation and ethical requirement |
| OAIS | Preservation | Distinction between archival and dissemination package |

### 6.3 Architectural decisions and their rationale

**Decision 1 — No CSS framework.**
A framework would have sped up the first week and slowed down every week after
it: every customisation would have gone through overwriting someone else's styles.
With six pages the balance tips in favour of hand-written CSS. The breaking point
is estimated at around fifty records, beyond which repeating the header on every
page becomes a concrete risk of inconsistency and a static site generator becomes
worthwhile.

**Decision 2 — Data separated from presentation.**
The descriptive records are conceptually distinct from the HTML that displays them.
In the prototype this principle is only partly realised: the metadata lives in the
`data-*` attributes and in the tables, not in external JSON files. Full separation
is indicated as a future development (§ 12).

**Decision 3 — Progressive enhancement.**
The content is present in full in the HTML. The JavaScript only adds convenience.
This decision has a measurable cost: giving up on client-side filtering means that
without JavaScript the collection page shows all the records instead of a subset.
This is an acceptable degradation, because no content becomes inaccessible.

**Decision 4 — Dual licence.**
The content is released under CC BY 4.0, the code under the MIT licence. Data and
code pose different legal problems: the former want to circulate as widely as
possible, the latter must be reusable even within projects under different
licences.

---

## 7. Work breakdown structure (WBS)

```
1. Codices
├── 1.1 Initiation
│   ├── 1.1.1 Context analysis
│   ├── 1.1.2 Definition of objectives
│   └── 1.1.3 Scope definition
├── 1.2 Design
│   ├── 1.2.1 Data model
│   ├── 1.2.2 Selection of standards
│   ├── 1.2.3 Information architecture
│   └── 1.2.4 Visual system
├── 1.3 Implementation
│   ├── 1.3.1 HTML structure of the pages
│   ├── 1.3.2 CSS stylesheet
│   ├── 1.3.3 JavaScript behaviours
│   └── 1.3.4 Illustrations and icon
├── 1.4 Content
│   ├── 1.4.1 Manuscript records
│   ├── 1.4.2 Method texts
│   └── 1.4.3 Dublin Core metadata
├── 1.5 Verification
│   ├── 1.5.1 Markup validation
│   ├── 1.5.2 Accessibility verification
│   └── 1.5.3 Performance measurement
├── 1.6 Closure
│   ├── 1.6.1 Going live
│   ├── 1.6.2 Project documentation
│   └── 1.6.3 Communication of the URL
```

---

## 8. Schedule

### 8.1 Phase diagram

| Phase | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | Hours |
|------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|
| 1.1 Initiation | ██ |  |  |  |  |  |  |  | 6 |
| 1.2 Design |  | ██ | ██ |  |  |  |  |  | 16 |
| 1.3 Implementation |  |  |  | ██ | ██ |  |  |  | 18 |
| 1.4 Content |  |  |  |  | ██ | ██ |  |  | 10 |
| 1.5 Verification |  |  |  |  |  |  | ██ |  | 7 |
| 1.6 Closure |  |  |  |  |  |  |  | ██ | 5 |
| **Week total** | **6** | **8** | **8** | **9** | **9** | **5** | **7** | **5** | **62** |

### 8.2 Milestones

| Milestone | Week | Achievement criterion |
|-----------|:---------:|---------------------------|
| M1 — Scope frozen | 1 | Objectives and verification criteria approved |
| M2 — Data model defined | 2 | Complete Dublin Core schema and selected vocabularies |
| M3 — Visual prototype | 3 | Home and record rendered in HTML and CSS |
| M4 — Complete site | 5 | All five pages existing and navigable |
| M5 — Complete content | 6 | Six records and method texts written |
| M6 — Verification passed | 7 | No blocking accessibility errors |
| M7 — Submission | 8 | URL communicated to the lecturer |

### 8.3 Variance from the initial estimate

| Item | Initial estimate | Actual | Variance |
|------|:--------------:|:----------:|:-----------:|
| Total hours | 56 | 62 | +6 (+10.7%) |
| Of which: accessibility verification | 4 | 7 | **+3** |
| Of which: HTML and CSS implementation | 16 | 18 | +2 |
| Of which: content | 10 | 10 | 0 |
| Other items | 26 | 27 | +1 |

The variance is concentrated in a single item. Accessibility verification required
more work than expected on keyboard navigation: the drop-down menu on narrow
screens, in particular, did not return focus to the button when the Esc key was
pressed, leaving keyboard users without a way back. The defect was not visible with
the mouse and emerged only from the manual test.

**Lesson learned:** accessibility verification is not a final check phase, it is an
activity to be carried out while writing the code of an interactive component.
Postponing it to the seventh week means rewriting, not fixing.

---

## 9. Resources

### 9.1 Human resources

| Role | Person | Responsibility |
|-------|---------|----------------|
| Project manager | YU DONG | Planning, monitoring, communication |
| Information designer | YU DONG | Data model, information architecture |
| Front-end developer | YU DONG | HTML, CSS, JavaScript |
| Content editor | YU DONG | Records, texts, metadata |
| Verifier | YU DONG | Acceptance testing of accessibility, performance, validity |

The project is individual: all roles rest with the same person. The separation of
roles remains useful during verification, where it is necessary to deliberately
adopt the point of view of someone who did not write the code.

### 9.2 Material resources

| Tool | Function | Cost |
|-----------|----------|------:|
| Text editor | Writing the code | €0 |
| Browser with developer tools | Testing and diagnosis | €0 |
| `html-validate` | Markup validation and checking of the WCAG rules | €0 |
| WCAG luminance formula | Contrast calculation on the values computed by the browser | €0 |
| `gzip` | Measurement of the actual weight transmitted over the network | €0 |
| Git repository with static hosting | Version control and going live | €0 |
| **Total** |  | **€0** |

### 9.3 Budget

The project involves no monetary expenditure. The real cost is time: 62 hours of
individual work. Valuing the hour at €15 — an indicative rate for a curricular
internship — the opportunity cost of the project is **€930**.

---

## 10. Responsibility matrix

For an individual project the matrix is valuable above all as a reminder of the
points at which it is necessary to change perspective.

Key: **E** = executes, **D** = decides, **V** = verifies.

| Activity | Designer | Developer | Editor | Verifier |
|----------|:-----------:|:------------:|:---------:|:------------:|
| Definition of objectives | D |  |  |  |
| Data model | D, E |  |  | V |
| Information architecture | D, E |  |  |  |
| Visual system |  | D, E |  |  |
| HTML structure |  | D, E |  | V |
| CSS stylesheet |  | D, E |  | V |
| JavaScript behaviours |  | D, E |  | V |
| Writing the records |  |  | D, E |  |
| Compiling the metadata | D |  | E | V |
| Accessibility verification |  |  |  | D, E |
| Going live |  | E |  | V |

Note that verification is never assigned to whoever carried out the work: it is
the only rule of the matrix that the project imposed on itself without
exceptions.

---

## 11. Risk analysis

### 11.1 Risk register

Probability and impact are assessed on a scale from 1 to 5. Criticality is their
product.

| ID | Risk | Prob. | Imp. | Crit. | Strategy | Mitigation action |
|----|---------|:-----:|:----:|:-----:|-----------|----------------------|
| R1 | Missing the deadline for communicating the URL | 2 | 5 | **10** | Avoid | Going live brought forward to week 6, not 8 |
| R2 | The site does not work on the device on which the lecturer will open it | 3 | 4 | **12** | Reduce | Testing on three browsers and on a narrow-screen simulation |
| R3 | Loss of work due to technical failure | 2 | 5 | **10** | Transfer | Git repository with daily commit and external copy |
| R4 | Scope creep: addition of unplanned features | 4 | 3 | **12** | Reduce | Scope written and frozen at milestone M1 |
| R5 | Accessibility defects discovered too late | 3 | 4 | **12** | Reduce | Verification per component, not at the end of the project |
| R6 | Insufficient or superficial content | 3 | 3 | 9 | Reduce | Outline of the texts before writing the code |
| R7 | Dependence on a hosting service that changes its terms | 2 | 3 | 6 | Transfer | The site is static: it can be moved to any service |
| R8 | Illustrations unavailable due to copyright constraints | 3 | 2 | 6 | Avoid | Use of original vector illustrations, generated for the project |

### 11.2 Accepted risks

Two risks were assessed and accepted without mitigation:

- **No dynamic catalogue management.** Adding a manuscript requires editing the
  HTML. Accepted because the number of items is fixed at six and no growth is
  expected before the exam date.
- **No full-text search.** Accepted because the transcriptions are two and of
  limited length.

### 11.3 Risks that materialised

Risk **R5** did materialise: an accessibility defect in keyboard navigation
emerged in week 7 instead of during implementation, causing three hours of
additional work. The planned mitigation (verification per component) was not
applied early enough.

No other risk materialised.

---

## 12. Quality plan

### 12.1 Quality criteria

| Dimension | Criterion | Verification tool |
|-----------|----------|----------------------|
| Validity | Zero validation errors on all pages | `html-validate`, with the WCAG rules enabled |
| Accessibility | WCAG 2.1 AA compliance | Automated validation plus manual keyboard test |
| Performance | Weight of every page below 200 KB uncompressed | Direct measurement of the files, uncompressed and compressed |
| Code readability | Consistent indentation, comments in Italian, no `style` attribute in the HTML | Manual review |
| Visual consistency | All reusable values defined as custom properties | Review of the stylesheet |
| Data accuracy | The fifteen Dublin Core elements present or justifiably absent | Comparison with the schema |

### 12.2 Verification activities

| Activity | Timing | Owner |
|----------|---------|--------------|
| Markup validation | After each completed page | Verifier |
| Keyboard test | After each interactive component | Verifier |
| Contrast check | After the definition of the visual system | Verifier |
| Performance measurement | Before going live | Verifier |
| Cross-browser test | Before going live | Verifier |

### 12.3 Outcome of the verification

| Verification | Tool or method | Outcome |
|----------|--------------------|-------|
| Markup validity | `html-validate` with WCAG rules | Passed: **zero errors** across five pages, after the correction described below |
| Keyboard test | Manual navigation with the Tab and Enter keys alone | Passed after correction: the menu did not return focus when Esc was pressed |
| Search release | `html-validate`, rule `wcag/h32` | **Not passed on the first attempt**: the filter form had no submit button |
| Contrast | Calculation of the WCAG relative luminance on the values computed by the browser | Passed: minimum **7.66:1** against a threshold of 4.5:1 |
| Adaptability | Measurement of scrolling at 320, 768 and 1440 px | Passed: no horizontal scrolling on any page |
| Weight | Direct measurement of the files, uncompressed and with `gzip -9` | Passed: heaviest page 88.2 KB uncompressed, 19.9 KB compressed |

### 12.4 Defects found and fixed

Two defects emerged during verification and both are documented because they are
instructive: neither was visible by looking at the page.

**Defect 1 — Invisible text in the dark theme.** The secondary button had almost
black text on an almost black background. The cause was a rule with too high
specificity (`:root[data-tema="scuro"] .bottone`) that overrode the colour of the
secondary button. Fixed by narrowing the rule with `:not()`.
Identified by comparing the computed values with the expected ones, not by eye.

**Defect 2 — Form without a submit button.** The filter form had only a reset
button. The filter worked all the same while typing, but the Enter key produced no
effect and the form did not meet the WCAG H32 criterion. Fixed by adding a submit
button and a handler that cancels the actual submission, since there is no server
to send the data to.
Identified by the automated validation.

**What they have in common.** Both concern behaviour, not appearance. A visual
check of the page would never have revealed them.

---

## 13. Change management

### 13.1 Procedure

After the scope freeze (milestone M1), every change proposal follows this
procedure:

1. **Description** of the proposed change and of the need that motivates it.
2. **Impact assessment** on time, scope and quality.
3. **Decision**: accept, postpone to a future version, or reject.
4. **Recording** in the table below, even in the case of rejection.

### 13.2 Change register

| No. | Proposed change | Week | Estimated impact | Decision | Rationale |
|----|-------------------|:---------:|-----------------|-----------|-------------|
| C1 | Add full-text search | 4 | +12 hours | **Rejected** | Outside the scope; the cost-benefit ratio on two transcriptions is unfavourable |
| C2 | Add a second full catalogue record | 5 | +3 hours | **Rejected** | One record demonstrates the method as well as six; the cost is not justified |
| C3 | Add the dark theme | 5 | +4 hours | **Accepted** | Contained cost, high demonstrative value: it proves mastery of custom properties |
| C4 | Add the filter by writing support | 5 | +1 hour | **Accepted** | Natural extension of the filter already planned |
| C5 | Replace the text with an image in the main heading | 6 | +2 hours | **Rejected** | It worsens accessibility and performance without improving readability |

The accepted changes added 5 hours; the rejected changes would have added 17. The
actual total of 62 hours includes the former.

---

## 14. Acceptance criteria

The project is considered complete when all the following conditions hold.

### 14.1 Technical conditions

- [ ] All five pages respond with HTTP status 200
- [ ] No markup validation errors on any page
- [ ] No errors detected by the automated validation with WCAG rules
- [ ] Complete keyboard navigation on all pages
- [ ] No horizontal scrolling down to 320 px width
- [ ] Text contrast no lower than 4.5:1 in both themes
- [ ] Content readable with JavaScript disabled
- [ ] Contact form and external links working

### 14.2 Documentary conditions

- [ ] Project plan written
- [ ] Communication plan written
- [ ] Dublin Core metadata compiled for all six items
- [ ] Accessibility statement published on the site
- [ ] Licence indicated in the footer of every page

### 14.3 Submission conditions

- [ ] Site published at a stable URL
- [ ] URL verified from a device other than the development one
- [ ] URL communicated to the lecturer before 12:00 on the day before the exam
- [ ] Documentation submitted

---

## 15. Future developments

The project is complete, but the method allows for natural extensions. They are
listed in order of value-to-cost ratio.

| No. | Development | Estimated cost | Expected value |
|----|----------|:-------------:|---------------|
| S1 | Extract the records into JSON files conforming to the Dublin Core schema | 4 hours | Definitively separates data and presentation |
| S2 | Generate the HTML from those files with a static site generator | 6 hours | Makes growth beyond fifty records sustainable |
| S3 | Export the records in RDF/XML and publish them with OAI-PMH | 10 hours | Makes the collection harvestable by external aggregators |
| S4 | Replace the illustrations with real IIIF images | 8 hours | Turns the prototype into a genuinely usable service |
| S5 | Add full-text search in the TEI transcriptions | 12 hours | Useful only beyond twenty transcriptions |

---

## 16. Approval

|  |  |
|---|---|
| **Prepared by** | YU DONG |
| **Date** | 19 September 2026 |
| **Signature** | _______________________ |

---

### References

1. F. Tomasi, *Metodologie informatiche per le discipline umanistiche*, Carocci, Rome, 2008.
2. Dublin Core Metadata Initiative, *DCMI Metadata Terms*, 2020.
3. Text Encoding Initiative Consortium, *TEI P5: Guidelines for Electronic Text Encoding and Interchange*, version 4.6.0, 2024.
4. International Image Interoperability Framework Consortium, *IIIF Image API 3.0*, 2023.
5. W3C, *Web Content Accessibility Guidelines (WCAG) 2.1*, recommendation, 2018.
6. Consultative Committee for Space Data Systems, *Reference Model for an Open Archival Information System (OAIS)*, ISO 14721, 2012.
7. Project Management Institute, *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*, 7th edition, 2021.
