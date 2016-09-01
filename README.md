# Mobile Cards

This project offers card components for Ionic2. For now, only tinder cards are implemented.

Install
---------

```bash
npm install --save io2-mobile-cards
```

Demo
---------
https://github.com/ViCode/card-demo

Usage
---------

```html
<tinder-card *ngFor="let item of list;let i = index" (onReleaseLike)="onCardRelease($event)" [onLike]="item.likeEvent" class="card-heap" [overlay]="{like:{backgroundColor:'green', img:'img/like.png'}, dislike:{backgroundColor:'red', img:'img/dislike.png'}}" [fixed]="i != 0">
  <span>
    {{item.name}}
  </span>
</tinder-card>
```

Display the cards according to your need by using the tinder-car API:
onReleaseLike: this ouput event will be thrown when the card is liked or disliked.
onLike: this input event will launch the liked or disliked event and swipe the card out of the screen.
overlay: this input object will initialize an overlay above the card which display a color and an image when swiping the card. This is really optional.
fixed: this input boolean indicates if the card is swipable or not.

You can insert the content of the card between the tinder-card tags.

```javascript
constructor() {
    var self = this;

    self.list = []; // we use the list array to store the card's datas
    self.maxItems = 12;

    this.refresh = () => {
        self.list.length = 0;
        for (var i = 0; i < self.maxItems; i++) {
            self.list.push({
                name: (i + 1),
                likeEvent: new EventEmitter()
            });
        }
    };

    //

    this.like = (like) => {
        var item = self.list[0];
        if (self.list.length > 0) {
            item.likeEvent.emit({
                like: like
            });
            setTimeout(() => {
                self.list.splice(0, 1);
            }, 200);
        }
    };
    this.onCardRelease = (event) => {
        setTimeout(function() {
            self.list.splice(0, 1);
        }, 200);
    };

    this.refresh();
}
```
