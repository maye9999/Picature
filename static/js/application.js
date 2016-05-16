/* global PhotoEditorSDK, Image */

window.onload = function () {
  var editor;
  function run (preferredRenderer) {
    editor = new PhotoEditorSDK.UI.ReactUI({
      preferredRenderer: preferredRenderer || 'webgl',
      container: document.querySelector('#editor-container'),
      image: myImage,
      maxMegaPixels: {
        desktop: 100
      },
      logLevel: 'info',
      assets: {
        baseUrl: '/static/assets',
        resolver: function (path) {
          return path
        }
      },
      language: 'en',
      export: {
        download: false,
        type: PhotoEditorSDK.RenderType.DATAURL
      }
    })
  }

  /**
   * Load initial image, initialize UI
   */
  var myImage = new Image();
  myImage.addEventListener('load', function () {
    run();
    editor.on('export', function(dataURL) {
      $.post('/images/upload/', {"image": dataURL}).done(function() {
        console.log('saved!');
      })
    });
  });
  myImage.src = '/static/test.jpg';




};
