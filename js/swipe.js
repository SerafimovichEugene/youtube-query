export default class Swipe {

    constructor() {
        this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
        this.currentElemNum = 0;
        this.numOfSwipes = document.getElementById('youtubeElemsWrapper').children.length - 1;
        this.fromRigth = this.numOfSwipes;
        this.fromLeft = 0;
        // console.log(this.currentElemNum);
    }

    toLeft() {
        console.log('click');

        if (this.fromRigth) {

            this.currentElem.className = 'moveToLeft';
            this.currentElemNum += 1;
            document.getElementById('youtubeElemsWrapper').children[this.currentElemNum].className = 'currentYoutubeElem moveFromRight';
            this.currentElem = document.getElementsByClassName('currentYoutubeElem')[0];
            this.fromRigth -= 1;
            console.log(this.currentElemNum);

        }
        console.log(document.getElementById('youtubeElemsWrapper').children);
    }

    // toRigth() {
    //     if(this.fromLeft) {

    //     }
    // }

}
