/**
 * Created by MaYe on 2016/6/2.
 */

function apply_theme_and_update(id, url, theme, theme_id) {
    var image = new Image();

    image.addEventListener('load', function() {
        const sdk = new PhotoEditorSDK('webgl', {image : image});
        theme2stack(sdk, theme);
        sdk.export().then(function(image) {
            $.post('/images/change/', {
                "id": id,
                "image": image,
                "theme_id": theme_id
            }).success(function() {
                alert("Done!");
            });
        });
    });
    image.src = url;
}


function apply_theme_to_canvas(image, theme) {
    var newImage = new Image();
    newImage.addEventListener('load', function() {

        const sdk = new PhotoEditorSDK('webgl', {
            image: newImage
        });
        console.log(theme);
        theme2stack(sdk, theme);
        sdk.export(PhotoEditorSDK.RenderType.IMAGE).then(function(i) {
            var canvas = document.getElementById('preview_canvas');
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(image.width / image.height > canvas.width / canvas.height) {
                ctx.drawImage(image, 0, 0.5 * (canvas.height - image.height / image.width * canvas.width), canvas.width, image.height / image.width * canvas.width);
            } else {
                ctx.drawImage(image, 0.5 * (canvas.width - image.width / image.height * canvas.height), 0, image.width / image.height * canvas.height, canvas.height);
            }
            image.src = i.src;
            window.complete_num += 1;
            run_done();
        });
    });
    newImage.src = image.src;
}


function upload_img_to_server(image, theme_id) {
    var imageData = getBase64Image(image);
    $.post('/images/upload/', {
        "image": imageData,
        "theme_id": theme_id
    }).success(function() {
        console.log("done!");
    });
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    return canvas.toDataURL("image/png");
}

function stack2theme(stack) {
    var theme = [];
    stack.forEach(function(operation) {
        console.log(operation.constructor.identifier);
        console.log(operation.getOptions());
        if (operation.constructor.identifier === 'filter') {
            switch (operation.getOptions().filter.identifier) {
                case "celsius":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "celsius",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "chest":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "chest",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "fixie":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "fixie",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "lenin":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "lenin",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "pola":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "pola",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "pola669":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "pola669",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "bw":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "bw",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "bwhard":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "bwhard",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "x400":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "x400",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "front":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "front",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "mellow":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "mellow",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "semired":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "semired",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "sunny":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "sunny",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "texas":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "texas",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "a15":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "a15",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "breeze":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "breeze",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "fridge":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "fridge",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "orchid":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "orchid",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "quozi":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "quozi",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "food":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "food",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "glam":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "glam",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "lomo":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "lomo",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                case "gobblin":
                    theme.push({
                        identifier: operation.constructor.identifier,
                        name      : "gobblin",
                        intensity : operation.getOptions().intensity
                    });
                    break;
                default:
                    alert(operation.getOptions().filter.identifier);
                    break;
            }
        } else if (operation.constructor.identifier === 'adjustments') {
            theme.push({
                identifier : operation.constructor.identifier,
                brightness : operation.getBrightness(),
                saturation : operation.getSaturation(),
                contrast : operation.getContrast()
            })
        } else if(operation.constructor.identifier === 'radial-focus') {
            theme.push({
                identifier : operation.constructor.identifier,
                blurRadius : operation.getBlurRadius(),
                gradientRadius : operation.getGradientRadius(),
                x : operation.getPosition().x,
                y : operation.getPosition().y,
                radius : operation.getRadius()
            })
        } else if(operation.constructor.identifier === 'linear-focus') {
            theme.push({
                identifier : operation.constructor.identifier,
                blurRadius : operation.getBlurRadius(),
                start_x : operation.getStart().x,
                start_y : operation.getStart().y,
                end_x : operation.getEnd().x,
                end_y : operation.getEnd().y,
                size : operation.getSize(),
                gradientSize : operation.getGradientSize()
            })
        } else if(operation.constructor.identifier === 'border') {
            theme.push({
                identifier : operation.constructor.identifier,
                color : operation.getColor(),
                thickness : operation.getThickness()
            })
        }
    });
    return theme;
}


function theme2stack(sdk, theme) {
    var stack = JSON.parse(theme).reverse();
    stack.forEach(function(operation) {
        if(operation.identifier === 'filter') {
            switch (operation.name) {
                case "celsius":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.CelsiusFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "chest":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.ChestFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "fixie":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.FixieFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "lenin":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.LeninFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "pola":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.PolaFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "pola669":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.Pola669Filter,
                        intensity: operation.intensity
                    }));
                    break;
                case "bw":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.BWFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "bwhard":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.BWHardFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "x400":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.X400Filter,
                        intensity: operation.intensity
                    }));
                    break;
                case "front":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.FrontFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "mellow":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.MellowFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "semired":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.SemiredFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "sunny":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.SunnyFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "texas":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.TexasFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "a15":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.A15Filter,
                        intensity: operation.intensity
                    }));
                    break;
                case "breeze":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.BreezeFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "fridge":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.FridgeFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "orchid":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.OrchidFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "quozi":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.QuoziFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "food":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.FoodFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "glam":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.GlamFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "lomo":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.LomoFilter,
                        intensity: operation.intensity
                    }));
                    break;
                case "gobblin":
                    sdk.addOperation(new PhotoEditorSDK.Operations.FilterOperation(sdk, {
                        filter: PhotoEditorSDK.Filters.GobblinFilter,
                        intensity: operation.intensity
                    }));
                    break;
            }
        } else if(operation.identifier === 'adjustments') {
            sdk.addOperation(new PhotoEditorSDK.Operations.AdjustmentsOperation(sdk, {
                brightness: operation.brightness,
                saturation: operation.saturation,
                contrast: operation.contrast
            }));
        } else if(operation.identifier === 'radial-focus') {
            sdk.addOperation(new PhotoEditorSDK.Operations.RadialFocusOperation(sdk, {
                blurRadius: operation.blurRadius,
                gradientRadius: operation.gradientRadius,
                radius: operation.radius,
                position: new PhotoEditorSDK.Math.Vector2(operation.x, operation.y)
            }));
        } else if(operation.identifier === 'linear-focus') {
            sdk.addOperation(new PhotoEditorSDK.Operations.LinearFocusOperation(sdk, {
                blurRadius: operation.blurRadius,
                size: operation.size,
                gradientSize: operation.gradientSize,
                start: new PhotoEditorSDK.Math.Vector2(operation.start_x, operation.start_y),
                end: new PhotoEditorSDK.Math.Vector2(operation.end_x, operation.end_y)
            }));
        } else if(operation.identifier === 'border') {
            sdk.addOperation(new PhotoEditorSDK.Operations.BorderOperation(sdk, {
                color: operation.color,
                thickness: operation.thickness
            }));
        }
    });
}
