/**
 * Implementation of Clock by using RxJS and HTML5 Canvas
 */
const canvas: HTMLCanvasElement = document.querySelector('#screen');
const context: CanvasRenderingContext2D = canvas.getContext('2d');

const MARGIN: number = 50;
const RADIUS: number = canvas.width / 2 - MARGIN;

function drawCircle(): void {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
    context.stroke();
}

function drawClock(): void {
    drawCircle();
}

drawClock();
