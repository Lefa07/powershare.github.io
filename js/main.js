/* ============================================================
   PowerShare — main.js

   Dummy data, small persistence layer (localStorage — this is a
   frontend-only prototype, so "state" just means remembering
   what you clicked between pages), toasts, and form validation
   helpers shared by every page.
   ============================================================ */

const PowerShare = (() => {


  // ============================================================
  // DUMMY BATTERY DATA
  // ============================================================

  const BATTERIES = [

    {
      id: 'bat-01',
      name: 'EcoFlow DELTA 2',
      category: 'Portable',
      capacity: '1024Wh',
      outputs: '6x AC / 2x USB-C',
      runtime: 'Up to 14 hrs',
      price: 180,
      deposit: 1500,
      charge: 92,
      status: 'available',
      location: 'Claremont Hub',
      icon: 'battery_charging_full'
    },

    {
      id: 'bat-02',
      name: 'EcoFlow DELTA Pro',
      category: 'Heavy Duty',
      capacity: '3600Wh',
      outputs: '4x AC / 2x USB-C',
      runtime: 'Up to 30 hrs',
      price: 320,
      deposit: 3000,
      charge: 78,
      status: 'available',
      location: 'Bellville Hub',
      icon: 'ev_station'
    },

    {
      id: 'bat-03',
      name: 'EcoFlow RIVER 2',
      category: 'Compact',
      capacity: '256Wh',
      outputs: '3x AC / 2x USB-C',
      runtime: 'Up to 6 hrs',
      price: 90,
      deposit: 800,
      charge: 15,
      status: 'low',
      location: 'Claremont Hub',
      icon: 'battery_std'
    },

    {
      id: 'bat-04',
      name: 'EcoFlow RIVER 2 Pro',
      category: 'Compact',
      capacity: '768Wh',
      outputs: '4x AC / 2x USB-C',
      runtime: 'Up to 10 hrs',
      price: 130,
      deposit: 1200,
      charge: 60,
      status: 'available',
      location: 'Sea Point Hub',
      icon: 'battery_charging_full'
    },

    {
      id: 'bat-05',
      name: 'EcoFlow DELTA Max',
      category: 'Heavy Duty',
      capacity: '2016Wh',
      outputs: '6x AC / 2x USB-C',
      runtime: 'Up to 22 hrs',
      price: 260,
      deposit: 2200,
      charge: 0,
      status: 'unavailable',
      location: 'Bellville Hub',
      icon: 'battery_alert'
    },

    {
      id: 'bat-06',
      name: 'EcoFlow RIVER Mini',
      category: 'Compact',
      capacity: '210Wh',
      outputs: '2x AC / 2x USB-C',
      runtime: 'Up to 5 hrs',
      price: 70,
      deposit: 600,
      charge: 88,
      status: 'available',
      location: 'Sea Point Hub',
      icon: 'battery_std'
    },

    {
      id: 'bat-07',
      name: 'EcoFlow DELTA 2 Max',
      category: 'Portable',
      capacity: '2048Wh',
      outputs: '6x AC / 2x USB-C',
      runtime: 'Up to 18 hrs',
      price: 240,
      deposit: 2000,
      charge: 100,
      status: 'available',
      location: 'Claremont Hub',
      icon: 'battery_charging_full'
    },

    {
      id: 'bat-08',
      name: 'EcoFlow RIVER 3',
      category: 'Compact',
      capacity: '245Wh',
      outputs: '3x AC / 2x USB-C',
      runtime: 'Up to 6 hrs',
      price: 85,
      deposit: 750,
      charge: 47,
      status: 'available',
      location: 'Bellville Hub',
      icon: 'battery_std'
    },

    {
      id: 'bat-09',
      name: 'EcoFlow DELTA Pro 3',
      category: 'Heavy Duty',
      capacity: '4096Wh',
      outputs: '8x AC / 4x USB-C',
      runtime: 'Up to 34 hrs',
      price: 360,
      deposit: 3500,
      charge: 65,
      status: 'available',
      location: 'Claremont Hub',
      icon: 'ev_station'
    },

    {
      id: 'bat-10',
      name: 'EcoFlow RIVER 2 Max',
      category: 'Compact',
      capacity: '512Wh',
      outputs: '3x AC / 2x USB-C',
      runtime: 'Up to 9 hrs',
      price: 110,
      deposit: 950,
      charge: 8,
      status: 'low',
      location: 'Sea Point Hub',
      icon: 'battery_std'
    },

    {
      id: 'bat-11',
      name: 'EcoFlow DELTA Mini',
      category: 'Portable',
      capacity: '882Wh',
      outputs: '5x AC / 2x USB-C',
      runtime: 'Up to 12 hrs',
      price: 160,
      deposit: 1300,
      charge: 0,
      status: 'unavailable',
      location: 'Bellville Hub',
      icon: 'battery_alert'
    },

    {
      id: 'bat-12',
      name: 'EcoFlow DELTA 2 (Unit B)',
      category: 'Portable',
      capacity: '1024Wh',
      outputs: '6x AC / 2x USB-C',
      runtime: 'Up to 14 hrs',
      price: 180,
      deposit: 1500,
      charge: 34,
      status: 'available',
      location: 'Claremont Hub',
      icon: 'battery_charging_full'
    },

    {
      id: 'bat-13',
      name: 'EcoFlow DELTA Pro (Unit B)',
      category: 'Heavy Duty',
      capacity: '3600Wh',
      outputs: '4x AC / 2x USB-C',
      runtime: 'Up to 30 hrs',
      price: 320,
      deposit: 3000,
      charge: 100,
      status: 'available',
      location: 'Sea Point Hub',
      icon: 'ev_station'
    },

    {
      id: 'bat-14',
      name: 'EcoFlow RIVER Mini (Unit B)',
      category: 'Compact',
      capacity: '210Wh',
      outputs: '2x AC / 2x USB-C',
      runtime: 'Up to 5 hrs',
      price: 70,
      deposit: 600,
      charge: 12,
      status: 'low',
      location: 'Claremont Hub',
      icon: 'battery_std'
    },

    {
      id: 'bat-15',
      name: 'EcoFlow DELTA Max (Unit B)',
      category: 'Heavy Duty',
      capacity: '2016Wh',
      outputs: '6x AC / 2x USB-C',
      runtime: 'Up to 22 hrs',
      price: 260,
      deposit: 2200,
      charge: 0,
      status: 'unavailable',
      location: 'Bellville Hub',
      icon: 'battery_alert'
    }

  ];


  // ============================================================
  // RENTALS
  // ============================================================

  const RENTALS = [

    {
      id: 'PS-48213',
      batteryId: 'bat-01',
      status: 'active',
      start: '22 Jul 2026',
      end: '26 Jul 2026',
      total: 720,
      chargeAtPickup: 100
    },

    {
      id: 'PS-48190',
      batteryId: 'bat-04',
      status: 'upcoming',
      start: '29 Jul 2026',
      end: '31 Jul 2026',
      total: 260,
      chargeAtPickup: 100
    },

    {
      id: 'PS-47820',
      batteryId: 'bat-02',
      status: 'completed',
      start: '02 Jul 2026',
      end: '05 Jul 2026',
      total: 960,
      chargeAtPickup: 100
    },

    {
      id: 'PS-47655',
      batteryId: 'bat-03',
      status: 'completed',
      start: '18 Jun 2026',
      end: '19 Jun 2026',
      total: 90,
      chargeAtPickup: 100
    }

  ];


  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const NOTIFICATIONS = [

    {
      id: 1,
      type: 'reminder',
      title: 'Return reminder',
      body: 'Your EcoFlow DELTA 2 rental (PS-48213) is due back tomorrow at 5:00 PM.',
      time: '2 hrs ago',
      read: false
    },

    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      body: 'R720.00 received for booking PS-48213. Receipt is in My Rentals.',
      time: '1 day ago',
      read: false
    },

    {
      id: 4,
      type: 'reminder',
      title: 'Booking confirmed',
      body: 'Booking PS-48190 for EcoFlow RIVER 2 Pro is confirmed for 29 Jul.',
      time: '3 days ago',
      read: true
    },

    {
      id: 5,
      type: 'promo',
      title: 'Refer a friend, get R50',
      body: 'Share your code with neighbours and both of you get credit.',
      time: '5 days ago',
      read: true
    }

  ];


  // ============================================================
  // EMPTY COLLECTIONS
  // ============================================================

  const CUSTOMERS = [];

  const BOOKINGS_ADMIN = [];


  // ============================================================
  // LOCAL STORAGE
  // ============================================================

  const store = {

    get(key, fallback = null) {

      try {

        const value =
          localStorage.getItem(
            'ps_' + key
          );

        return value
          ? JSON.parse(value)
          : fallback;

      } catch (error) {

        return fallback;
      }
    },


    set(key, value) {

      try {

        localStorage.setItem(
          'ps_' + key,
          JSON.stringify(value)
        );

      } catch (error) {

        // Storage unavailable.
        // Ignore safely.
      }
    }

  };


  // ============================================================
  // FIND BATTERY
  // ============================================================

  const findBattery = (id) =>
    BATTERIES.find(
      battery =>
        battery.id === id
    );


  // ============================================================
  // TOAST
  // ============================================================

  function toast(
    message,
    type = 'default',
    icon = null
  ) {

    let stack =
      document.querySelector(
        '.toast-stack'
      );

    if (!stack) {

      stack =
        document.createElement(
          'div'
        );

      stack.className =
        'toast-stack';

      document.body.appendChild(
        stack
      );
    }


    const element =
      document.createElement(
        'div'
      );

    element.className =
      `toast ${type}`;


    const iconName =
      icon ||
      (
        type === 'success'
          ? 'check_circle'
          : type === 'error'
            ? 'error'
            : 'info'
      );


    element.innerHTML = `
      <span
        class="material-icons-outlined"
        style="font-size:18px"
      >
        ${iconName}
      </span>

      <span>
        ${message}
      </span>
    `;


    stack.appendChild(
      element
    );


    setTimeout(
      () => {

        element.classList.add(
          'hide'
        );

        setTimeout(
          () => element.remove(),
          250
        );

      },
      2800
    );
  }


  // ============================================================
  // VALIDATION HELPERS
  // ============================================================

  const validators = {

    required: (value) =>
      value.trim().length > 0 ||
      'This field is required.',


    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value
      ) ||
      'Enter a valid email address.',


    phone: (value) =>
      /^(\+27|0)[6-8][0-9]{8}$/.test(
        value.replace(/\s/g, '')
      ) ||
      'Enter a valid South African phone number.',


    saId: (value) =>
      /^\d{13}$/.test(
        value.replace(/\s/g, '')
      ) ||
      'South African ID must be 13 digits.',


    minLength: (length) =>
      (value) =>
        value.length >= length ||
        `Must be at least ${length} characters.`,


    match: (otherValue) =>
      (value) =>
        value === otherValue ||
        'Values do not match.'

  };


  // ============================================================
  // VALIDATE FIELD
  // ============================================================

  function validateField(
    fieldElement,
    rules
  ) {

    const input =
      fieldElement.querySelector(
        'input, select, textarea'
      );

    const errorElement =
      fieldElement.querySelector(
        '.error-msg'
      );


    if (!input) {
      return false;
    }


    const value =
      input.value;


    for (
      const rule of rules
    ) {

      const result =
        rule(value);


      if (result !== true) {

        fieldElement.classList.add(
          'has-error'
        );

        input.classList.add(
          'invalid'
        );

        if (errorElement) {
          errorElement.textContent =
            result;
        }

        return false;
      }
    }


    fieldElement.classList.remove(
      'has-error'
    );

    input.classList.remove(
      'invalid'
    );


    return true;
  }


  // ============================================================
  // CLEAR FIELD ERROR
  // ============================================================

  function clearFieldError(
    fieldElement
  ) {

    fieldElement.classList.remove(
      'has-error'
    );


    const input =
      fieldElement.querySelector(
        'input, select, textarea'
      );


    if (input) {

      input.classList.remove(
        'invalid'
      );
    }
  }


  // ============================================================
  // LIVE ERROR CLEARING
  // ============================================================

  document.addEventListener(
    'input',
    (event) => {

      const field =
        event.target.closest(
          '.field'
        );


      if (
        field &&
        field.classList.contains(
          'has-error'
        )
      ) {

        clearFieldError(
          field
        );
      }
    }
  );


  // ============================================================
  // PUBLIC API
  // ============================================================

  return {

    BATTERIES,
    RENTALS,
    NOTIFICATIONS,
    CUSTOMERS,
    BOOKINGS_ADMIN,

    store,

    findBattery,

    toast,

    validators,

    validateField,

    clearFieldError

  };

})();