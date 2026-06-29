var gradingMarkActive = false;

function isGradingMark(target) {
  return target && target.closest && target.closest('.bar-mark');
}

document.addEventListener('mousedown', function (event) {
  if (isGradingMark(event.target)) {
    gradingMarkActive = true;
  }
}, true);

document.addEventListener('mouseup', function () {
  if (gradingMarkActive) {
    setTimeout(function () {
      gradingMarkActive = false;
    }, 250);
  }
}, true);

document.addEventListener('click', function (event) {
  if (gradingMarkActive || isGradingMark(event.target)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);
