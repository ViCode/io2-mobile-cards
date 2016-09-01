import {
    Component,
    ElementRef,
    EventEmitter
} from '@angular/core';

import {
    Gesture
} from 'ionic-angular/gestures/gesture';

import * as Hammer from 'hammerjs';

@Component({
    template: '<ng-content></ng-content>',
    selector: 'card',
    inputs: ['orientation', 'fixed'],
    outputs: ['onRelease', 'onSwipe']
})
export class CardDirective {
    static get parameters() {
        return [
            [ElementRef]
        ];
    }
    constructor(el) {
        var self = this;
        self.onRelease = new EventEmitter();
        self.onSwipe = new EventEmitter();
        self.element = el.nativeElement;

        self.translate = (params) => {
            if (!self.fixed) {
                self.element.style["transition"] = "transform " + (params.time || 0) + "s ease";
                self.element.style["webkitTransform"] = "translate3d(" +
                    (params.x && (!self.orientation || self.orientation.indexOf("x") != -1) ? (params.x) : 0) +
                    "px, " +
                    (params.y && (!self.orientation || self.orientation.indexOf("y") != -1) ? (params.y) : 0) +
                    "px, 0) rotate(" +
                    params.rotate +
                    "deg)";
            }
        };

        self.onSwipeCb = (event) => {
            let rotate = ((event.deltaX * 20) / self.element.clientWidth);
            self.translate({
                x: event.deltaX,
                y: event.deltaY,
                rotate: rotate
            });
        }

        self.onReleaseCb = (event) => {
            self.element.style["transition"] = "transform 0.2s ease";
        };
    }

    ngOnInit() {
        var self = this;

        // Set subscriptions
        if (self.translateEvent) {
            self.translateEvent.subscribe((event) => {
                self.translate(event);
            });
        }

        // Set gestures
        self.swipeGesture = new Gesture(this.element, {
            recognizers: [
                [Hammer.Pan, {
                    direction: Hammer.DIRECTION_ALL
                }]
            ]
        });
        self.swipeGesture.listen();
        self.swipeGesture.on("pan", (event) => {
            if (!self.fixed) {
                if (self.onSwipeCb) {
                    self.onSwipeCb(event);
                }
                if (self.onSwipe) {
                    self.onSwipe.emit(event);
                }
            }
        });

        self.swipeGesture.on("panend", (event) => {
            if (!self.fixed) {
                if (self.onReleaseCb) {
                    self.onReleaseCb(event);
                }
                if (self.onRelease) {
                    self.onRelease.emit(event);
                }
            }
        });
    }

    ngAfterViewChecked() {
        let el = this.element;
        if (this.element.parentElement) {
            el.style['position'] = 'absolute';
            el.style['height'] = el.parentElement.clientHeight + 'px';
            el.style['width'] = el.parentElement.clientWidth + 'px';
            el.style['border-radius'] = el.style['border-radius'] || '2px';
            el.style['border'] = el.style['border'] || '1px solid white';
            el.style['box-shadow'] = el.style['box-shadow'] || '0 1px 3px rgba(0, 0, 0, 0.3)';
            el.style['transition'] = el.style['transition'] || 'transform 0.2s ease, -webkit-transform .2s ease';
            el.style['background-color'] = el.style['background-color'] || '#fff';
            el.style["transition"] = "transform 0.2s ease";
        }
    }

    ngOnDestroy() {
        this.swipeGesture.destroy();
    }

}
