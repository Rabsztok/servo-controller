var currentRotation = 0;

setRotation = function(rotation) {
    $('.controller').css({
        '-ms-transform': 'rotate(' + rotation + 'deg)',
        '-webkit-transform': 'rotate(' + rotation + 'deg)',
        'transform': 'rotate(' + rotation + 'deg)'
    })

    // -90deg == 0.450ms && 90deg == 2.450ms in 20ms period
    period = 20;
    time = (rotation + 90) * 2 / 180 + 0.45;
    percentage = (((rotation + 90) / 180 + 1) * 100) / period;
    $('.rotation').text(rotation + '°');
    $('.period').text(period + 'ms');
    $('.time').text(time.toFixed(2) + 'ms');
    $('.percentage').text(percentage.toFixed(2) + '%');
    $('.voltage').css('width', percentage + '%');

    $.ajax({
      url: '/update',
      method: 'PUT',
      data: { angle: parseInt(time * 1000) }
    });
}

moveLeft = function() {
    if (currentRotation <= -90)
        return false

    currentRotation -= 10;

    setRotation(currentRotation);
}

moveRight = function() {
    if (currentRotation >= 90)
        return false

    currentRotation += 10;

    setRotation(currentRotation);
}

$(document).ready(function () {
    setRotation(currentRotation);
    $('.left').click(moveLeft);
    $('.right').click(moveRight);
    $(document).keydown(function(e) {
        e = e || window.event;
        if (e.keyCode == '37')
           moveLeft();
        if (e.keyCode == '39')
           moveRight();
    });
});
