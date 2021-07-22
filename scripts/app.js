const touch = matchMedia('(hover: none)').matches;
console.log('Touch screen detected: ' + touch)
if (touch) {
    particlesJS.load('particles-js', './assets/particles-mobile.json', function() {
        console.log('callback - particles-mobile.js config loaded');
      });
} else {
    particlesJS.load('particles-js', './assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
}