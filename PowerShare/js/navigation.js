/* ============================================================
   PowerShare — navigation.js
   Shared interaction wiring: active nav-state, back buttons,
   tab rows, bottom sheets, chip filters. Runs on every page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Active state for bottom nav + admin sidebar ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bottom-nav a, .admin-sidebar nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  /* ---------- Back button ---------- */
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const explicitHref = btn.getAttribute('data-href');
      if (explicitHref) { window.location.href = explicitHref; return; }
      e.preventDefault();
      if (window.history.length > 1) window.history.back();
      else window.location.href = 'home.html';
    });
  });

  /* ---------- Tab rows (e.g. My Rentals: Active / Upcoming / Completed) ---------- */
  document.querySelectorAll('.tab-row').forEach(tabRow => {
    const buttons = tabRow.querySelectorAll('button');
    const panelGroup = tabRow.getAttribute('data-panels');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (panelGroup) {
          const target = btn.getAttribute('data-target');
          document.querySelectorAll(`[data-panel-group="${panelGroup}"]`).forEach(panel => {
            panel.style.display = panel.getAttribute('data-panel') === target ? '' : 'none';
          });
        }
      });
    });
  });

  /* ---------- Filter chips (single-select within a row) ---------- */
  document.querySelectorAll('.chip-row[data-exclusive]').forEach(row => {
    row.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  /* ---------- Bottom sheets / overlays ----------
     Any element with [data-open-sheet="id"] opens #id overlay.
     Any element inside an overlay with [data-close-sheet] closes it. */
  document.querySelectorAll('[data-open-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const sheet = document.getElementById(trigger.getAttribute('data-open-sheet'));
      if (sheet) sheet.classList.add('open');
    });
  });
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-close-sheet]')) {
        overlay.classList.remove('open');
      }
    });
  });

  /* ---------- Password visibility toggles ---------- */
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-wrap').querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.material-icons-outlined').textContent = isPassword ? 'visibility_off' : 'visibility';
    });
  });

  /* ---------- Stepper (quantity, dates) ---------- */
  document.querySelectorAll('.stepper').forEach(stepper => {
    const valueEl = stepper.querySelector('.qty-value');
    const min = parseInt(stepper.getAttribute('data-min') || '1', 10);
    const max = parseInt(stepper.getAttribute('data-max') || '9', 10);
    let value = parseInt(valueEl.textContent, 10);
    stepper.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.getAttribute('data-step') === 'inc' ? 1 : -1;
        value = Math.max(min, Math.min(max, value + dir));
        valueEl.textContent = value;
        stepper.dispatchEvent(new CustomEvent('stepchange', { detail: { value } }));
      });
    });
  });

  /* ---------- Payment method selection ---------- */
  document.querySelectorAll('.pay-method').forEach(method => {
    method.addEventListener('click', () => {
      const group = method.closest('[data-pay-group]');
      if (group) group.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      const radio = method.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  /* ---------- Notification badge on bell/nav icons: read from dummy data ---------- */
  if (typeof PowerShare !== 'undefined') {
    const unread = PowerShare.NOTIFICATIONS.filter(n => !n.read).length;
    document.querySelectorAll('[data-unread-count]').forEach(el => {
      if (unread > 0) { el.textContent = unread; el.style.display = ''; }
      else { el.style.display = 'none'; }
    });
  }
});
