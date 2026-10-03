# Submission checklist

## Codices — Digital library of illuminated manuscripts

|  |  |
|---|---|
| **Course** | Humanities Informatics |
| **Academic year** | 2026/2027 |
| **Author** | YU DONG, student number 0001090264 |

---

## 0. The deadline you cannot miss

> **The site address must be sent to the lecturer by 12:00 on the day before
> the exam. Otherwise admission to the exam is denied.**

It is the only requirement of the course that, if missed, cancels out everything else. It must be treated as a deadline in its own right, not as the last step in a series.

**Early-submission rule adopted.** The address is sent at the moment of going live, not on the day of the deadline. The margin serves to cover the case in which the site does not work from a device other than the development one: if you find out the day before, there is time to fix it; if you find it out on the day itself, there is not.

### Reminder

|  |  |
|---|---|
| Exam date | ______________ |
| **Deadline for sending the address** | **______________ at 12:00** |
| Planned going-live date | ______________ |
| Address sent on | ______________ |

---

## 1. Before going live

### 1.1 Content

- [ ] The six manuscripts have a complete catalogue record
- [ ] The fifteen Dublin Core elements are filled in or justifiably absent
- [ ] The ready-made citation is present at the bottom of the record
- [ ] The licence is stated in the footer of every page
- [ ] The note on the sample nature of the data is **on the first screen** of the home page
- [ ] The placeholders `YU DONG`, `0001090264` and similar have been replaced
      on all the pages **and** in the three documents
- [ ] The last-updated date is correct
- [ ] The email address on the contacts page is the right one

### 1.2 Technical check

Run from the `site/` folder:

```bash
npx --yes html-validate@latest index.html collezione.html scheda.html metodo.html progetto.html
```

- [ ] The command ends without errors (`echo $?` returns `0`)
- [ ] The five pages open without errors in the browser console
- [ ] No link is broken (including internal links to anchors)
- [ ] All the images load

### 1.3 Manual test

It cannot be replaced by an automatic tool.

- [ ] **By keyboard**: every function is reached with only the Tab and Enter keys
- [ ] **By keyboard**: the menu closes with Esc and focus returns to the button
- [ ] **Dark theme**: everything can be read, no invisible text
- [ ] **Light theme**: same
- [ ] **At 320 px width**: no horizontal scrollbar
- [ ] **With JavaScript disabled**: all the content remains readable
- [ ] **On a second browser**: the appearance is consistent
- [ ] **On a real phone**, not just a simulated one
- [ ] The collection filter works: search, filter, reset
- [ ] The Enter key in the search field does not reload the page

### 1.4 Comprehension test

- [ ] A person outside the project looks at the home page for ten seconds and can say
      **what** the site is and **that the data are samples**

If the test fails, the problem is almost always in the kicker or the title, not
in the text that follows: whoever stops at the first seconds never reaches the rest.

---

## 2. Going live

- [ ] The site is published at a **stable** address (not temporary)
- [ ] The address does not contain session strings or temporary parameters
- [ ] The site is reachable **from a device other** than the development one
- [ ] The site is reachable **without being logged into your own account**
- [ ] The certificate is valid (the address starts with `https://`)
- [ ] The internal pages are reached by navigating from the main address

### 2.1 Backup copy

The site must be able to be shown **even without a network**, in case the
classroom connection does not work or the hosting service is down.

- [ ] A working copy of the files exists on local media (USB stick)
- [ ] The local copy has been opened with a local server and works

```bash
# To show the local copy during the interview
cd site && python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 3. Sending the address to the lecturer

### 3.1 What to write

A short message, with three elements. Nothing else is needed.

> Subject: Codices — address of the web resource
>
> Dear Professor,
>
> I am writing to inform you of the address of the web resource created for the course:
>
> `https://ADDRESS`
>
> It is a digital library of six illuminated manuscripts described with
> Dublin Core metadata; the data are samples and the site states this.
>
> I also submit the project plan, the communication plan and the site.
>
> Kind regards,
> YU DONG, student number 0001090264

- [ ] The message contains **the exact address**, copied and checked
- [ ] The address in the message was **opened** before pressing send
- [ ] The message was sent **before** the deadline, not at the last minute
- [ ] A copy of the sent message has been kept

### 3.2 Checking the address

Before sending, open the address in an **incognito window** of the browser. In
an incognito window there are no cookies or sessions: it is the closest thing to
what the lecturer will see.

- [ ] Opened in an incognito window: it works
- [ ] The first impression is the right one: it is clear what the site is

---

## 4. Material to bring to the interview

### 4.1 Documents

- [ ] Project plan
- [ ] Communication plan
- [ ] Preparation guide on HTML and CSS (for yourself, not for the lecturer)

### 4.2 What to be able to talk about

The interview consists of a discussion of the resource and questions on HTML and CSS.
The most likely questions concern the choices, not the definitions.

| Likely question | Where the answer is |
|-------------------|---------------------|
| Why did you choose these standards? | Project plan § 6.2 |
| Why did you not use a framework? | Project plan § 6.3, decision 1 |
| What happens if I disable JavaScript? | HTML/CSS guide, question 33 |
| Why are the data samples? | Project plan § 4.2, guide question 32 |
| How did you check accessibility? | Project plan § 12.3 and 12.4 |
| What was the most difficult defect? | Project plan § 12.4 |
| What is the difference between Flexbox and Grid? | HTML/CSS guide § 11.2 and 11.3 |
| What is specificity? | HTML/CSS guide § 8.2 |

### 4.3 The two defects to be able to talk about

They are worth preparing because they are the most convincing proof of having
understood your own code. Neither was visible by looking at the page.

1. **Invisible text in the dark theme.** A rule with too high specificity was
   overriding the colour of the secondary button. Fixed with `:not()`.
2. **Form without a submit button.** The filter worked anyway, but the Enter
   key produced no effect and the form did not satisfy WCAG criterion H32.
   Found by automatic validation, not by eye.

---

## 5. Final check, the evening before

- [ ] The address has been sent: yes / no
- [ ] Opening the address the site works
- [ ] The local copy works
- [ ] The documents are ready
- [ ] All the placeholders have been replaced
- [ ] You can explain why the data are samples
- [ ] You can talk about the two defects found and fixed

---

## 6. After the exam

- [ ] The site stays online: it is the proof of the work done
- [ ] The repository is public, if it does not contain personal data that cannot be shared
- [ ] Future developments are listed in the project plan (§ 15): if the
      project is of interest, you know where to start again
