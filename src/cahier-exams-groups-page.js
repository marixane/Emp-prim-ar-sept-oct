const SECOND_PAGE_ID = 'cahier-exams-groups-page';

const makeSecondPage = () => {
  const firstPage = document.querySelector('.cahier-preview-zone > .a4-page.cahier-page:not(.homework-cover-page):not(.homework-page):not(#cahier-main-cover-page)');
  if (!firstPage) return;

  const examList = firstPage.querySelector('.cahier-exams-list');
  const groups = Array.from(firstPage.children).find((node) => {
    const style = node.getAttribute('style') || '';
    return style.includes('grid-template-columns') && style.includes('repeat(3, 1fr)');
  });
  if (!examList || !groups) return;

  document.getElementById(SECOND_PAGE_ID)?.remove();

  const page = document.createElement('div');
  page.id = SECOND_PAGE_ID;
  page.className = 'a4-page cahier-page cahier-exams-groups-page';

  const title = document.createElement('div');
  title.className = 'cahier-exams-groups-main-title';
  title.textContent = 'Cahier de texte';
  page.append(title);

  const examClone = examList.cloneNode(true);
  const groupsClone = groups.cloneNode(true);
  page.append(examClone, groupsClone);

  firstPage.insertAdjacentElement('afterend', page);

  examList.style.display = 'none';
  groups.style.display = 'none';
};

const scheduleSecondPage = () => window.requestAnimationFrame(makeSecondPage);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleSecondPage, { once: true });
} else {
  scheduleSecondPage();
}

document.addEventListener('focusout', scheduleSecondPage, true);
document.addEventListener('drop', scheduleSecondPage, true);
document.addEventListener('click', (event) => {
  if (event.target?.closest?.('.timetable-table, .span-tools, .cahier-tab, .cahier-preview-zone')) scheduleSecondPage();
}, true);
