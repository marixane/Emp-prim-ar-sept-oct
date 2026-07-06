const ensureEmptyGroupPageStyle = () => {
  if (document.getElementById('cahier-empty-group-page-style')) return;
  const style = document.createElement('style');
  style.id = 'cahier-empty-group-page-style';
  style.textContent = 'body.cahier-tab-active .homework-page{display:block!important;} body.cahier-tab-active .homework-page.cahier-page-hidden-after-limit{display:none!important;} body.cahier-tab-active .homework-entry.cahier-entry-hidden-after-limit{display:none!important;} body.cahier-tab-active .cahier-group-cover-page.cahier-cover-hidden-before-july{display:none!important;}';
  document.head.appendChild(style);
};

const getCahierEntryDate = (entry) => {
  const text = String(entry.querySelector('.homework-date')?.textContent || '');
  const match = text.match(/(\d{2})\/(\d{2})/);
  if (!match) return null;
  return { day: Number(match[1]), month: Number(match[2]) };
};

const getCahierPageTitle = (page) => String(
  page.querySelector('.homework-page > div:first-child > div:first-child')?.textContent ||
  page.firstElementChild?.firstElementChild?.textContent ||
  ''
).trim();

const getEntryKey = (page, entry) => {
  const date = String(entry.querySelector('.homework-date')?.textContent || '').replace(/\s+/g, ' ').trim();
  const subject = String(entry.querySelector('.homework-subject')?.textContent || '').replace(/\s+/g, ' ').trim();
  const text = String(entry.querySelector('.homework-text')?.textContent || '').replace(/\.+/g, '.').replace(/\s+/g, ' ').trim();
  return `${getCahierPageTitle(page)}|${date}|${subject}|${text}`;
};

const hideDuplicateJulyEntries = () => {
  const seen = new Set();
  document.querySelectorAll('.homework-page').forEach((page) => {
    page.querySelectorAll('.homework-entry').forEach((entry) => {
      const date = getCahierEntryDate(entry);
      if (date?.month !== 7) {
        entry.classList.remove('cahier-entry-hidden-after-limit');
        return;
      }
      const key = getEntryKey(page, entry);
      if (seen.has(key)) entry.classList.add('cahier-entry-hidden-after-limit');
      else seen.add(key);
    });
  });
};

const hideBlankPagesAndJulyCovers = () => {
  document.querySelectorAll('.cahier-group-cover-page').forEach((cover) => {
    cover.classList.toggle('cahier-cover-hidden-before-july', cover.nextElementSibling?.dataset?.cahierJulyComplete === 'true');
  });

  document.querySelectorAll('.homework-page').forEach((page) => {
    const visibleEntries = Array.from(page.querySelectorAll('.homework-entry')).filter((entry) => !entry.classList.contains('cahier-entry-hidden-after-limit'));
    page.classList.toggle('cahier-page-hidden-after-limit', visibleEntries.length === 0);
  });
};

const applyCahierEndLimit = () => {
  document.querySelectorAll('.homework-entry').forEach((entry) => {
    const date = getCahierEntryDate(entry);
    const afterLimit = date?.month === 7 && date.day > 10;
    if (afterLimit) entry.classList.add('cahier-entry-hidden-after-limit');
    else entry.classList.remove('cahier-entry-hidden-after-limit');
  });

  hideDuplicateJulyEntries();
  hideBlankPagesAndJulyCovers();
};

const applyEmptyGroupPageVisibility = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  ensureEmptyGroupPageStyle();
  document.querySelectorAll('.homework-page').forEach((page) => page.classList.add('cahier-visible-group-page'));
  applyCahierEndLimit();
};

let emptyGroupPagesRaf = 0;
const scheduleEmptyGroupPageVisibility = () => {
  if (emptyGroupPagesRaf) return;
  emptyGroupPagesRaf = window.requestAnimationFrame(() => {
    emptyGroupPagesRaf = 0;
    applyEmptyGroupPageVisibility();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleEmptyGroupPageVisibility, { once: true });
} else {
  scheduleEmptyGroupPageVisibility();
}

window.setTimeout(scheduleEmptyGroupPageVisibility, 150);
window.setTimeout(scheduleEmptyGroupPageVisibility, 500);
window.setTimeout(scheduleEmptyGroupPageVisibility, 1200);
window.setTimeout(scheduleEmptyGroupPageVisibility, 2200);
window.setTimeout(scheduleEmptyGroupPageVisibility, 3600);
window.setTimeout(scheduleEmptyGroupPageVisibility, 5600);
window.setTimeout(scheduleEmptyGroupPageVisibility, 7600);

document.addEventListener('input', (event) => {
  if (event.target?.closest?.('.timetable-table')) window.setTimeout(scheduleEmptyGroupPageVisibility, 120);
}, { passive: true });
document.addEventListener('drop', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
document.addEventListener('mouseup', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
