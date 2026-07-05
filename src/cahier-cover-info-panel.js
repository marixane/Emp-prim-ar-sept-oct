const COVER_CLASS_COLORS = ['#fff3bf', '#d8f3dc', '#dbeafe', '#ffe4e6', '#ede9fe', '#cffafe', '#fef3c7', '#dcfce7', '#e0e7ff', '#fce7f3', '#ccfbf1', '#f5f5f4', '#fbcfe8', '#bfdbfe', '#bbf7d0', '#fed7aa', '#ddd6fe', '#bae6fd', '#fecdd3', '#ccfbf1'];

const getCoverClassColor = (text) => {
  const normalized = String(text ?? '').toLowerCase().replace(/[\s-]/g, '').trim();
  if (!normalized) return 'white';
  let hash = 2166136261;
  for (let index = 0; index < normalized.length; index += 1) {
    hash ^= normalized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return COVER_CLASS_COLORS[Math.abs(hash) % COVER_CLASS_COLORS.length];
};

const getCoverHeaderValue = (index, fallback) => {
  const input = document.querySelectorAll('.cahier-header input')[index];
  const value = String(input?.value || '').trim();
  if (!value || value.endsWith(':')) return fallback;
  return value.replace(/^Établissement\s*:\s*/i, '').replace(/^Professeur\s*:\s*/i, '').trim() || fallback;
};

const getCoverClasses = () => {
  const classes = [];
  document.querySelectorAll('.timetable-cell-content.colored-cell textarea').forEach((textarea) => {
    const className = String(textarea.value || textarea.textContent || '').trim().replace(/\s+/g, ' ');
    if (className && !classes.includes(className)) classes.push(className);
  });
  return classes;
};

const makeCoverInfoRow = (label, value) => {
  const row = document.createElement('div');
  row.className = 'cover-info-row';
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
};

const ensureCoverInfoPanel = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  const cover = document.getElementById('cahier-cover-page');
  if (!cover) return;

  let panel = document.getElementById('cahier-cover-info-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'cahier-cover-info-panel';
    Object.assign(panel.style, {
      position: 'absolute',
      left: '76px',
      right: '76px',
      top: '748px',
      minHeight: '70px',
      padding: '14px 18px',
      borderRadius: '18px',
      background: 'rgba(255,255,255,0.54)',
      border: '1px solid rgba(120, 90, 55, 0.22)',
      boxShadow: '0 10px 24px rgba(70, 45, 25, 0.12)',
      backdropFilter: 'blur(2px)',
      color: '#111827',
      fontFamily: 'Arial, sans-serif',
      zIndex: '20'
    });
    cover.append(panel);
  }

  const teacher = getCoverHeaderValue(2, '........................................');
  const school = getCoverHeaderValue(0, '........................................');
  const classes = getCoverClasses();

  panel.innerHTML = '';
  const grid = document.createElement('div');
  Object.assign(grid.style, {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px 18px',
    alignItems: 'start'
  });
  grid.append(makeCoverInfoRow('Nom :', teacher), makeCoverInfoRow('Établissement :', school));

  const classBlock = document.createElement('div');
  Object.assign(classBlock.style, { gridColumn: '1 / -1' });
  const classLabel = document.createElement('div');
  classLabel.textContent = 'Classes :';
  Object.assign(classLabel.style, { fontSize: '15px', fontWeight: '900', marginBottom: '8px', color: '#2f241c' });
  const chips = document.createElement('div');
  Object.assign(chips.style, { display: 'flex', flexWrap: 'wrap', gap: '7px', alignItems: 'center' });

  if (classes.length) {
    classes.forEach((className) => {
      const chip = document.createElement('span');
      chip.textContent = className;
      Object.assign(chip.style, {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 10px',
        borderRadius: '999px',
        background: getCoverClassColor(className),
        border: '1px solid rgba(17,17,17,0.18)',
        boxShadow: '0 3px 8px rgba(17,17,17,0.10)',
        color: '#111827',
        fontSize: '13px',
        fontWeight: '900',
        textTransform: 'uppercase',
        lineHeight: '1'
      });
      chips.append(chip);
    });
  } else {
    const empty = document.createElement('span');
    empty.textContent = '........................................';
    Object.assign(empty.style, { fontSize: '14px', fontWeight: '800', color: 'rgba(17,17,17,0.55)' });
    chips.append(empty);
  }

  classBlock.append(classLabel, chips);
  grid.append(classBlock);
  panel.append(grid);

  panel.querySelectorAll('.cover-info-row').forEach((row) => {
    Object.assign(row.style, {
      display: 'grid',
      gridTemplateColumns: '128px 1fr',
      alignItems: 'center',
      gap: '8px',
      minHeight: '28px',
      borderBottom: '1px dashed rgba(70,45,25,0.22)'
    });
    Object.assign(row.querySelector('span').style, { fontSize: '15px', fontWeight: '900', color: '#2f241c' });
    Object.assign(row.querySelector('strong').style, { fontSize: '15px', fontWeight: '800', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
  });
};

const scheduleCoverInfoPanel = () => window.requestAnimationFrame(ensureCoverInfoPanel);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleCoverInfoPanel, { once: true });
} else {
  scheduleCoverInfoPanel();
}

new MutationObserver(scheduleCoverInfoPanel).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
  attributeFilter: ['class', 'style', 'value']
});
