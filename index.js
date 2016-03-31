(function(){

  'use strict';

  var canvas = document.getElementById('js-canvas'),
      filter = document.getElementById('js-filter');

  var context = canvas.getContext('2d');

  //----------------------------------------------------------------------------

  var operation = operative(function(pixels) {
    var deferred = this.deferred(),
        x, y;

    for (y = 0; y < 500; ++y) {
      for (x = 0; x < 250; ++x) {
        pixels.data[y * 4 + 0 /* R */ + x * 500 /* height */ * 4] = 0;
        pixels.data[y * 4 + 1 /* G */ + x * 500 /* height */ * 4] = 0;
      }
    }

    deferred.fulfill(pixels);
  });

  //----------------------------------------------------------------------------

  function clickFilterHandler() {
    operation(
      context.getImageData(0, 0, 250, 500)
    )
    .then(function(pixels) {
      context.putImageData(pixels, 0, 0);
    })
    ['catch'](function(err) {
      console.error(err);
    });
  }

  //----------------------------------------------------------------------------

  Promise
    .resolve()
    .then(function() {
      return new Promise(function(resolve, reject) {
        var image = new Image();

        image.onabort = reject;
        image.onerror = reject;

        image.onload = function() {
          resolve(image);
        };
        image.src = 'image.jpg';

        if (image.naturalWidth) {
          resolve(image);
        }
      });
    })
    .then(function(image) {
      context.drawImage(image, 0, 0);
    })
    .then(function() {
      filter.addEventListener('click', clickFilterHandler, false);
    })
    ['catch'](function(err) {
      console.error(err);
    });

}());
