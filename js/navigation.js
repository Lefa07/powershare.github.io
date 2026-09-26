/* ============================================================
   PowerShare — navigation.js

   Shared user navigation, theme persistence, language preferences,
   back navigation, sheets, tabs, filters, password toggles,
   steppers and payment methods.

   Admin pages are intentionally excluded from theme/language
   changes.
   ============================================================ */

(function () {

  const THEME_KEY = 'ps_theme';
  const LANGUAGE_KEY = 'ps_language';

  // ============================================================
  // PAGE DETECTION
  // ============================================================

  function isAdminPage() {
    return !!document.querySelector('.admin-sidebar') ||
      /admin-dashboard|inventory|customers|reports|business-settings/.test(
        window.location.pathname
      );
  }

  // ============================================================
  // THEME
  // ============================================================

  function applyTheme(theme) {

    if (isAdminPage()) {
      return;
    }

    const root = document.documentElement;
    const body = document.body;

    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    body.classList.toggle('dark-mode', isDark);

    localStorage.setItem(
      THEME_KEY,
      isDark ? 'dark' : 'light'
    );

    const toggle = document.querySelector(
      '#dark-mode-toggle, [data-dark-mode-toggle]'
    );

    if (toggle) {

      if (
        toggle.type === 'checkbox' ||
        toggle.type === 'radio'
      ) {
        toggle.checked = isDark;
      }

      toggle.setAttribute(
        'aria-pressed',
        String(isDark)
      );
    }
  }


  function initTheme() {

    if (isAdminPage()) {
      return;
    }

    const savedTheme =
      localStorage.getItem(THEME_KEY) || 'light';

    applyTheme(savedTheme);

    const toggle = document.querySelector(
      '#dark-mode-toggle, [data-dark-mode-toggle]'
    );

    if (!toggle) {
      return;
    }

    /*
     * Checkbox / switch
     */
    toggle.addEventListener('change', function () {

      if (
        this.type === 'checkbox' ||
        this.type === 'radio'
      ) {
        applyTheme(
          this.checked ? 'dark' : 'light'
        );
      }

    });

    /*
     * Normal button / clickable element
     */
    toggle.addEventListener('click', function () {

      if (
        this.type !== 'checkbox' &&
        this.type !== 'radio'
      ) {

        const current =
          document.documentElement.classList.contains('dark');

        applyTheme(
          current ? 'light' : 'dark'
        );
      }

    });
  }


  // ============================================================
  // LANGUAGE
  // ============================================================

  const TRANSLATIONS = {

    nso: {

      // Navigation
      'Home': 'Gae',
      'Batteries': 'Dibetri',
      'Rentals': 'Dikhiro',
      'My Rentals': 'Dikhiro tša ka',
      'Notifications': 'Ditsebišo',
      'Profile': 'Profaele',
      'Settings': 'Dipeakanyo',
      'About': 'Ka ga rena',
      'Support': 'Thekgo',

      // Home
      'Good morning': 'Thobela',
      'Good afternoon': 'Thobela',
      'Good evening': 'Thobela',
      'Search EcoFlow batteries...':
        'Nyaka dibetri tša EcoFlow...',
      'Quick actions': 'Ditiro tša ka pela',
      'Rent now': 'Hira bjale',
      'Return': 'Bušetša',
      'Featured batteries':
        'Dibetri tše di kgethilwego',
      'See all': 'Bona ka moka',
      'Promotions': 'Dikabelo',
      'Nearby pickup locations':
        'Mafelo a kgauswi a go tšea',
      'View map': 'Bona mmapa',

      // Catalogue
      'All': 'Ka moka',
      'Compact': 'E nyenyane',
      'Portable': 'E rwalwa',
      'Heavy Duty': 'Ya mošomo o boima',
      'Filter batteries': 'Hlatholla dibetri',
      'Pickup location': 'Lefelo la go tšea',
      'Any hub': 'Seteišene sefe goba sefe',
      'Price range': 'Mellwane ya ditheko',
      'Any price': 'Theko efe goba efe',
      'Under R100/day':
        'Ka tlase ga R100/letšatši',
      'R100 – R250/day':
        'R100 – R250/letšatši',
      'Over R250/day':
        'Ka godimo ga R250/letšatši',
      'Only show available now':
        'Bontšha tšeo di lego gona gona bjale',
      'Apply filters': 'Diriša dihlarollo',
      'Available': 'E gona',
      'Available now': 'E gona gona bjale',
      'Unavailable': 'Ga e gona',
      'View & book': 'Bona gomme o hire',
      'View Details': 'Bona dintlha',
      'Search': 'Nyaka',
      'No batteries available':
        'Ga go na dibetri tšeo di hwetšagalago',

      // Battery details
      'Battery details': 'Dintlha tša betri',
      'Capacity': 'Bokgoni',
      'Runtime': 'Nako ya go šoma',
      'Daily rate': 'Tefelo ya letšatši',
      'Status': 'Boemo',
      'Book now': 'Hira bjale',
      'Battery': 'Betri',

      // Booking
      'Booking': 'Peeletšo',
      'Choose a battery': 'Kgetha betri',
      'Choose a Battery': 'Kgetha betri',
      'Rental details': 'Dintlha tša khiro',
      'Set rental details': 'Beakanya dintlha tša khiro',
      'Rental dates': 'Matšatši a khiro',
      'Pickup date': 'Letšatši la go tšea',
      'Return date': 'Letšatši la go bušetša',
      'Pickup or delivery': 'Go tšea goba go romelwa',
      'Pickup': 'Go tšea',
      'Delivery': 'Go romelwa',
      'Delivery address': 'Aterese ya go romelwa',
      'Quantity': 'Palo',
      'Number of batteries': 'Palo ya dibetri',
      'Price summary': 'Kakaretšo ya theko',
      'Continue': 'Tšwela pele',
      'Continue to payment': 'Tšwela pele go tefo',
      'Back': 'Morago',
      'Confirm': 'Kgonthiša',
      'Booking total': 'Palomoka ya peeletšo',

      // Payment
      'Payment': 'Tefo',
      'Payment method': 'Mokgwa wa tefo',
      'Card payment': 'Tefo ka karata',
      'Card details': 'Dintlha tša karata',
      'Card number': 'Nomoro ya karata',
      'Expiry': 'Letšatši la go fela',
      'CVC': 'CVC',
      'EFT': 'EFT',
      'Cash on pickup': 'Tšhelete ge o tšea',
      'Pay now': 'Lefa bjale',

      // Confirmation
      'Booking confirmed!':
        'Peeletšo e kgonthišitšwe!',
      'Booking Confirmed':
        'Peeletšo e kgonthišitšwe',
      'View my rentals': 'Bona dikhiro tša ka',
      'Back to home': 'Boela gae',
      'Total': 'Palomoka',
      'Pending approval': 'E letetše kgonthišetšo',

      // Rentals
      'Rental agreement': 'Tumelelano ya khiro',
      'Booking number': 'Nomoro ya peeletšo',
      'Return by': 'Bušetša ka',
      'Total paid': 'Palomoka yeo e lefelwago',
      'Deposit': 'Tšhelete ya peeletšo',
      'Battery information': 'Tshedimošo ya betri',
      'Pickup hub': 'Seteišene sa go tšea',
      'Extend rental': 'Oketša nako ya khiro',
      'Return battery': 'Bušetša betri',

      // Return
      'Return checklist':
        'Lenaneo la go hlahloba ge o bušetša',
      'Charging cable included':
        'Thapo ya go tjhaja e gona',
      'Carry case included':
        'Sekhwama sa go rwala se gona',
      'Battery is clean and dry':
        'Betri e hlwekile ebile e omile',
      'Battery powers on normally':
        'Betri e a bulega ka tshwanelo',
      'Condition': 'Boemo',
      'Good condition': 'Boemo bjo bobotse',
      'Minor wear': 'Go senyega ganyenyane',
      'Damaged': 'E senyegile',
      'Submit return':
        'Romela tshedimošo ya go bušetša',

      // Login
      'Welcome back': 'Re a go amogela gape',
      'Log in': 'Tsena',
      'Email': 'Imeile',
      'Password': 'Phasewete',
      'Forgot password?':
        'O lebetše phasewete?',
      'Sign up': 'Ngwadiša',
      'Create account': 'Hlama akhaonto',
      'First name': 'Leina la mathomo',
      'Last name': 'Sefane',
      'Phone': 'Mogala',
      'Confirm password': 'Kgonthiša phasewete',

      // Profile
      'Edit profile': 'Lokiša profaele',
      'Rental history': 'Histori ya dikhiro',
      'Total rentals': 'Palomoka ya dikhiro',
      'Outstanding balance':
        'Tšhelete ye e sa lefelwago',
      'Personal details': 'Dintlha tša botho',
      'Address': 'Aterese',
      'Member since': 'Setho go tloga ka',
      'Customer support': 'Thekgo ya bareki',

      // Support
      'Customer Support': 'Thekgo ya Bareki',
      'Chat with us': 'Boledišana le rena',
      'Call us': 'Re founele',
      'Report a problem': 'Bega bothata',
      'Frequently asked questions':
        'Dipotšišo tšeo di botšišwago gantši',
      'What went wrong?': 'Go senyegile eng?',
      'Submit report': 'Romela pego',

      // Notifications
      'No notifications': 'Ga go na ditsebišo',
      'You are all caught up.':
        'O bone ditsebišo ka moka.',

      // Settings
      'Appearance': 'Ponagalo',
      'Dark mode': 'Mokgwa wa leswiswi',
      'Preferences': 'Dipeakanyo',
      'Language': 'Leleme',
      'English': 'Seisimane',
      'Afrikaans': 'SeAfrikaans',
      'isiXhosa': 'isiXhosa',
      'isiZulu': 'isiZulu',
      'Sepedi': 'Sepedi',
      'Push notifications': 'Ditsebišo tša push',
      'Email updates': 'Dintlafatšo tša imeile',
      'Privacy Policy': 'Pholisi ya sephiri',
      'Terms of Service': 'Melao ya tirelo',

      // General
      'Save': 'Boloka',
      'Cancel': 'Khansela',
      'Close': 'Tswalela',
      'Delete': 'Phumola',
      'Edit': 'Lokiša',
      'Success': 'Katlego',
      'Error': 'Phošo',
      'Loading...': 'E a hlahlela...',
      'Loading…': 'E a hlahlela...',
      'Price': 'Theko',
      'Date': 'Letšatši',
      'Time': 'Nako'
    }
  };


  function translatePage(language) {

    if (isAdminPage()) {
      return;
    }

    if (language === 'en') {
      return;
    }

    const dictionary = TRANSLATIONS[language];

    if (!dictionary) {
      return;
    }

    document
      .querySelectorAll('[data-i18n]')
      .forEach(element => {

        const key = element.dataset.i18n;

        if (dictionary[key]) {
          element.textContent = dictionary[key];
        }
      });

    document
      .querySelectorAll('[data-i18n-placeholder]')
      .forEach(element => {

        const key = element.dataset.i18nPlaceholder;

        if (dictionary[key]) {
          element.placeholder = dictionary[key];
        }
      });

    document
      .querySelectorAll('[data-i18n-title]')
      .forEach(element => {

        const key = element.dataset.i18nTitle;

        if (dictionary[key]) {
          element.title = dictionary[key];
        }
      });
  }


  function initLanguage() {

    if (isAdminPage()) {
      return;
    }

    const selector = document.querySelector(
      '#language-select, [data-language-select]'
    );

    const savedLanguage =
      localStorage.getItem(LANGUAGE_KEY) || 'en';

    if (!selector) {
      if (savedLanguage !== 'en') {
        translatePage(savedLanguage);
      }

      return;
    }

    /*
     * Make sure the selector reflects the saved language.
     */
    if (
      [...selector.options].some(
        option => option.value === savedLanguage
      )
    ) {
      selector.value = savedLanguage;
    }

    selector.addEventListener('change', function () {

      const language = this.value || 'en';

      localStorage.setItem(
        LANGUAGE_KEY,
        language
      );

      if (language === 'en') {

        /*
         * Reloading restores the original English HTML.
         */
        window.location.reload();

        return;
      }

      translatePage(language);
    });

    if (savedLanguage !== 'en') {
      translatePage(savedLanguage);
    }
  }


  // ============================================================
  // BACK BUTTON
  // ============================================================

  function initBackButtons() {

    document.addEventListener('click', function (event) {

      const button = event.target.closest(
        '[data-back], [data-back-button], .back-button, .btn-back'
      );

      if (!button) {
        return;
      }

      /*
       * Prevent links from jumping to "#".
       */
      event.preventDefault();

      /*
       * If a specific destination was supplied,
       * use it first.
       */
      const destination =
        button.dataset.back ||
        button.dataset.href;

      if (destination) {
        window.location.href = destination;
        return;
      }

      /*
       * Otherwise use browser history.
       */
      if (window.history.length > 1) {
        window.history.back();
        return;
      }

      /*
       * Final fallback.
       */
      window.location.href = 'home.html';
    });
  }


  // ============================================================
  // SHEETS / MODALS
  // ============================================================
/* ---------- Bottom sheets / overlays ----------
   Supports both:
   [data-open-sheet="id"]
   [data-sheet-open="id"]

   And both:
   [data-close-sheet]
   [data-sheet-close]
------------------------------------------------ */

function initSheets() {

  /* ================================
     OPEN SHEETS
  ================================= */

  document
    .querySelectorAll(
      '[data-open-sheet], [data-sheet-open]'
    )
    .forEach(trigger => {

      trigger.addEventListener(
        'click',
        function (event) {

          event.preventDefault();

          const sheetId =
            this.getAttribute('data-open-sheet') ||
            this.getAttribute('data-sheet-open');

          if (!sheetId) {
            return;
          }

          const sheet =
            document.getElementById(sheetId);

          if (!sheet) {
            console.warn(
              `PowerShare: sheet "${sheetId}" not found.`
            );

            return;
          }

          sheet.classList.add('open');

          sheet.setAttribute(
            'aria-hidden',
            'false'
          );

        }
      );

    });


  /* ================================
     CLOSE BUTTONS
  ================================= */

  document
    .querySelectorAll(
      '[data-close-sheet], [data-sheet-close]'
    )
    .forEach(button => {

      button.addEventListener(
        'click',
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          const overlay =
            this.closest('.overlay');

          if (overlay) {

            overlay.classList.remove('open');

            overlay.setAttribute(
              'aria-hidden',
              'true'
            );

          }

        }
      );

    });


  /* ================================
     CLICK OUTSIDE SHEET
  ================================= */

  document
    .querySelectorAll('.overlay')
    .forEach(overlay => {

      overlay.addEventListener(
        'click',
        function (event) {

          if (event.target === overlay) {

            overlay.classList.remove(
              'open'
            );

            overlay.setAttribute(
              'aria-hidden',
              'true'
            );

          }

        }
      );

    });


  /* ================================
     ESCAPE KEY
  ================================= */

  document.addEventListener(
    'keydown',
    function (event) {

      if (event.key !== 'Escape') {
        return;
      }

      document
        .querySelectorAll(
          '.overlay.open'
        )
        .forEach(overlay => {

          overlay.classList.remove(
            'open'
          );

          overlay.setAttribute(
            'aria-hidden',
            'true'
          );

        });

    }
  );

}


  // ============================================================
  // TABS
  // ============================================================

  function initTabs() {

    document.addEventListener('click', function (event) {

      const tab = event.target.closest(
        '[data-tab]'
      );

      if (!tab) {
        return;
      }

      const group = tab.closest(
        '[data-tabs]'
      );

      if (!group) {
        return;
      }

      const target = tab.dataset.tab;

      group
        .querySelectorAll('[data-tab]')
        .forEach(item =>
          item.classList.remove('active')
        );

      group
        .querySelectorAll('[data-tab-panel]')
        .forEach(panel =>
          panel.classList.remove('active')
        );

      tab.classList.add('active');

      const panel = group.querySelector(
        `[data-tab-panel="${target}"]`
      );

      if (panel) {
        panel.classList.add('active');
      }
    });
  }


  // ============================================================
  // PASSWORD VISIBILITY
  // ============================================================

  function initPasswordToggles() {

    document.addEventListener('click', function (event) {

      const button = event.target.closest(
        '[data-password-toggle], [data-toggle-password]'
      );

      if (!button) {
        return;
      }

      event.preventDefault();

      const targetId =
        button.dataset.passwordToggle ||
        button.dataset.togglePassword;

      if (!targetId) {
        return;
      }

      const input =
        document.getElementById(targetId);

      if (!input) {
        return;
      }

      if (input.type === 'password') {

        input.type = 'text';

        button.textContent =
          'visibility_off';

      } else {

        input.type = 'password';

        button.textContent =
          'visibility';
      }
    });
  }


  // ============================================================
  // STEPPERS
  // ============================================================

  function initSteppers() {

    document.addEventListener('click', function (event) {

      const button = event.target.closest(
        '[data-stepper]'
      );

      if (!button) {
        return;
      }

      const target =
        document.querySelector(
          button.dataset.stepper
        );

      if (!target) {
        return;
      }

      let value =
        parseInt(target.value, 10) || 0;

      const min =
        parseInt(target.min, 10);

      const max =
        parseInt(target.max, 10);

      if (
        button.dataset.stepperAction ===
        'increase'
      ) {
        value++;
      }

      else if (
        button.dataset.stepperAction ===
        'decrease'
      ) {
        value--;
      }

      if (!Number.isNaN(min)) {
        value = Math.max(value, min);
      }

      if (!Number.isNaN(max)) {
        value = Math.min(value, max);
      }

      target.value = value;

      target.dispatchEvent(
        new Event('change', {
          bubbles: true
        })
      );
    });
  }


  // ============================================================
  // FILTERS
  // ============================================================

  function initFilters() {

    document.addEventListener('change', function (event) {

      const filter = event.target.closest(
        '[data-filter]'
      );

      if (!filter) {
        return;
      }

      const filterName =
        filter.dataset.filter;

      const value = filter.value;

      document
        .querySelectorAll(
          `[data-filter-value="${filterName}"]`
        )
        .forEach(item => {

          if (
            !value ||
            value === 'all'
          ) {

            item.style.display = '';

            return;
          }

          const itemValue =
            item.dataset[filterName];

          item.style.display =
            itemValue === value
              ? ''
              : 'none';
        });
    });
  }


  // ============================================================
  // PAYMENT METHOD SELECTION
  // ============================================================

  function initPaymentMethods() {

    document.addEventListener('click', function (event) {

      const method = event.target.closest(
        '.pay-method'
      );

      if (!method) {
        return;
      }

      const group = method.closest(
        '[data-pay-group]'
      );

      if (group) {

        group
          .querySelectorAll('.pay-method')
          .forEach(item =>
            item.classList.remove('selected')
          );
      }

      method.classList.add('selected');

      const radio = method.querySelector(
        'input[type="radio"]'
      );

      if (radio) {
        radio.checked = true;
      }
    });
  }


  // ============================================================
  // NOTIFICATION BADGE
  // ============================================================

  function updateNotificationBadge() {

    if (
      typeof PowerShare === 'undefined' ||
      !Array.isArray(PowerShare.NOTIFICATIONS)
    ) {
      return;
    }

    const unread =
      PowerShare.NOTIFICATIONS.filter(
        notification =>
          !notification.read
      ).length;

    document
      .querySelectorAll('[data-unread-count]')
      .forEach(element => {

        if (unread > 0) {

          element.textContent = unread;
          element.style.display = '';

        } else {

          element.style.display = 'none';
        }
      });
  }


  // ============================================================
  // INITIALISE
  // ============================================================

  document.addEventListener(
    'DOMContentLoaded',
    function () {

      initTheme();
      initLanguage();
      initBackButtons();
      initSheets();
      initTabs();
      initPasswordToggles();
      initSteppers();
      initFilters();
      initPaymentMethods();
      updateNotificationBadge();

    }
  );

})();