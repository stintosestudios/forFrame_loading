

var sinWave = function () {

    var i = 0,
    points = [],
    bias = 1,
    len = 100,
    r = 0,
    rLen = 3,
    xOffset;

    // get the points
    while (r < rLen) {

        xOffset = 460 / rLen * r;

        points.push({
            x : 10 + xOffset,
            y : 180
        });

        i = 0;
        while (i < len + 1) {

            points.push({
                x : 10 + 460 / (len * rLen) * i + xOffset,
                y : 180 - 50 * bias * Math.sin(Math.PI * 2 * (i / len))
            });

            i += 1;

        }

        r += 1;
    }

    return points;

};

scene({

    maxFrame : 100,

    viewPort : {

        w : 480,
        h : 360

    },

    logo : {
        w : 128,
        h : 56,
        opacity : .4,
        skin : {
            imgIndex : 0,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    // define some parts
    parts : [{
            id : 'sinwave',
            w : 480,
            h : 360,
            forFrame(pt) {},
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part,
                    bias = Math.abs(.5 - this.percentDone) / .5,
                    points;

                    ctx.lineWidth = 3;

                    // red line
                    ctx.strokeStyle = 'rgba(255,0,0,1)';
                    ctx.beginPath();
                    ctx.moveTo(10, 180);
                    ctx.lineTo(470, 180);
                    ctx.stroke();

                    points = sinWave();

                    ctx.strokeStyle = 'rgba(255,255,255,1)';
                    ctx.beginPath();
                    points.forEach(function (point) {

                        ctx.lineTo(point.x, point.y);

                    });
                    ctx.stroke();

                }

            }

        }, {
            id : 'circle1',
            w : 32,
            h : 32,
            forFrame(pt) {

                var bias = Math.abs(.5 - this.percentDone) / .5,
                radian = Math.PI * 2 * this.percentDone,
                points = sinWave(),
                pointIndex = Math.floor(points.length * this.percentDone),
                pointPer = (points[pointIndex].y - (180 - 50)) / 100,
                radius = 32 + 96 * pointPer,
                cx = this.viewPort.w / 2 - pt.w / 2,
                cy = this.viewPort.h / 2 - pt.h / 2;

                pt.x = cx + Math.cos(radian) * radius;
                pt.y = cy + Math.sin(radian) * radius;

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,255,255,1)';
                    ctx.beginPath();
                    ctx.arc(pt.w / 2, pt.h / 2, pt.w / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();

                }
            }

        }

    ],

    // define the forFrame movement
    forFrame : function () {}

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('apparea');

scene.load(
    [
        '../mylogo_128.png'
    ],
    function (progress) {

    // uncomment to save as png
    if (progress === 1) {

        var playback = {

            appendRender : function (ctx) {},
            appendZ : 0,

            containerId : 'apparea',

            frameRate : 40
        };

        scene.injectUI(playback);

    }

});
