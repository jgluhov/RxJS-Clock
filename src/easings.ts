/**
 * Easings
 */
export type EasingFn = (t: number) => number;

export const elasticOut: EasingFn = (t: number): number => {
    return Math.sin((t + 1) * Math.PI / 2 * -13) * Math.pow(2, t * -10) + 1;
};
