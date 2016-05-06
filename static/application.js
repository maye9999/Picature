/* global PhotoEditorSDK, Image */

window.onload = function () {
  var editor
  function run (preferredRenderer) {
    editor = new PhotoEditorSDK.UI.ReactUI({
      preferredRenderer: preferredRenderer || 'webgl',
      container: document.querySelector('#container'),
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
      language: 'en'
    })
  }

  /**
   * Load initial image, initialize UI
   */
  var myImage = new Image()
  myImage.addEventListener('load', function () {
    run()
  })
  myImage.src = '/static/test.jpg'

  /**
   * Handle links
   */
  var webglLink = document.body.querySelector('#webgl')
  var canvasLink = document.body.querySelector('#canvas')
  webglLink.addEventListener('click', function (e) {
    e.preventDefault()
    editor.dispose()
    canvasLink.classList.remove('active')
    webglLink.classList.add('active')
    run('webgl')
  })

  canvasLink.addEventListener('click', function (e) {
    e.preventDefault()
    editor.dispose()
    webglLink.classList.remove('active')
    canvasLink.classList.add('active')
    run('canvas')
  })
}
