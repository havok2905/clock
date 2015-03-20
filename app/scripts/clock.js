var Clock = function(options) {
  this.width = options.width;
  this.height = options.height;
  this.innerArc = options.innerArc;
  this.secondsArc = options.secondsArc;
  this.minutesArc = options.minutesArc;
  this.hoursArc = options.hoursArc;
  this.container = options.container;

  this.seconds = 0;

  d3
    .select(options.container)
    .attr('width', options.width)
    .attr('height', options.height)
    .append('g')
    .attr("transform", "translate(" + options.width / 2 + "," + options.height / 2 + ")");

  d3
    .select(options.container)
    .select('g')
    .append('text')
    .attr('text-anchor', 'middle');

  d3
    .select(options.container)
    .select('g')
    .select('text')
    .append('tspan')
    .attr('id', 'hours-text');

  d3
    .select(options.container)
    .select('g')
    .select('text')
    .append('tspan')
    .text(':');

  d3
    .select(options.container)
    .select('g')
    .select('text')
    .append('tspan')
    .attr('id', 'minutes-text');

  d3
    .select(options.container)
    .select('g')
    .select('text')
    .append('tspan')
    .text(':');

  d3
    .select(options.container)
    .select('g')
    .select('text')
    .append('tspan')
    .attr('id', 'seconds-text');
};

Clock.percentSeconds = function(seconds) {
  return (seconds % 60) / 60;
};

Clock.percentMinutes = function(seconds) {
  return (seconds % 3600) / 3600;
};

Clock.percentHours = function(seconds) {
  return (seconds % 86400) / 86400;
};

Clock.numSeconds = function(seconds) {
  return seconds % 60;
}

Clock.numMinutes = function(seconds) {
  return Math.floor(seconds % 3600 / 60);
};

Clock.numHours = function(seconds) {
  return Math.floor(seconds % 86400 / 3600);
};

Clock.leadingZeros = function(num) {
  var sNum = String(num);
  while ( sNum.length < 2 ) {
    sNum = "0" + sNum;
  }
  return sNum;
}

Clock.prototype.render = function() {
  this.secondsArc.update(Clock.percentSeconds(this.seconds));
  this.minutesArc.update(Clock.percentMinutes(this.seconds));
  this.hoursArc.update(Clock.percentHours(this.seconds));

  d3
    .select(this.container)
    .select('#seconds-text')
    .text(Clock.leadingZeros(Clock.numSeconds(this.seconds)));

  d3
    .select(this.container)
    .select('#minutes-text')
    .text(Clock.leadingZeros(Clock.numMinutes(this.seconds)));

  d3
    .select(this.container)
    .select('#hours-text')
    .text(Clock.leadingZeros(Clock.numHours(this.seconds)));
};

Clock.prototype.tick = function() {
  this.seconds++;
  this.render();
};

Clock.currentSeconds = function() {
  var d = new Date(Date.now());
  return d.getSeconds() + d.getMinutes()*60 + d.getHours()*60*60;
};

Clock.prototype.start = function() {
  this.seconds = Clock.currentSeconds();
  this.innerArc.render();
  this.secondsArc.render();
  this.minutesArc.render();
  this.hoursArc.render();
  this.render();
  setInterval(this.tick.bind(this), 1000);
}
