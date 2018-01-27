/**
 * Implementation of Clock by using RxJS and HTML5 Canvas
 */
import { duration } from './animation';

const canvas: HTMLCanvasElement = document.querySelector('#screen');
const context: CanvasRenderingContext2D = canvas.getContext('2d');

const FONT_HEIGHT: number = 16;
const FONT: string = `${FONT_HEIGHT}px Consolas`;

const MARGIN: number = 50;
const NUMERAL_SPACING: number = 20;
const RADIUS: number = canvas.width / 2 - MARGIN;
const HAND_RADIUS: number = RADIUS + NUMERAL_SPACING;
const HAND_TRUNCATION: number = canvas.width / 25;
const HOUR_HAND_TRUNCATION: number = canvas.width / 10;

interface ITimeData {
    hour: number;
    minutes: number;
    seconds: number;
}

const timeData: ITimeData = {
    hour: 0,
    minutes: 0,
    seconds: 0
};

function clear(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(): void {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
    context.stroke();
}

function drawCenter(): void {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
    context.fill();
}

function drawNumerals(): void {
    const numerals: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    numerals.forEach((numeral: number) => {
        const angle: number = Math.PI / 6 * (numeral - 3);
        const numeralWidth: number = context.measureText(numeral.toString()).width;

        context.fillText(
            numeral.toString(),
            canvas.width / 2 + Math.cos(angle) * HAND_RADIUS - numeralWidth / 2,
            canvas.height / 2 + Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 4
        );
    });
}

function drawHand(time: number, stepAngle: number, radius: number): void {
    const angle: number = time * stepAngle - Math.PI / 2;

    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(
        canvas.width / 2 + Math.cos(angle) * radius,
        canvas.height / 2 + Math.sin(angle) * radius
    );
    context.stroke();
}

function drawHands(time: ITimeData): void {
    drawHand(time.hour, Math.PI * 2 / 12, RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION);
    drawHand(time.minutes, Math.PI * 2 / 60, RADIUS - HAND_TRUNCATION);
    drawHand(time.seconds, Math.PI * 2 / 60, RADIUS - HAND_TRUNCATION);
}

function updateTime(): void {
    const date: Date = new Date();
    timeData.hour = date.getHours() % 12;
    timeData.minutes = date.getMinutes();
    timeData.seconds = date.getSeconds();
}

function init(): void {
    context.font = FONT;
}

function drawClock(): void {
    clear();

    drawCircle();
    drawCenter();
    drawNumerals();

    updateTime();

    drawHands(timeData);

    requestAnimationFrame(drawClock);
}

init();
drawClock();
