import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import {
    Gesture
} from 'ionic-angular/gestures/gesture';


@Component({
    template: '<ng-content></ng-content>',
    selector: 'mb-card'
})
export class CardDirective {
    @Input() orientation: String = 'xy';
    @Input() fixed: Boolean = false;
    @Output() onRelease: EventEmitter<any> = new EventEmitter();
    @Output() onSwipe: EventEmitter<any> = new EventEmitter();

    element: HTMLElement;
    swipeGesture: Gesture;

    constructor(private el: ElementRef) {
        this.element = el.nativeElement;
    }

    translate(params: any) {
        if (!this.fixed) {
            this.element.style["transition"] = "transform " + (params.time || 0) + "s ease";
            this.element.style["webkitTransform"] = "translate3d(" +
                (params.x && (!this.orientation || this.orientation.indexOf("x") != -1) ? (params.x) : 0) +
                "px, " +
                (params.y && (!this.orientation || this.orientation.indexOf("y") != -1) ? (params.y) : 0) +
                "px, 0) rotate(" +
                params.rotate +
                "deg)";
        }
    }

    onSwipeCb(event: any) {
        let rotate = ((event.deltaX * 20) / this.element.clientWidth);
        this.translate({
            x: event.deltaX,
            y: event.deltaY,
            rotate: rotate
        });
    }

    onReleaseCb(event: any) {
        this.element.style["transition"] = "transform 0.2s ease";
    }

    ngOnInit() {

        // Set gestures
        this.swipeGesture = new Gesture(this.element);
        this.swipeGesture.listen();
        this.swipeGesture.on("pan", (event: any) => {
            if (!this.fixed) {
                if (this.onSwipeCb) {
                    this.onSwipeCb(event);
                }
                if (this.onSwipe) {
                    this.onSwipe.emit(event);
                }
            }
        });

        this.swipeGesture.on("panend", (event: any) => {
            if (!this.fixed) {
                if (this.onReleaseCb) {
                    this.onReleaseCb(event);
                }
                if (this.onRelease) {
                    this.onRelease.emit(event);
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
