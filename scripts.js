/*
    (c)2024 by Huseyn Aliyev, Ibrahim Shadmanli
*/
let x, y, angle;
let canvas, context;

function initCanvas() {
    canvas = document.getElementById("art-canvas");
    context = canvas.getContext("2d");

    x = canvas.width / 2;
    y = canvas.height / 2;
    angle = 0.0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = 'black';

}
function radian(degree) {
    return degree * Math.PI / 180;
}
function moveForward(distance) {
    let a = radian(angle);

    context.beginPath();
    context.moveTo(x, y);
    x = x + distance * Math.cos(a);

    y = y + distance * Math.sin(a);
    context.lineTo(x, y);
    context.stroke();
}

function turnRight(degree) {  // double check if i got right and left right, i didnt do the L finger way of checking yet :)
    angle = angle - degree;
    if (angle < 0) angle = angle + 360;
}

function turnLeft(degree) {
    angle = angle + degree;
    if (angle > 360) angle = angle - 360;
}

function resetCanvas() {
    initCanvas();
}

function drawRandomColor() { // random color because why not
    context.strokeStyle = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`;
}

function drawKochSnowflake(iterations) {
    resetCanvas();
    drawRandomColor();     // colors will be random every time to be Awesome
    x = 125;
    y = 350;
    angle = 0;
    context.beginPath();
    context.moveTo(x, y);

    function kochCurve(length, depth) {   // I LOVE KOTCH CURVES!!!!!!!!!!
        if (depth === 0) {
            moveForward(length);
        } else {
            kochCurve(length / 3, depth - 1);
            turnLeft(60);
            kochCurve(length / 3, depth - 1);
            turnRight(120);
            kochCurve(length / 3, depth - 1);
            turnLeft(60);
            kochCurve(length / 3, depth - 1);

        }
    }
    for (let i = 0; i < 3; i++) { // draw 3 times so it looks like a snowflake
        kochCurve(400, iterations);
        turnRight(120);

    }

    context.stroke();
}

window.onload = initCanvas;