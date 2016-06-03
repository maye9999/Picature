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
      //controlsOptions : {
      //  filter : {selectableFilters : [ 'a15', 'gobblin', 'custom-filter' ]}
      //},
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
    console.log('User used operations:');
    var theme = stack2theme(stack);
    console.log("user theme :");
    console.log(theme);
    var theme_description = $("#theme_description").val();
    var theme_name = $("#theme_name").val();
    var theme_private = $("#theme_private").val();
    $.post('/images/upload/', {
        "image" : imageData,
        "theme_description" : theme_description,
        "theme" : JSON.stringify(theme),
        "theme_name" : theme_name,
        "theme_private" : theme_private
    }).done(function() {
        console.log('saved!');
        location.href = '/timeline';
    });
  });
};

