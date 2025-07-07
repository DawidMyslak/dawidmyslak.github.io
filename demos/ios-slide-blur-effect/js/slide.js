$(document).ready(function() {
  var direction = -1;
  var moveTo = 270;

  var filtersApplied = false;
  var counter = 0;
  var blur = 0;
  var brightness = 100;

  function slide() {
    $('#slider ul').animate({
      left: moveTo
    }, 500, function() {
      moveTo += direction * 270;
      direction *= -1;
    });
  }

  function filtersOn() {
    setTimeout(function() {
      applyFilters();
      if (counter < 20) {
        counter += 1;
        updateFilters();
        filtersOn();
      }
    }, 25);
  }

  function filtersOff() {
    setTimeout(function() {
      applyFilters();
      if (counter > 0) {
        counter -= 1;
        updateFilters();
        filtersOff();
      }
    }, 25);
  }

  function applyFilters() {
    $('#background').css({
      '-webkit-filter': 'blur(' + blur + 'px) brightness(' + brightness + '%)'
    });
  }

  function updateFilters() {
    blur = counter;
    brightness = 100 - counter;
  }

  $('.button').click(function() {
    slide();
    if (filtersApplied) {
      filtersOff();
      filtersApplied = false;
    }
    else {
      filtersOn();
      filtersApplied = true;
    }
  });
});
