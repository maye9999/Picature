/**
 * Created by MaYe on 2016/6/2.
 */

function apply_theme_background(id, url, theme, theme_id) {
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

        } else if(operation.identifier === 'adjustments') {
            sdk.addOperation(new PhotoEditorSDK.Operations.BorderOperation(sdk, {
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