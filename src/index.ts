/**
 * Implementation of Clock by using RxJS and HTML5 Canvas
 */
import { Clock } from './clock';
import { animatedTime$ } from './time';

const canvas: HTMLCanvasElement = document.querySelector('#screen');

const clock: Clock = new Clock(canvas);

animatedTime$.subscribe(clock.render);
