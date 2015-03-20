window.onload = main;

function main() {
  var innerArc = new Arc({
    inner: 180,
    outer: 240,
    start: 0,
    end: Arc.arcLength(1),
    container: '#clock',
    name: 'inner'
  });

  var secondsArc = new Arc({
    inner: 180,
    outer: 200,
    start: 0,
    end: (Arc.arcLength(0)),
    transition: 500,
    container: '#clock',
    name: 'seconds'
  });

  var minutesArc = new Arc({
    inner: 200,
    outer: 220,
    start: 0,
    end: (Arc.arcLength(0)),
    transition: 500,
    container: '#clock',
    name: 'minutes'
  });

  var hoursArc = new Arc({
    inner: 220,
    outer: 240,
    start: 0,
    end: (Arc.arcLength(0)),
    transition: 500,
    container: '#clock',
    name: 'hours'
  });

  var clock = new Clock({
    width: 500,
    height: 500,
    innerArc: innerArc,
    secondsArc: secondsArc,
    minutesArc: minutesArc,
    hoursArc: hoursArc,
    container: '#clock'
  });

  clock.start();
};
