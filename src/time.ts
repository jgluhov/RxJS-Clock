import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { interval } from 'rxjs/observable/interval';
import { distinctUntilChanged, map, share, skip, startWith } from 'rxjs/operators';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { tween } from './animation';
import { elasticOut } from './easings';

/**
 * RxJS Clock
 */
export interface ITime {
    hours: number;
    minutes: number;
    seconds: number;
}

const DURATION: number = 900;

const getHours: () => number = (): number => new Date().getHours() % 12;
const getMinutes: () => number = (): number => new Date().getMinutes();
const getSeconds: () => number = (): number => new Date().getSeconds();

const ticks$: Observable<number> = interval(0, animationFrame)
    .pipe(share());

function listenTo(
    getData: () => number,
    skipTimes: number = 0
): Observable<number> {
    return ticks$
        .pipe(
            map(getData),
            distinctUntilChanged(),
            skip(skipTimes)
        );
}

const hours$: Observable<number> = listenTo(getHours);
const minutes$: Observable<number> = listenTo(getMinutes);
const seconds$: Observable<number> = listenTo(getSeconds);

const animatedHours$: Observable<number> = tween(DURATION, elasticOut)(hours$)
    .pipe(startWith(new Date().getHours() % 12));

const animatedMinutes$: Observable<number> = tween(DURATION, elasticOut)(minutes$)
    .pipe(startWith(new Date().getMinutes()));

const animatedSeconds$: Observable<number> = tween(DURATION, elasticOut)(seconds$);

export const animatedTime$: Observable<ITime> = combineLatest(
    animatedHours$, animatedMinutes$, animatedSeconds$,
    (hours: number, minutes: number, seconds: number) => {
        return {
            hours,
            minutes,
            seconds
        };
    }
);
