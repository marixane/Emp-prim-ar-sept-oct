function syncA4OverviewButton() {
  var panel = document.querySelector('.panel');
  if (!panel) return;

  var button = document.querySelector('.a4-overview-toggle');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'a4-overview-toggle';
    button.addEventListener('click', function () {
      document.body.classList.toggle('a4-overview-mode');
      syncA4OverviewButton();
    });

    var pdfButton = Array.from(panel.querySelectorAll(':scope > button')).find(function (item) {
      return (item.textContent || '').includes('Voir PDF');
    });

    if (pdfButton && pdfButton.parentNode) {
      pdfButton.parentNode.insertBefore(button, pdfButton);
    } else {
      panel.appendChild(button);
    }
  }

  var active = document.body.classList.contains('a4-overview-mode');
  button.textContent = active ? 'Aperçu normal' : 'Aperçu A4';
  button.classList.toggle('active', active);
}

syncA4OverviewButton();
setTimeout(syncA4OverviewButton, 100);
setTimeout(syncA4OverviewButton, 400);

new MutationObserver(syncA4OverviewButton).observe(document.body, { childList: true, subtree: true });
