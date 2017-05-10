import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';
import Swipe from './swipe';

const searchElem = new SearchElem();
const youtubeElemsObj = new YoutubeElems();
const swipeObj = new Swipe();

window.addEventListener('resize', () => {
    youtubeElemsObj.handleWidthChange.call(youtubeElemsObj);
});

document.addEventListener('gotResponse', () => {
    youtubeElemsObj.clearYoutubeElemsList();
    youtubeElemsObj.fillYoutubeElemsList(searchElem.searchResultList);
    
});

document.addEventListener('gotStatistic', () => {

    youtubeElemsObj.renderYoutubeElems(youtubeElemsObj.slice);
    if(youtubeElemsObj.youtubeElems.length > 12) {
        swipeObj.toLeft();
    }
});

document.addEventListener('onRender', () => { 
    searchElem.stopSpinner();
    swipeObj.updateSwipe(youtubeElemsObj.fromLeft, youtubeElemsObj.fromRight, youtubeElemsObj.currentPage);
});

document.addEventListener('toLeft', () => {
    youtubeElemsObj.updateCurrentPage(1);
});

document.addEventListener('toRight', () => {
    youtubeElemsObj.updateCurrentPage(-1);
});

document.addEventListener('endOfPage', () => {

    searchElem.makeRequestNextPage();
});

document.addEventListener('nextPage', () => {
    
    youtubeElemsObj.fillYoutubeElemsList(searchElem.searchResultList);
});
