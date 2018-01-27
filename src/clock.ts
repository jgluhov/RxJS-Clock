/**
 * Clock
 */
import { ITime } from './time';

export class Clock {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private numerals: number[] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
    private MARGIN: number = 50;
    private NUMERAL_SPACING: number = 20;
    private FONT_HEIGHT: number = 16;
    private FONT: string;
    private RADIUS: number;
    private HAND_RADIUS: number;
    private HAND_TRUNCATION: number;
    private HOUR_HAND_TRUNCATION: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.FONT = `${this.FONT_HEIGHT}px Consolas`;
        this.RADIUS = this.canvas.width / 2 - this.MARGIN;
        this.HAND_RADIUS = this.RADIUS + this.NUMERAL_SPACING;
        this.HAND_TRUNCATION = this.canvas.width / 25;
        this.HOUR_HAND_TRUNCATION = this.canvas.width / 10;

        this.context = this.canvas.getContext('2d');

        this.init();
    }

    public render = (time: ITime): void => {
        this.clear();
        this.drawCircle();
        this.drawNumerals();
        this.drawCenter();
        this.drawHands(time);
    }

    private init(): void {
        this.context.font = this.FONT;
    }

    private clear(): void {
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    private drawCircle(): void {
        this.context.beginPath();
        this.context.arc(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.RADIUS,
            0,
            Math.PI * 2,
            true
        );
        this.context.stroke();
    }

    private drawCenter(): void {
        this.context.beginPath();
        this.context.arc(
            this.canvas.width / 2,
            this.canvas.height / 2,
            5,
            0,
            Math.PI * 2,
            true
        );
        this.context.fill();
    }

    private drawNumerals(): void {
        this.numerals.forEach((numeral: number) => {
            const angle: number = Math.PI / 6 * (numeral - 3);
            const numeralWidth: number = this.context.measureText(numeral.toString()).width;

            this.context.fillText(
                numeral.toString(),
                this.canvas.width / 2 + Math.cos(angle) * this.HAND_RADIUS - numeralWidth / 2,
                this.canvas.height / 2 + Math.sin(angle) * this.HAND_RADIUS + this.FONT_HEIGHT / 4
            );
        });
    }

    private drawHand(time: number, stepAngle: number, radius: number): void {
        const angle: number = time * stepAngle - Math.PI / 2;

        this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
        this.context.lineTo(
            this.canvas.width / 2 + Math.cos(angle) * radius,
            this.canvas.height / 2 + Math.sin(angle) * radius
        );
        this.context.stroke();
    }

    private drawHands(time: ITime): void {
        this.drawHand(
            time.hours,
            Math.PI * 2 / 12,
            this.RADIUS - this.HAND_TRUNCATION - this.HOUR_HAND_TRUNCATION
        );
        this.drawHand(
            time.minutes,
            Math.PI * 2 / 60,
            this.RADIUS - this.HAND_TRUNCATION
        );
        this.drawHand(
            time.seconds,
            Math.PI * 2 / 60,
            this.RADIUS - this.HAND_TRUNCATION
        );
    }
}
