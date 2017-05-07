export default class Swipe {

    constructor() {
        this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
        this.currentElemNum = 0;
        this.numOfSwipes = document.getElementById('youtubeElemsWrapper').children.length - 1;
        this.fromRigth = this.numOfSwipes;
        this.fromLeft = 0;


        // console.log(this.currentElemNum);
        this.touchStartCoords = {
            'x': -1,
            'y': -1
        }; // X and Y coordinates on mousedown or touchstart events.
        this.touchEndCoords = {
            'x': -1,
            'y': -1
        }; // X and Y coordinates on mouseup or touchend events.
        this.direction = 'undefined'; // Swipe direction
        this.minDistanceXAxis = 30; // Min distance on mousemove or touchmove on the X axis
        this.maxDistanceYAxis = 30; // Max distance on mousemove or touchmove on the Y axis
        this.maxAllowedTime = 10000; // Max allowed time between swipeStart and swipeEnd
        this.startTime = 0; // Time on swipeStart
        this.elapsedTime = 0; // Elapsed time between swipeStart and swipeEnd

    }

    toLeft() {

        if (this.fromRigth) {
            this.currentElem.className = 'moveToLeft';
            this.currentElemNum += 1;
            document.getElementById('youtubeElemsWrapper').children[this.currentElemNum].className = 'currentYoutubeElem moveFromRight';
            this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
            this.fromRigth -= 1;
            this.fromLeft += 1;
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
                        console.log('to Left');
                        this.toLeft();
                        break;
                    case 'right':
                        console.log('to Right');
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
