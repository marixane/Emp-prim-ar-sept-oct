import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './compact-exercise.css';
import './test-title.css';
import './dark-background.css';
import './photo-controls-opaque.css';
import './page-status.css';
import './extra-pages-full-height.css';
import './extra-page-resize-override.css';
import './header-duration-bigger.css';
import './points-buttons-below.css';
import './mobile-responsive.css';
import './photo-buttons-below-zoom.css';
import './small-toggle-icons.css';
import './live-lines-toggle.css';
import './compact-side-menu.css';
import './points-buttons-hitbox.css';
import './narrow-side-menu.css';
import './rounded-header-corners.css';
import './exercise-under-header-spacing.css';
import './exercise-top-border-fix.css';
import './force-total-card.css';
import './auto-scale-a4-preview.css';
import './white-mask-fix.css';
import './page-date-footer.css';
import './note-scale-buttons.css';
import './clear-toggle-icons.css';
import './menu-title-reglages.css';
import './export-pdf-clear.css';
import './discreet-exercise-points.css';
import './discreet-duration-control.css';
import './pdf-exercise-points-clean.css';
import './french-pdf-header-nudge.css';
import './homework-exercise-title-fix.css';
import './bar-ribbon-label.css';
import './arabic-mode.css';
import './active-settings-green.css';
import './arabic-toggle-label-bigger.css';
import './mobile-final-fix.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

const optionalScripts = [
  './bar-mark-click-guard.js',
  './clear-bar-marks-on-title-points.js',
  './homework-hide-ribbon.js',
  './clear-bar-marks-on-exercise-count.js',
  './page-date-footer.js',
  './note-scale-button-labels.js',
  './note-counter-pts.js',
  './hide-single-page-number.js',
  './page-count-singular.js',
  './points-label-pts.js',
  './menu-title-reglages.js',
  './export-pdf-clear.js',
  './fix-points-parentheses.js',
  './arabic-mode.js',
  './a4-overview.js'
];

setTimeout(() => {
  optionalScripts.forEach((path) => {
    import(path).catch((error) => {
      console.warn('Optional script failed:', path, error);
    });
  });
}, 0);
