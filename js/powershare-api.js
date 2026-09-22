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
  // Point this at wherever the Spring Boot app is actually running.
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
   * Core fetch wrapper. Attaches the Bearer token automatically, JSON-encodes
   * the body, and throws an Error whose .message is the backend's own
   * message field (from GlobalExceptionHandler's ApiError shape) so a
   * .catch(err => alert(err.message)) just works everywhere.
   */
  async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    if (auth) {
      const token = getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) return null;

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = (data && data.message) || `Request failed (${response.status})`;
      const error = new Error(message);
      error.status = response.status;
      error.body = data; // full ApiError, including validationErrors when present
      throw error;
    }

    return data;
  }

  return {
    // ---------------------------------------------------------------
    // Auth
    // ---------------------------------------------------------------
    register: (payload) =>
      request('/auth/register', { method: 'POST', body: payload, auth: false }),

    login: async (email, password) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: { email, password },
        auth: false,
      });
      setToken(data.token);
      return data;
    },

    logout: () => clearToken(),
    isLoggedIn: () => !!getToken(),

    // ---------------------------------------------------------------
    // Profile
    // ---------------------------------------------------------------
    getMyProfile: () => request('/users/me'),
    updateMyProfile: (payload) => request('/users/me', { method: 'PUT', body: payload }),

    // ---------------------------------------------------------------
    // Batteries (catalogue)
    // ---------------------------------------------------------------
    getBatteries: (availableOnly = false) =>
      request(`/batteries?availableOnly=${availableOnly}`),
    searchBatteries: (query) => request(`/batteries/search?query=${encodeURIComponent(query)}`),
    getBattery: (id) => request(`/batteries/${id}`),

    // ---------------------------------------------------------------
    // Bookings
    // ---------------------------------------------------------------
    // payload: { batteryId, startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', quantity }
    createBooking: (payload) => request('/bookings', { method: 'POST', body: payload }),
    getMyBookings: () => request('/bookings'),
    getBooking: (id) => request(`/bookings/${id}`),
    cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: 'PUT' }),

    // ---------------------------------------------------------------
    // Payments (simulated — see PaymentService on the backend)
    // ---------------------------------------------------------------
    pay: (bookingId, method) =>
      request('/payments', { method: 'POST', body: { bookingId, method } }), // method: 'CARD' | 'EFT' | 'CASH'
    getPaymentsForBooking: (bookingId) => request(`/payments/booking/${bookingId}`),

    // ---------------------------------------------------------------
    // Rentals
    // ---------------------------------------------------------------
    getMyRentals: () => request('/rentals'),
    getRental: (id) => request(`/rentals/${id}`),
    extendRental: (id, newDueDate) => // newDueDate: 'YYYY-MM-DD'
      request(`/rentals/${id}/extend?newDueDate=${newDueDate}`, { method: 'PUT' }),

    // ---------------------------------------------------------------
    // Notifications
    // ---------------------------------------------------------------
    getMyNotifications: (unreadOnly = false) => request(`/notifications?unreadOnly=${unreadOnly}`),
    markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),

    // ---------------------------------------------------------------
    // Support
    // ---------------------------------------------------------------
    createSupportRequest: (payload) => request('/support', { method: 'POST', body: payload }), // { subject, message }
    getMySupportRequests: () => request('/support'),
    getSupportRequest: (id) => request(`/support/${id}`),

    // ---------------------------------------------------------------
    // Admin — all of these require an account with the ADMIN role
    // ---------------------------------------------------------------
    admin: {
      // Bookings
      listBookings: (status = 'PENDING') => request(`/admin/bookings?status=${status}`),
      approveBooking: (id) => request(`/admin/bookings/${id}/approve`, { method: 'PUT' }),
      rejectBooking: (id, reason) =>
        request(`/admin/bookings/${id}/reject${reason ? `?reason=${encodeURIComponent(reason)}` : ''}`, {
          method: 'PUT',
        }),

      // Batteries
      listAllBatteries: () => request('/admin/batteries'),
      createBattery: (payload) => request('/admin/batteries', { method: 'POST', body: payload }),
      updateBattery: (id, payload) => request(`/admin/batteries/${id}`, { method: 'PUT', body: payload }),
      deactivateBattery: (id) => request(`/admin/batteries/${id}`, { method: 'DELETE' }),

      // Rentals & returns
      collectRental: (id) => request(`/rentals/${id}/collect`, { method: 'PUT' }),
      processReturn: (payload) => request('/returns', { method: 'POST', body: payload }),
      // payload: { rentalId, conditionOnReturn, damageReported, damageDescription }

      // Users
      listUsers: () => request('/admin/users'),
      getUser: (id) => request(`/admin/users/${id}`),
      setUserStatus: (id, status) => // status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'
        request(`/admin/users/${id}/status?status=${status}`, { method: 'PUT' }),

      // Support triage
      listSupportRequests: (status = 'OPEN') => request(`/support?status=${status}`),
      updateSupportStatus: (id, status) =>
        request(`/support/${id}/status?status=${status}`, { method: 'PUT' }),

      // Reporting
      dashboardStats: () => request('/admin/reports/dashboard'),
    },

    // ---------------------------------------------------------------
    // Display helpers — NOT backend data. The Battery entity has no icon
    // or live charge-percentage field, so these approximate something
    // visual from what the backend actually returns (category name /
    // physical condition) purely for the UI. Safe to change or delete
    // once you decide what these should really show.
    // ---------------------------------------------------------------
    iconForCategory: (categoryName) => {
      const name = (categoryName || '').toLowerCase();
      if (name.includes('compact')) return 'battery_std';
      if (name.includes('heavy')) return 'battery_charging_full';
      return 'battery_full'; // Portable / anything else
    },

    conditionToChargePct: (condition) => {
      switch (condition) {
        case 'EXCELLENT': return 95;
        case 'GOOD': return 75;
        case 'FAIR': return 50;
        case 'POOR': return 25;
        default: return 80;
      }
    },
  };
})();