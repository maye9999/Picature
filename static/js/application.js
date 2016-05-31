/* global PhotoEditorSDK, Image */

window.onload = function() {
  function run(preferredRenderer) {
    editor = new PhotoEditorSDK.UI.ReactUI({
      preferredRenderer : preferredRenderer || 'webgl',
      container : document.querySelector('#editor-container'),
      image : myImage,
      webcam : false,
      maxMegaPixels : {desktop : 100},
      logLevel : 'info',
      assets : {
        baseUrl : '/static/assets',
        resolver : function(path) { return path }
      },
      controlsOptions : {
        filter : {selectableFilters : [ 'a15', 'gobblin', 'custom-filter' ]}
      },
      language : 'en',
      export : {download : false, type : PhotoEditorSDK.RenderType.DATAURL}
    })
  }

  /**
   * Load initial image, initialize UI
   */
  myImage = new Image();
  var imageData;
  myImage.addEventListener('load', function() {
    run();
    editor.on('export', function(dataURL, editor) {
      imageData = dataURL;
      $('#nameModal').modal();
      stack = editor.getOperationsStack()
    });
  });
  myImage.src = '/static/test.jpg';

  $("#export-image").on('click', function() {
    theme = new Array();
    console.log('User used operations:');
    stack.forEach(function(operation) {
      console.log(operation.constructor.identifier);
      console.log(operation.getOptions());
      if (operation.constructor.identifier === 'filter') {
        theme.push({
          identifier : operation.constructor.identifier,
          intensity : operation.getOptions().intensity,
        })
      } else if (operation.constructor.identifier === 'adjustments') {
        theme.push({
          identifier : operation.constructor.identifier,
          brightness : operation.getBrightness(),
          saturation : operation.getSaturation(),
          contrast : operation.getContrast()
        })
      }
    })
    console.log("user theme :");
    console.log(theme);
    var image_name = $("#image-name").val();
    var theme_name = $("#theme-name").val();
    $.post('/images/upload/', {
        "image" : imageData,
        "image_name" : image_name,
        "theme" : theme,
        "theme_name" : theme_name
    }).done(function() {
        console.log('saved!');
    });
  });

  // newImage = new Image();
  // newImage.addEventListener('load', function() {
  //   const sdk = new PhotoEditorSDK('webgl', {image : newImage});
  //   const oop = new PhotoEditorSDK.Operations.OrientationOperation(sdk, {
  //     flipHorizontally : true,
  //     flipVertically : true,
  //   });
  //   const fop = new PhotoEditorSDK.Operations.FilterOperation(
  //       sdk, {filter : PhotoEditorSDK.Filters.FridgeFilter});
  //   const aop = new PhotoEditorSDK.Operations.AdjustmentsOperation(
  //       sdk, {brightness : 0.5, saturation : 0.3, contrast : 0.5});
  //   console.log(aop.getDefaultOptions());
  //   console.log(aop.getOptions());
  //   sdk.addOperation(oop);
  //   sdk.addOperation(aop);
  //   sdk.export(PhotoEditorSDK.RenderType.IMAGE, // Export as `Image` object
  //              PhotoEditorSDK.ImageFormat.JPEG, // Export as JPEG
  //              0.8                              // JPEG quality: 80%
  //              )
  //       .then(function(image) {  })
  // });
  // newImage.src = '/static/cover.jpg';
};
