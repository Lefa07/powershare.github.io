/**
 * PowerShare API client — a thin wrapper around every endpoint the backend
 * exposes. Drop this file into the frontend prototype and call
 * `PowerShareAPI.xxx()` from your existing page scripts; no build step or
 * framework required.
 *
 * Usage:
 *   <script src="powershare-api.js"></script>
 *   <script>
 *     PowerShareAPI.login(email, password)
 *       .then(() => window.location.href = 'dashboard.html')
 *       .catch(err => showError(err.message));
 *   </script>
 */
const PowerShareAPI = (() => {
  const BASE_URL = 'https://powersharebackend.onrender.com/api';
  const TOKEN_KEY = 'powershare_token';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Core fetch wrapper.
   * Automatically attaches the Bearer token, handles JSON,
   * and clears invalid authentication tokens on 401/403.
   */
  async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (auth) {
      const token = getToken();

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (
        auth &&
        (response.status === 401 || response.status === 403)
      ) {
        clearToken();
      }

      const message =
        (data && data.message) ||
        `Request failed (${response.status})`;

      const error = new Error(message);

      error.status = response.status;
      error.body = data;
      error.requiresLogin =
        auth &&
        (response.status === 401 || response.status === 403);

      throw error;
    }

    return data;
  }

  return {

    // ============================================================
    // AUTHENTICATION
    // ============================================================

    register: (payload) =>
      request('/auth/register', {
        method: 'POST',
        body: payload,
        auth: false
      }),

    login: async (email, password) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: {
          email,
          password
        },
        auth: false
      });

      setToken(data.token);

      return data;
    },

    forgotPassword: (email) =>
      request('/auth/forgot-password', {
        method: 'POST',
        body: {
          email
        },
        auth: false
      }),

    resetPassword: (token, newPassword) =>
      request('/auth/reset-password', {
        method: 'POST',
        body: {
          token,
          newPassword
        },
        auth: false
      }),

    changePassword: (currentPassword, newPassword) =>
      request('/users/me/password', {
        method: 'PUT',
        body: {
          currentPassword,
          newPassword
        }
      }),

    deactivateAccount: () =>
      request('/users/me', {
        method: 'DELETE'
      }),

    logout: () => clearToken(),

    isLoggedIn: () => !!getToken(),


    // ============================================================
    // PROFILE
    // ============================================================

    getMyProfile: () =>
      request('/users/me'),

    updateMyProfile: (payload) =>
      request('/users/me', {
        method: 'PUT',
        body: payload
      }),


    // ============================================================
    // BATTERIES
    // ============================================================

    getBatteries: (availableOnly = false) =>
      request(
        `/batteries?availableOnly=${availableOnly}`
      ),

    searchBatteries: (query) =>
      request(
        `/batteries/search?query=${encodeURIComponent(query)}`
      ),

    getBatteryCategories: () =>
      request('/battery-categories'),

    getBattery: (id) =>
      request(`/batteries/${id}`),


    // ============================================================
    // BOOKINGS
    // ============================================================

    createBooking: (payload) =>
      request('/bookings', {
        method: 'POST',
        body: payload
      }),

    getMyBookings: () =>
      request('/bookings'),

    getBooking: (id) =>
      request(`/bookings/${id}`),

    getBookingProgress: (id) =>
      request(`/bookings/${id}/progress`),

    cancelBooking: (id) =>
      request(`/bookings/${id}/cancel`, {
        method: 'PUT'
      }),


    // ============================================================
    // PAYMENTS
    // ============================================================

    /*
     * Current backend payment implementation is simulated.
     *
     * method:
     * CARD | EFT | CASH
     */
    pay: (bookingId, method) =>
      request('/payments', {
        method: 'POST',
        body: {
          bookingId,
          method
        }
      }),

    getPaymentsForBooking: (bookingId) =>
      request(`/payments/booking/${bookingId}`),


    // ============================================================
    // RENTALS
    // ============================================================

    getMyRentals: () =>
      request('/rentals'),

    getRental: (id) =>
      request(`/rentals/${id}`),

    extendRental: (id, newDueDate) =>
      request(
        `/rentals/${id}/extend?newDueDate=${newDueDate}`,
        {
          method: 'PUT'
        }
      ),


    // ============================================================
    // NOTIFICATIONS
    // ============================================================

    getMyNotifications: (unreadOnly = false) =>
      request(
        `/notifications?unreadOnly=${unreadOnly}`
      ),

    markNotificationRead: (id) =>
      request(`/notifications/${id}/read`, {
        method: 'PUT'
      }),


    // ============================================================
    // SUPPORT
    // ============================================================

    createSupportRequest: (payload) =>
      request('/support', {
        method: 'POST',
        body: payload
      }),

    getMySupportRequests: () =>
      request('/support'),

    getSupportRequest: (id) =>
      request(`/support/${id}`),


    // ============================================================
    // ADMIN
    // ============================================================

    admin: {

      // ----------------------------------------------------------
      // BOOKINGS
      // ----------------------------------------------------------

      listBookings: (status = 'PENDING') =>
        request(
          `/admin/bookings?status=${status}`
        ),

      approveBooking: (id) =>
        request(
          `/admin/bookings/${id}/approve`,
          {
            method: 'PUT'
          }
        ),

      rejectBooking: (id, reason) =>
        request(
          `/admin/bookings/${id}/reject${
            reason
              ? `?reason=${encodeURIComponent(reason)}`
              : ''
          }`,
          {
            method: 'PUT'
          }
        ),


      // ----------------------------------------------------------
      // BATTERIES
      // ----------------------------------------------------------

      listAllBatteries: () =>
        request('/admin/batteries'),

      createBattery: (payload) =>
        request('/admin/batteries', {
          method: 'POST',
          body: payload
        }),

      updateBattery: (id, payload) =>
        request(`/admin/batteries/${id}`, {
          method: 'PUT',
          body: payload
        }),

      deactivateBattery: (id) =>
        request(`/admin/batteries/${id}`, {
          method: 'DELETE'
        }),


      // ----------------------------------------------------------
      // RENTALS & RETURNS
      // ----------------------------------------------------------

      collectRental: (id) =>
        request(`/rentals/${id}/collect`, {
          method: 'PUT'
        }),

      processReturn: (payload) =>
        request('/returns', {
          method: 'POST',
          body: payload
        }),


      // ----------------------------------------------------------
      // USERS
      // ----------------------------------------------------------

      listUsers: () =>
        request('/admin/users'),

      getUser: (id) =>
        request(`/admin/users/${id}`),

      setUserStatus: (id, status) =>
        request(
          `/admin/users/${id}/status?status=${status}`,
          {
            method: 'PUT'
          }
        ),


      // ----------------------------------------------------------
      // SUPPORT
      // ----------------------------------------------------------

      listSupportRequests: (status = 'OPEN') =>
        request(
          `/support?status=${status}`
        ),

      updateSupportStatus: (id, status) =>
        request(
          `/support/${id}/status?status=${status}`,
          {
            method: 'PUT'
          }
        ),


      // ----------------------------------------------------------
      // REPORTING
      // ----------------------------------------------------------

      dashboardStats: () =>
        request('/admin/reports/dashboard')
    },


    // ============================================================
    // DISPLAY HELPERS
    // ============================================================

    iconForCategory: (categoryName) => {

      const name =
        (categoryName || '').toLowerCase();

      if (name.includes('compact')) {
        return 'battery_std';
      }

      if (name.includes('heavy')) {
        return 'battery_charging_full';
      }

      return 'battery_full';
    },


    conditionToChargePct: (condition) => {

      switch (condition) {

        case 'EXCELLENT':
          return 95;

        case 'GOOD':
          return 75;

        case 'FAIR':
          return 50;

        case 'POOR':
          return 25;

        default:
          return 80;
      }
    }

  };
})();