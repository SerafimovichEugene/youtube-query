export default class Swipe {

    constructor() {

        this.touchStartCoords = {
            'x': -1,
            'y': -1
        }; 
        this.touchEndCoords = {
            'x': -1,
            'y': -1
        }; 
        this.direction = 'undefined'; 
        this.minDistanceXAxis = 30; 
        this.maxDistanceYAxis = 30; 
        this.maxAllowedTime = 10000; 
        this.startTime = 0; 
        this.elapsedTime = 0; 
        this.onToLeft = new Event('toLeft');
        this.onToRight = new Event('toRight');
        this.endOfPage = new Event('endOfPage');
        this.updateSwipe();
        this.setSwipe();
    }

    updateSwipe(fromLeft, fromRight, currentPage) {
        this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
        this.currentElemNum = currentPage;
        this.fromRigth = fromRight;
        this.fromLeft = fromLeft;
    }

    setSwipe() {

        this.addMultipleListeners(document.getElementById('youtubeElemsWrapper'), 'mousedown touchstart', () => {
            this.swipeStart();
        });
        this.addMultipleListeners(document.getElementById('youtubeElemsWrapper'), 'mousemove touchmove', () => {
            this.swipeMove();
        });
        this.addMultipleListeners(document.getElementById('youtubeElemsWrapper'), 'mouseup touchend', () => {
            this.swipeEnd();
        });
    }

    toLeft() {

        if (this.fromRigth) {
            this.currentElem.className = 'moveToLeft';
            this.currentElemNum += 1;
            document.getElementById('youtubeElemsWrapper').children[this.currentElemNum].className = 'currentYoutubeElem moveFromRight';
            this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
            this.fromRigth -= 1;
            this.fromLeft += 1;
            document.dispatchEvent(this.onToLeft);
        } else {
            document.dispatchEvent(this.endOfPage);
        }
    }

    toRight() {

        if (this.fromLeft) {
            this.currentElem.className = 'moveToRight';
            this.currentElemNum -= 1;
            document.getElementById('youtubeElemsWrapper').children[this.currentElemNum].className = 'currentYoutubeElem moveFromLeft';
            this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
            this.fromRigth += 1;
            this.fromLeft -= 1;

            document.dispatchEvent(this.onToRight);
        }
    }

    swipeStart(e) {
        e = e ? e : window.event;
        e = ('changedTouches' in e) ? e.changedTouches[0] : e;
        this.touchStartCoords = {
            'x': e.pageX,
            'y': e.pageY
        };
        this.startTime = new Date().getTime();
    }

    swipeMove(e) {
        e = e ? e : window.event;
        e.preventDefault();
    }

    swipeEnd(e) {

        e = e ? e : window.event;
        e = ('changedTouches' in e) ? e.changedTouches[0] : e;
        this.touchEndCoords = {
            'x': e.pageX - this.touchStartCoords.x,
            'y': e.pageY - this.touchStartCoords.y
        };
        this.elapsedTime = new Date().getTime() - this.startTime;
        if (this.elapsedTime <= this.maxAllowedTime) {
            if (Math.abs(this.touchEndCoords.x) >= this.minDistanceXAxis && Math.abs(this.touchEndCoords.y) <= this.maxDistanceYAxis) {
                this.direction = (this.touchEndCoords.x < 0) ? 'left' : 'right';
                switch (this.direction) {
                    case 'left':
                        this.toLeft();
                        break;
                    case 'right':
                        this.toRight();
                        break;
                }
            }
        }
    }

    addMultipleListeners(elem, events, handler) {
        const eventsArr = events.split(' ');
        for (let i = 0; i < eventsArr.length; i++) {
            elem.addEventListener(eventsArr[i], handler);
        }
    }
}
