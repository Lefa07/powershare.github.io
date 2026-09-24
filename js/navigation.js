
/* ============================================================
   PowerShare — navigation.js
   Shared user navigation, theme persistence, language preferences,
   tabs, sheets, filters, password toggles and steppers.
   Admin pages are intentionally excluded from theme/language changes.
   ============================================================ */

(function () {
  const THEME_KEY = 'ps_theme';
  const LANGUAGE_KEY = 'ps_language';

  function isAdminPage() {
    return !!document.querySelector('.admin-sidebar') ||
      /admin-dashboard|inventory|customers|reports|business-settings/.test(window.location.pathname);
  }

  function applyTheme(theme) {
    if (isAdminPage()) return;

    document.documentElement.classList.toggle(
      'dark-mode',
      theme === 'dark'
    );

    document.body.classList.toggle(
      'dark-mode',
      theme === 'dark'
    );
  }

  // Apply immediately to avoid a light-mode flash.
  try {
    applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  } catch (e) {}

  const translations = {
    af: {
      'Home': 'Tuis',
      'Batteries': 'Batterye',
      'Rentals': 'Huurtransaksies',
      'Notifications': 'Kennisgewings',
      'Profile': 'Profiel',
      'Settings': 'Instellings',
      'Good afternoon,': 'Goeiemiddag,',
      'Search EcoFlow batteries...': 'Soek EcoFlow-batterye...',
      'Quick actions': 'Vinnige aksies',
      'Rent now': 'Huur nou',
      'My rentals': 'My huurtransaksies',
      'Return': 'Terugbesorg',
      'Support': 'Ondersteuning',
      'Featured batteries': 'Voorgestelde batterye',
      'See all': 'Sien alles',
      'Promotions': 'Promosies',
      'Nearby pickup locations': 'Nabygeleë afhaalplekke',
      'View map': 'Sien kaart',
      'Search by name or capacity...': 'Soek volgens naam of kapasiteit...',
      'All': 'Alles',
      'Compact': 'Kompak',
      'Portable': 'Draagbaar',
      'Heavy Duty': 'Swaardiens',
      'Filter batteries': 'Filtreer batterye',
      'Pickup location': 'Afhaalplek',
      'Any hub': 'Enige spilpunt',
      'Price range': 'Prysklas',
      'Any price': 'Enige prys',
      'Under R100/day': 'Onder R100/dag',
      'R100 – R250/day': 'R100 – R250/dag',
      'Over R250/day': 'Meer as R250/dag',
      'Only show available now': 'Wys slegs tans beskikbare',
      'Apply filters': 'Pas filters toe',
      'Battery details': 'Batterybesonderhede',
      'Capacity': 'Kapasiteit',
      'Runtime': 'Looptyd',
      'Daily rate': 'Daaglikse tarief',
      'Status': 'Status',
      'Book now': 'Bespreek nou',
      'Booking': 'Bespreking',
      'Choose a battery': 'Kies ’n battery',
      'Set rental details': 'Stel huurdetails',
      'Payment': 'Betaling',
      'Rental dates': 'Huurdatums',
      'Pickup date': 'Afhaaldatum',
      'Return date': 'Terugbesorgingsdatum',
      'Pickup or delivery': 'Afhaal of aflewering',
      'Pickup': 'Afhaal',
      'Delivery': 'Aflewering',
      'Quantity': 'Hoeveelheid',
      'Number of batteries': 'Aantal batterye',
      'Price summary': 'Prysoorsig',
      'Continue to payment': 'Gaan voort na betaling',
      'Appearance': 'Voorkoms',
      'Dark mode': 'Donkermodus',
      'Preferences': 'Voorkeure',
      'Language': 'Taal',
      'Push notifications': 'Stootkennisgewings',
      'Email updates': 'E-posopdaterings',
      'Privacy Policy': 'Privaatheidsbeleid',
      'Terms of Service': 'Diensvoorwaardes',
      'Available now': 'Nou beskikbaar',
      'Unavailable': 'Nie beskikbaar nie',
      'View & book': 'Bekyk en bespreek'
    },

    xh: {
      'Home': 'Ikhaya',
      'Batteries': 'Iibhetri',
      'Rentals': 'Iirenti',
      'Notifications': 'Izaziso',
      'Profile': 'Iprofayile',
      'Settings': 'Iisetingi',
      'Good afternoon,': 'Molo emva kwemini,',
      'Search EcoFlow batteries...': 'Khangela iibhetri ze-EcoFlow...',
      'Quick actions': 'Izenzo ezikhawulezayo',
      'Rent now': 'Renta ngoku',
      'My rentals': 'Iirenti zam',
      'Return': 'Buyisa',
      'Support': 'Inkxaso',
      'Featured batteries': 'Iibhetri ezikhethiweyo',
      'See all': 'Bona zonke',
      'Promotions': 'Unyuselo',
      'Nearby pickup locations': 'Iindawo zokuthatha ezikufuphi',
      'View map': 'Jonga imephu',
      'Search by name or capacity...': 'Khangela ngegama okanye umthamo...',
      'All': 'Zonke',
      'Compact': 'Encinci',
      'Portable': 'Ephathwayo',
      'Heavy Duty': 'Umsebenzi onzima',
      'Filter batteries': 'Hlunga iibhetri',
      'Pickup location': 'Indawo yokuthatha',
      'Any hub': 'Nayiphi na indawo',
      'Price range': 'Uluhlu lwamaxabiso',
      'Any price': 'Naliphi na ixabiso',
      'Under R100/day': 'Ngaphantsi kwe-R100/ngosuku',
      'Over R250/day': 'Ngaphezulu kwe-R250/ngosuku',
      'Only show available now': 'Bonisa ezikhoyo ngoku',
      'Apply filters': 'Sebenzisa izihluzi',
      'Battery details': 'Iinkcukacha zebhetri',
      'Capacity': 'Umthamo',
      'Runtime': 'Ixesha lokusebenza',
      'Daily rate': 'Ixabiso losuku',
      'Status': 'Imeko',
      'Book now': 'Bhukisha ngoku',
      'Booking': 'Ukubhukisha',
      'Choose a battery': 'Khetha ibhetri',
      'Set rental details': 'Seta iinkcukacha zerenti',
      'Payment': 'Intlawulo',
      'Rental dates': 'Imihla yerenti',
      'Pickup date': 'Umhla wokuthatha',
      'Return date': 'Umhla wokubuyisa',
      'Pickup or delivery': 'Ukuthatha okanye ukuhanjiswa',
      'Pickup': 'Thatha',
      'Delivery': 'Ukuhanjiswa',
      'Quantity': 'Ubuninzi',
      'Number of batteries': 'Inani leebhetri',
      'Price summary': 'Isishwankathelo sexabiso',
      'Continue to payment': 'Qhubeka uye kwintlawulo',
      'Appearance': 'Imbonakalo',
      'Dark mode': 'Imo emnyama',
      'Preferences': 'Izinto ozikhethayo',
      'Language': 'Ulwimi',
      'Push notifications': 'Izaziso',
      'Email updates': 'Uhlaziyo lwe-imeyile',
      'Privacy Policy': 'Umgaqo-nkqubo wabucala',
      'Terms of Service': 'Imigaqo yenkonzo',
      'Available now': 'Iyafumaneka ngoku',
      'Unavailable': 'Ayifumaneki',
      'View & book': 'Jonga uze ubhukishe'
    },

    zu: {
      'Home': 'Ikhaya',
      'Batteries': 'Amabhethri',
      'Rentals': 'Ukuqasha',
      'Notifications': 'Izaziso',
      'Profile': 'Iphrofayela',
      'Settings': 'Izilungiselelo',
      'Good afternoon,': 'Sawubona ntambama,',
      'Search EcoFlow batteries...': 'Sesha amabhethri e-EcoFlow...',
      'Quick actions': 'Izenzo ezisheshayo',
      'Rent now': 'Qasha manje',
      'My rentals': 'Ukuqasha kwami',
      'Return': 'Buyisa',
      'Support': 'Usizo',
      'Featured batteries': 'Amabhethri akhethiwe',
      'See all': 'Bona konke',
      'Promotions': 'Amaphromoshini',
      'Nearby pickup locations': 'Izindawo zokuthatha eziseduze',
      'View map': 'Buka imephu',
      'Search by name or capacity...': 'Sesha ngegama noma ngomthamo...',
      'All': 'Konke',
      'Compact': 'Amancane',
      'Portable': 'Athwalekayo',
      'Heavy Duty': 'Umsebenzi osindayo',
      'Filter batteries': 'Hlunga amabhethri',
      'Pickup location': 'Indawo yokuthatha',
      'Any hub': 'Noma iyiphi indawo',
      'Price range': 'Ibanga lentengo',
      'Any price': 'Noma iyiphi intengo',
      'Under R100/day': 'Ngaphansi kuka-R100/ngosuku',
      'Over R250/day': 'Ngaphezu kuka-R250/ngosuku',
      'Only show available now': 'Bonisa atholakalayo manje',
      'Apply filters': 'Sebenzisa izihlungi',
      'Battery details': 'Imininingwane yebhethri',
      'Capacity': 'Umthamo',
      'Runtime': 'Isikhathi sokusebenza',
      'Daily rate': 'Intengo yosuku',
      'Status': 'Isimo',
      'Book now': 'Qasha manje',
      'Booking': 'Ukubhukha',
      'Choose a battery': 'Khetha ibhethri',
      'Set rental details': 'Setha imininingwane yokuqasha',
      'Payment': 'Inkokhelo',
      'Rental dates': 'Izinsuku zokuqasha',
      'Pickup date': 'Usuku lokuthatha',
      'Return date': 'Usuku lokubuyisa',
      'Pickup or delivery': 'Ukuthatha noma ukulethwa',
      'Pickup': 'Ukuthatha',
      'Delivery': 'Ukulethwa',
      'Quantity': 'Inani',
      'Number of batteries': 'Inani lamabhethri',
      'Price summary': 'Isifinyezo sentengo',
      'Continue to payment': 'Qhubekela ekukhokheni',
      'Appearance': 'Ukubukeka',
      'Dark mode': 'Imodi emnyama',
      'Preferences': 'Okuncanyelwayo',
      'Language': 'Ulimi',
      'Push notifications': 'Izaziso',
      'Email updates': 'Izibuyekezo ze-imeyili',
      'Privacy Policy': 'Inqubomgomo yobumfihlo',
      'Terms of Service': 'Imigomo yesevisi',
      'Available now': 'Iyatholakala manje',
      'Unavailable': 'Ayitholakali',
      'View & book': 'Buka bese ubhukha'
    }
  };

  function languageCode() {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function translateTextNodes(root) {
    if (isAdminPage()) return;

    const lang = languageCode();

    if (lang === 'en') return;

    const dict = translations[lang];

    if (!dict) return;

    const walker = document.createTreeWalker(
      root || document.body,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
      if (!node.nodeValue.trim()) return;

      const key = node.nodeValue.trim();

      if (dict[key]) {
        node.nodeValue = node.nodeValue.replace(
          key,
          dict[key]
        );
      }
    });

    document
      .querySelectorAll('input[placeholder], textarea[placeholder]')
      .forEach(el => {
        const key = el.getAttribute('placeholder').trim();

        if (dict[key]) {
          el.setAttribute(
            'placeholder',
            dict[key]
          );
        }
      });
  }

  function setLanguage(lang) {
    try {
      localStorage.setItem(
        LANGUAGE_KEY,
        lang
      );
    } catch (e) {}

    document.documentElement.lang =
      lang === 'xh'
        ? 'xh'
        : lang === 'zu'
          ? 'zu'
          : lang === 'af'
            ? 'af'
            : 'en';

    // Reload so every page rebuilds its dynamic content
    // using the selected language.
    window.location.reload();
  }

  document.addEventListener('DOMContentLoaded', () => {

    const currentPage =
      window.location.pathname.split('/').pop() ||
      'index.html';

    /* Active state for navigation */
    document
      .querySelectorAll(
        '.bottom-nav a, .admin-sidebar nav a'
      )
      .forEach(link => {

        const href =
          link.getAttribute('href');

        if (href === currentPage) {
          link.classList.add('active');
        }
      });

    /* Theme */
    if (!isAdminPage()) {

      const savedTheme = (() => {
        try {
          return localStorage.getItem(THEME_KEY) || 'light';
        } catch (e) {
          return 'light';
        }
      })();

      applyTheme(savedTheme);

      const toggle =
        document.getElementById(
          'dark-mode-toggle'
        );

      if (toggle) {

        toggle.checked =
          savedTheme === 'dark';

        toggle.addEventListener(
          'change',
          () => {

            const theme =
              toggle.checked
                ? 'dark'
                : 'light';

            try {
              localStorage.setItem(
                THEME_KEY,
                theme
              );
            } catch (e) {}

            applyTheme(theme);

            if (
              typeof PowerShare !== 'undefined' &&
              PowerShare.toast
            ) {
              PowerShare.toast(
                theme === 'dark'
                  ? 'Dark mode enabled'
                  : 'Dark mode disabled'
              );
            }
          }
        );
      }

      /* Language */
      const languageSelect =
        document.getElementById(
          'language-select'
        );

      if (languageSelect) {

        const savedLanguage =
          languageCode();

        languageSelect.value =
          savedLanguage;

        languageSelect.addEventListener(
          'change',
          () => {
            setLanguage(
              languageSelect.value
            );
          }
        );
      }

      translateTextNodes(
        document.body
      );

      const translationObserver =
        new MutationObserver(() => {
          translateTextNodes(
            document.body
          );
        });

      translationObserver.observe(
        document.body,
        {
          childList: true,
          subtree: true
        }
      );
    }

    /* Back button */
    document
      .querySelectorAll('.back-btn')
      .forEach(btn => {

        btn.addEventListener(
          'click',
          (e) => {

            const explicitHref =
              btn.getAttribute(
                'data-href'
              );

            if (explicitHref) {
              window.location.href =
                explicitHref;
              return;
            }

            e.preventDefault();

            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href =
                'home.html';
            }
          }
        );
      });

    /* Tab rows */
    document
      .querySelectorAll('.tab-row')
      .forEach(tabRow => {

        const buttons =
          tabRow.querySelectorAll(
            'button'
          );

        const panelGroup =
          tabRow.getAttribute(
            'data-panels'
          );

        buttons.forEach(btn => {

          btn.addEventListener(
            'click',
            () => {

              buttons.forEach(
                b =>
                  b.classList.remove(
                    'active'
                  )
              );

              btn.classList.add(
                'active'
              );

              if (panelGroup) {

                const target =
                  btn.getAttribute(
                    'data-target'
                  );

                document
                  .querySelectorAll(
                    `[data-panel-group="${panelGroup}"]`
                  )
                  .forEach(panel => {

                    panel.style.display =
                      panel.getAttribute(
                        'data-panel'
                      ) === target
                        ? ''
                        : 'none';
                  });
              }
            }
          );
        });
      });

    /* Filter chips */
    document
      .querySelectorAll(
        '.chip-row[data-exclusive]'
      )
      .forEach(row => {

        row.querySelectorAll(
          '.chip'
        ).forEach(chip => {

          chip.addEventListener(
            'click',
            () => {

              row
                .querySelectorAll(
                  '.chip'
                )
                .forEach(c =>
                  c.classList.remove(
                    'active'
                  )
                );

              chip.classList.add(
                'active'
              );
            }
          );
        });
      });

    /* Bottom sheets / overlays */
    document
      .querySelectorAll(
        '[data-open-sheet]'
      )
      .forEach(trigger => {

        trigger.addEventListener(
          'click',
          () => {

            const sheet =
              document.getElementById(
                trigger.getAttribute(
                  'data-open-sheet'
                )
              );

            if (sheet) {
              sheet.classList.add(
                'open'
              );
            }
          }
        );
      });

    document
      .querySelectorAll('.overlay')
      .forEach(overlay => {

        overlay.addEventListener(
          'click',
          (e) => {

            if (
              e.target === overlay ||
              e.target.closest(
                '[data-close-sheet]'
              )
            ) {
              overlay.classList.remove(
                'open'
              );
            }
          }
        );
      });

    /* Password visibility */
    document
      .querySelectorAll(
        '.toggle-visibility'
      )
      .forEach(btn => {

        btn.addEventListener(
          'click',
          () => {

            const input =
              btn
                .closest('.input-wrap')
                .querySelector(
                  'input'
                );

            const isPassword =
              input.type === 'password';

            input.type =
              isPassword
                ? 'text'
                : 'password';

            btn
              .querySelector(
                '.material-icons-outlined'
              )
              .textContent =
                isPassword
                  ? 'visibility_off'
                  : 'visibility';
          }
        );
      });

    /* Stepper */
    document
      .querySelectorAll('.stepper')
      .forEach(stepper => {

        const valueEl =
          stepper.querySelector(
            '.qty-value'
          );

        const min =
          parseInt(
            stepper.getAttribute(
              'data-min'
            ) || '1',
            10
          );

        const max =
          parseInt(
            stepper.getAttribute(
              'data-max'
            ) || '9',
            10
          );

        let value =
          parseInt(
            valueEl.textContent,
            10
          );

        stepper
          .querySelectorAll('button')
          .forEach(btn => {

            btn.addEventListener(
              'click',
              () => {

                const dir =
                  btn.getAttribute(
                    'data-step'
                  ) === 'inc'
                    ? 1
                    : -1;

                value =
                  Math.max(
                    min,
                    Math.min(
                      max,
                      value + dir
                    )
                  );

                valueEl.textContent =
                  value;

                stepper.dispatchEvent(
                  new CustomEvent(
                    'stepchange',
                    {
                      detail: {
                        value
                      }
                    }
                  )
                );
              }
            );
          });
      });

    /* Payment method selection */
    document
      .querySelectorAll('.pay-method')
      .forEach(method => {

        method.addEventListener(
          'click',
          () => {

            const group =
              method.closest(
                '[data-pay-group]'
              );

            if (group) {
              group
                .querySelectorAll(
                  '.pay-method'
                )
                .forEach(
                  m =>
                    m.classList.remove(
                      'selected'
                    )
                );
            }

            method.classList.add(
              'selected'
            );

            const radio =
              method.querySelector(
                'input[type="radio"]'
              );

            if (radio) {
              radio.checked = true;
            }
          }
        );
      });

    /* Notification badge */
    if (
      typeof PowerShare !== 'undefined'
    ) {

      const unread =
        PowerShare.NOTIFICATIONS
          .filter(
            n => !n.read
          ).length;

      document
        .querySelectorAll(
          '[data-unread-count]'
        )
        .forEach(el => {

          if (unread > 0) {
            el.textContent =
              unread;

            el.style.display = '';
          } else {
            el.style.display =
              'none';
          }
        });
    }
  });
})();