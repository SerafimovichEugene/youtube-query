import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';
import Swipe from './swipe';

const searchElem = new SearchElem();
const youtubeElemsObj = new YoutubeElems();
const swipeObj = new Swipe();

const resizeHandler = function (e) {
    youtubeElemsObj.handleWidthChange.call(youtubeElemsObj);
}
const gotResponseHandler = function (e) {
    youtubeElemsObj.clearYoutubeElemsList();
    youtubeElemsObj.fillYoutubeElemsList(searchElem.searchResultList);
}
const gotStatisticHandler = function (e) {
    youtubeElemsObj.renderYoutubeElems(youtubeElemsObj.slice);
    if (youtubeElemsObj.youtubeElems.length > 12) {
        swipeObj.toLeft();
    }
}
const onRenderHandler = function (e) {
    searchElem.stopSpinner();
    swipeObj.updateSwipe(youtubeElemsObj.fromLeft, youtubeElemsObj.fromRight, youtubeElemsObj.currentPage);
}
const toLeftHandler = function (e) {
    youtubeElemsObj.updateCurrentPage(1);
}
const toRightHandler = function (e) {
    youtubeElemsObj.updateCurrentPage(-1);
}
const endOfPageHandler = function (e) {
    if (youtubeElemsObj.youtubeElems.length) {
        searchElem.makeRequestNextPage();
    }
}
const nextPageHandler = function (e) {
    youtubeElemsObj.fillYoutubeElemsList(searchElem.searchResultList);
}

window.addEventListener('resize', resizeHandler);
document.addEventListener('gotResponse', gotResponseHandler);
document.addEventListener('gotStatistic', gotStatisticHandler);
document.addEventListener('onRender', onRenderHandler);
document.addEventListener('toLeft', toLeftHandler);
document.addEventListener('toRight', toRightHandler);
document.addEventListener('endOfPage', endOfPageHandler);
document.addEventListener('nextPage', nextPageHandler);

window.addEventListener("beforeunload", () => {
    window.removeEventListener('resize', resizeHandler);
    document.removeEventListener('gotResponse', gotResponseHandler);
    document.removeEventListener('gotStatistic', gotStatisticHandler);
    document.removeEventListener('onRender', onRenderHandler);
    document.removeEventListener('toLeft', toLeftHandler);
    document.removeEventListenerr('toRight', toRightHandler);
    document.removeEventListener('endOfPage', endOfPageHandler);
    document.removeEventListener('nextPage', nextPageHandler);
}, false);
