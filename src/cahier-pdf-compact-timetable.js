const STORAGE_KEY = 'cahierCompactTimetablePdf';

const applyCompactTimetableState = (enabled) => {
  document.body.classList.toggle('compact-timetable-pdf', enabled);
  document.querySelectorAll('.timetable-table').forEach((table) => {
    table.classList.toggle('compact-pdf-hours', enabled);
  });
};

const arrangeTimetableControls = () => {
  const table = document.querySelector('.timetable-table');
  const total = document.querySelector('.total-hours-control');
  if (!table || !total) return null;

  const page = table.closest('.cahier-page');
  if (!page) return null;

  page.style.setProperty('position', 'relative', 'important');

  if (table.nextElementSibling !== total) {
    table.insertAdjacentElement('afterend', total);
  }

  total.style.setProperty('display', 'flex', 'important');
  total.style.setProperty('align-items', 'center', 'important');
  total.style.setProperty('justify-content', 'center', 'important');
  total.style.setProperty('width', 'fit-content', 'important');
  total.style.setProperty('min-width', '240px', 'important');
  total.style.setProperty('margin', '64px auto 0', 'important');
  total.style.setProperty('padding', '14px 28px', 'important');
  total.style.setProperty('border', '2px solid rgba(30,64,175,.22)', 'important');
  total.style.setProperty('border-radius', '16px', 'important');
  total.style.setProperty('background', 'linear-gradient(135deg,#eff6ff 0%,#ecfdf5 100%)', 'important');
  total.style.setProperty('box-shadow', '0 10px 24px rgba(15,23,42,.10)', 'important');
  total.style.setProperty('font-size', '20px', 'important');
  total.style.setProperty('font-weight', '800', 'important');
  total.style.setProperty('color', '#0f172a', 'important');
  total.style.setProperty('transform', 'translateX(200px)', 'important');

  return page;
};

const installCompactTimetableToggle = () => {
  arrangeTimetableControls();
  document.getElementById('compact-timetable-pdf-toggle')?.remove();
  localStorage.removeItem(STORAGE_KEY);
  applyCompactTimetableState(false);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installCompactTimetableToggle, { once: true });
} else {
  installCompactTimetableToggle();
}

requestAnimationFrame(() => requestAnimationFrame(installCompactTimetableToggle));
window.addEventListener('cahier-pages-generated', installCompactTimetableToggle);
