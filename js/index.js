import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';
import Swipe from './swipe';

const searchElem = new SearchElem();
const youtubeElems = new YoutubeElems();
let swipeObj;

youtubeElems.renderYoutubeElemsWrapper();

document.addEventListener('gotResponse', () => {
    youtubeElems.clearYoutubeElemsList();
    youtubeElems.createYoutubeElemsList(searchElem.searchResultList);
});

document.addEventListener('gotStatistic', () => {
    youtubeElems.renderYoutubeElems();
    swipeObj = new Swipe();
    _.forEach(document.getElementsByTagName('ul'), (value) => {
        swipeObj.addMultipleListeners(value, 'mousedown touchstart', () => {swipeObj.swipeStart()});
        swipeObj.addMultipleListeners(value, 'mousemove touchmove', () => {swipeObj.swipeMove()});
        swipeObj.addMultipleListeners(value, 'mouseup touchend', () => {swipeObj.swipeEnd()});

    });
});
