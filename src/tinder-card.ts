import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
}
from '@angular/core';

import {
    CardDirective
} from './card';

@Component({
    template: ' \
  <div *ngIf="overlay" class="card-heap tinder-overlay" [style.background-color]="overlay[like ? \'like\' : \'dislike\'].backgroundColor"> \
    <img src="{{overlay[like ? \'like\' : \'dislike\'].img}}" /> \
  </div> \
  <ng-content></ng-content> \
  ',
    selector: 'mb-tinder-card',
    styles: ['.tinder-overlay { \
    transform: translateZ(0); \
    opacity: 0; \
    border-radius: 2px; \
    position: absolute; \
    width: calc(100%); \
    height: calc(100%); \
    top: 0; \
    left: 0; \
    display: flex; \
    align-items: center; \
    justify-content: center; \
    overflow: hidden; \
    color: white; \
  } .tinder-overlay img { \
    width:60px \
  }', ':host {\
    transition: transform 1s ease;\
  }\
  :host:nth-child(1) {\
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\
    z-index:3;\
    transform: perspective(400px) translate3d(0, 0px, 0px);\
  }\
  :host:nth-child(2) {\
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\
    z-index:2;\
    transform: perspective(400px) translate3d(0, 30px, -30px);\
  }\
  :host:nth-child(3) {\
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\
    z-index:1;\
    transform: perspective(400px) translate3d(0, 60px, -60px);\
  }\
  :host:nth-child(n+4) {\
    box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;\
    transform: perspective(400px) translate3d(0, 30px, -30px);\
  }\
']
})
export class TinderCardDirective extends CardDirective {

    @Input() overlay: any;
    @Input() onLike: EventEmitter<any>;
    @Output() onReleaseLike: EventEmitter<any> = new EventEmitter();
    @Output() onSwipeLike: EventEmitter<any> = new EventEmitter();

    like: boolean;

    constructor(el: ElementRef) {
        super(el);
        var self = this;
        self.orientation = "x";
        self.onReleaseLikeCb = (event) => {
            self.like = event.like;
            let el = self.element;
            let x = (el.offsetWidth + el.clientWidth) * ((!!event.like ? 1 : -1) || 0);
            let rotate = (x * 20) / el.clientWidth;
            self.translate({
                x: x,
                y: 0,
                rotate: rotate,
                time: 0.8
            });

            if (self.overlay) {
                let overlayElm = <HTMLElement>self.element.querySelector('.tinder-overlay');
                overlayElm.style["transition"] = "opacity 0.6s ease";
                overlayElm.style["opacity"] = "0.5";
            }
        };
        self.onSwipeLikeCb = (event) => {
            if (self.overlay) {
                let overlayElm = <HTMLElement>self.element.querySelector('.tinder-overlay');
                overlayElm.style["transition"] = "opacity 0s ease";
                let opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / self.element.offsetWidth;
                overlayElm.style.opacity = opacity.toString();
            }
        };
    }

    onReleaseLikeCb(event: any) {
        this.like = event.like;
        let el = this.element;
        let x = (el.offsetWidth + el.clientWidth) * ((!!event.like ? 1 : -1) || 0);
        let rotate = (x * 20) / el.clientWidth;
        this.translate({
            x: x,
            y: 0,
            rotate: rotate,
            time: 0.8
        });

        if (this.overlay) {
            let overlayElm = <HTMLElement>this.element.querySelector('.tinder-overlay');
            overlayElm.style["transition"] = "opacity 0.6s ease";
            overlayElm.style.opacity = "0.5";
        }
    }

    onSwipeLikeCb(event: any) {
        if (this.overlay) {
            let overlayElm = <HTMLElement>this.element.querySelector('.tinder-overlay');
            overlayElm.style["transition"] = "opacity 0s ease";
            let opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / this.element.offsetWidth;
            overlayElm.style.opacity = opacity.toString();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        var self = this;

        self.onRelease.subscribe((event: any) => {
            let halfClientWidth = self.element.clientWidth / 2;
            let isOut = event.deltaX > halfClientWidth || event.deltaX < (-1 * halfClientWidth);
            if (isOut) {
                this.like = event.like = event.deltaX > 0;
                if (this.onReleaseLikeCb) {
                    this.onReleaseLikeCb(event);
                }
                if (this.onReleaseLike) {
                    this.onReleaseLike.emit(event);
                }
            } else {
                if (this.overlay) {
                    let overlayElm = <HTMLElement>self.element.querySelector('.tinder-overlay');
                    overlayElm.style["transition"] = "opacity 0.2s ease";
                    overlayElm.style.opacity = "0";
                }
                this.translate({
                    x: 0,
                    y: 0,
                    rotate: 0,
                    time: 0.2
                });
            }
        });

        this.onSwipe.subscribe((event: any) => {
            this.like = event.like = event.deltaX > 0;
            if (this.onSwipeLikeCb) {
                this.onSwipeLikeCb(event);
            }
            if (this.onSwipeLike) {
                this.onSwipeLike.emit(event);
            }
        });

        if (this.onLike) {
            this.onLike.subscribe((event: any) => {
                this.onReleaseLikeCb(event);
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        var self = this;
        self.onLike.unsubscribe();
    }
}
