/**
 * Clock Hand instance
 */
export class Hand {
    public angle: number;
    public time: number = 0;
    public length: number;

    constructor(angle: number, length: number) {
        this.angle = angle;
        this.length = length;
    }
}
