/* global PhotoEditorSDK, Image */

window.onload = function () {
  var editor;
  function run (preferredRenderer) {
    editor = new PhotoEditorSDK.UI.ReactUI({
      preferredRenderer: preferredRenderer || 'webgl',
      container: document.querySelector('#editor-container'),
      image: myImage,
      webcam: false,
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
  var imageData;
  myImage.addEventListener('load', function () {
    run();

    editor.on('export', function(dataURL) {
      imageData = dataURL;
      $('#nameModal').modal();
    });
  });
  myImage.src = '/static/test.jpg';


  $("#export-image").on('click', function() {
    var image_name = $("#image-name").val();
    $.post('/images/upload/', {"image": imageData, "image_name": image_name}).done(function() {
      console.log('saved!');
    });

  })


};
