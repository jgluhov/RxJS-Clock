/**
 * Clock animation unitls
 */
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators/map';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { animationFrame } from 'rxjs/scheduler/animationFrame';

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
