/**
 * Clock animation unitls
 */
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/operators/concat';
import { map } from 'rxjs/operators/map';
import { pairwise } from 'rxjs/operators/pairwise';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { EasingFn, elasticOut } from './easings';

type DistanceFn = (t: number) => number;

function distance(d: number): DistanceFn {
    return (t: number): number => d * t;
}

export const elapsed$: Observable<number> = defer(() => {
    const start: number = animationFrame.now();

    return interval(0, animationFrame)
        .pipe(map(() => {
            return animationFrame.now() - start;
        }));
});

export function duration(ms: number): Observable<number> {
    return elapsed$
        .pipe(
            map((ems: number) => {
                return ems / ms;
            }),
            takeWhile((t: number) => {
                return t <= 1;
            })
        );
}

export function animate(
    [previous, next]: [number, number]
): Observable<number> {
    return duration(900)
        .pipe(
            map(elasticOut),
            map(distance(next - previous)),
            map((v: number) => {
                return (previous + v);
            })
        );
}

export function tween(ms: number, easing: EasingFn): Function {
    return (source$: Observable<number>): Observable<number> => {
        return source$
            .pipe(
                pairwise(),
                switchMap(animate)
            );
    };
}
