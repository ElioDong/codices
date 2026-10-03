/* ==========================================================================
   CODICES — main script
   --------------------------------------------------------------------------
   The site works entirely without this file. It collects only
   three conveniences:
     1. storage of the light/dark theme chosen by the user;
     2. opening and closing of the navigation menu on narrow screens;
     3. filtering of the collection by title, century and support.
   None of these functions is essential for reading the content.
   ========================================================================== */

(function () {
  'use strict';

  /* ======================================================================
     1. LIGHT / DARK THEME
     The initial theme is already applied by an inline script in the <head>,
     which avoids the flash of the wrong color. Here only the manual
     toggling and its storage are handled.
     ====================================================================== */

  var bottoneTema = document.getElementById('bottone-tema');

  if (bottoneTema) {
    var radice = document.documentElement;

    var leggiTema = function () {
      return radice.getAttribute('data-tema') || 'chiaro';
    };

    /* The button text describes the action that will be performed, not the
       current state: it is the clearest convention for those using a screen
       reader. aria-pressed, on the other hand, communicates the state of the dark theme. */
    var aggiornaEtichetta = function () {
      var scuro = leggiTema() === 'scuro';
      bottoneTema.setAttribute('aria-label', scuro ? 'Switch to light theme' : 'Switch to dark theme');
      bottoneTema.setAttribute('aria-pressed', String(scuro));

      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', scuro ? '#14110d' : '#fbf7ef');
      }
    };

    bottoneTema.addEventListener('click', function () {
      var nuovo = leggiTema() === 'scuro' ? 'chiaro' : 'scuro';
      radice.setAttribute('data-tema', nuovo);
      try {
        localStorage.setItem('codices-tema', nuovo);
      } catch (e) {
        /* localStorage unavailable (private browsing, cookies
           blocked): the theme remains valid for the current page. */
      }
      aggiornaEtichetta();
    });

    /* If the user has never chosen explicitly, the site follows the
       system preference even when it changes while the page is open. */
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var alCambioSistema = function (evento) {
      var sceltaSalvata = null;
      try {
        sceltaSalvata = localStorage.getItem('codices-tema');
      } catch (e) {}
      if (!sceltaSalvata) {
        radice.setAttribute('data-tema', evento.matches ? 'scuro' : 'chiaro');
        aggiornaEtichetta();
      }
    };

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', alCambioSistema);
    } else if (typeof media.addListener === 'function') {
      media.addListener(alCambioSistema);   /* older browsers */
    }

    aggiornaEtichetta();
  }


  /* ======================================================================
     2. NAVIGATION MENU ON NARROW SCREENS
     The menu is a simple list that on wide screens is always visible and
     on narrow screens is shown on request. The state is written in the
     data-aperto attribute, which the CSS uses as a selector.
     ====================================================================== */

  var bottoneMenu = document.getElementById('bottone-menu');
  var nav = document.getElementById('nav-principale');

  if (bottoneMenu && nav) {
    var impostaMenu = function (aperto) {
      nav.setAttribute('data-aperto', aperto ? 'true' : 'false');
      bottoneMenu.setAttribute('aria-expanded', String(aperto));
      bottoneMenu.setAttribute('aria-label', aperto ? 'Close the navigation menu'
                                                    : 'Open the navigation menu');
    };

    bottoneMenu.addEventListener('click', function () {
      impostaMenu(nav.getAttribute('data-aperto') !== 'true');
    });

    /* The Esc key closes the menu and returns the focus to the button:
       without this, anyone navigating by keyboard would remain trapped in the menu. */
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.getAttribute('data-aperto') === 'true') {
        impostaMenu(false);
        bottoneMenu.focus();
      }
    });

    /* A click outside the menu closes it, as is expected from any
       drop-down menu. */
    document.addEventListener('click', function (evento) {
      if (nav.getAttribute('data-aperto') === 'true' &&
          !nav.contains(evento.target) &&
          !bottoneMenu.contains(evento.target)) {
        impostaMenu(false);
      }
    });

    /* Returning to a wide screen, the menu becomes part of the fixed layout again:
       the state is reset so as not to leave an inconsistent attribute. */
    var mediaLargo = window.matchMedia('(min-width: 46rem)');
    var alCambioLarghezza = function (evento) {
      if (evento.matches) {
        impostaMenu(false);
      }
    };

    if (typeof mediaLargo.addEventListener === 'function') {
      mediaLargo.addEventListener('change', alCambioLarghezza);
    } else if (typeof mediaLargo.addListener === 'function') {
      mediaLargo.addListener(alCambioLarghezza);
    }

    impostaMenu(false);
  }


  /* ======================================================================
     3. COLLECTION FILTER
     The filter acts on the data-* attributes of the records already present
     in the HTML. Without JavaScript all the records remain visible: the
     filter function is lost, not access to the catalogue.
     ====================================================================== */

  var filtri = document.getElementById('filtri');

  if (filtri) {
    var campoTesto     = document.getElementById('filtro-testo');
    var campoSecolo    = document.getElementById('filtro-secolo');
    var campoSupporto  = document.getElementById('filtro-supporto');
    var conteggio      = document.getElementById('conteggio');
    var nessunRisultato = document.getElementById('nessun-risultato');
    var schede         = Array.prototype.slice.call(
                           document.querySelectorAll('#elenco-schede .scheda')
                         );

    /* Normalises the text for the search: lower case and without accents, so
       that "citta" finds "Città": the search ignores accents. */
    var normalizza = function (testo) {
      return (testo || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };

    var applicaFiltri = function () {
      var testo    = normalizza(campoTesto.value.trim());
      var secolo   = campoSecolo.value;
      var supporto = campoSupporto.value;
      var visibili = 0;

      schede.forEach(function (scheda) {
        var titoloScheda    = normalizza(scheda.getAttribute('data-titolo'));
        var secoloScheda    = scheda.getAttribute('data-secolo') || '';
        var supportoScheda  = scheda.getAttribute('data-supporto') || '';

        var corrisponde =
          (testo === ''    || titoloScheda.indexOf(testo) !== -1) &&
          (secolo === ''   || secoloScheda === secolo) &&
          (supporto === '' || supportoScheda === supporto);

        scheda.hidden = !corrisponde;
        if (corrisponde) { visibili++; }
      });

      /* The message is meant to be read by a screen reader: it states
         the number, not just "results updated". */
      if (visibili === 0) {
        conteggio.textContent = 'No manuscript matches the selected criteria.';
      } else if (visibili === schede.length) {
        conteggio.textContent = 'Showing all ' + schede.length + ' manuscripts in the collection.';
      } else if (visibili === 1) {
        /* The singular reads "1 manuscript", not "manuscripts": this separate
           branch keeps the message grammatical. */
        conteggio.textContent = 'Showing 1 manuscript of ' + schede.length + '.';
      } else {
        conteggio.textContent = 'Showing ' + visibili + ' manuscripts of ' + schede.length + '.';
      }

      nessunRisultato.hidden = visibili !== 0;
    };

    /* 'input' on the text field reacts to every keystroke; 'change' on the
       drop-down menus is sufficient and avoids needless recalculations. */
    campoTesto.addEventListener('input', applicaFiltri);
    campoSecolo.addEventListener('change', applicaFiltri);
    campoSupporto.addEventListener('change', applicaFiltri);

    /* The form has a submit button to satisfy WCAG criterion H32 and
       to make the Enter key work. The actual submission is
       cancelled: there is no server to send the data to, the filter works
       entirely in the browser. Without preventDefault the page would reload,
       appending the parameters to the address and losing the theme state. */
    filtri.addEventListener('submit', function (evento) {
      evento.preventDefault();
      applicaFiltri();
    });

    /* The reset button is of type reset: the fields are restored
       on their own, but this must be followed by a recalculation. */
    document.getElementById('azzera-filtri').addEventListener('click', function () {
      window.requestAnimationFrame(applicaFiltri);
    });

    applicaFiltri();
  }

})();
