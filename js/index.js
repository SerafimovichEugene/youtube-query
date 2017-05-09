import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';
import Swipe from './swipe';

const searchElem = new SearchElem();
const youtubeElems = new YoutubeElems();
const swipeObj = new Swipe();

window.addEventListener('resize', () => {
    youtubeElems.handleWidthChange.call(youtubeElems);
});

document.addEventListener('gotResponse', () => {
    youtubeElems.clearYoutubeElemsList();
    youtubeElems.fillYoutubeElemsList(searchElem.searchResultList);
    
});

document.addEventListener('gotStatistic', () => {

    youtubeElems.renderYoutubeElems(youtubeElems.slice);
    if(youtubeElems.youtubeElems.length > 12) {
        swipeObj.toLeft();
    }
});

document.addEventListener('onRender', () => { 
    searchElem.stopSpinner();
    swipeObj.updateSwipe(youtubeElems.fromLeft, youtubeElems.fromRight, youtubeElems.currentPage);
});

document.addEventListener('toLeft', () => {
    youtubeElems.updateCurrentPage(1);
});

document.addEventListener('toRight', () => {
    youtubeElems.updateCurrentPage(-1);
});

document.addEventListener('endOfPage', () => {

    searchElem.makeRequestNextPage();
});

document.addEventListener('nextPage', () => {
    
    youtubeElems.fillYoutubeElemsList(searchElem.searchResultList);
});
