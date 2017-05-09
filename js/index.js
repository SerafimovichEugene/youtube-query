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
});

document.addEventListener('onRender', () => { 
    
    searchElem.stopSpinner();
    swipeObj.updateSwipe();
});

document.addEventListener('endOfPage', ()=>{
    console.log('endOfPage');

    searchElem.makeRequestNextPage();
});

document.addEventListener('nextPage', () => {
    
    youtubeElems.fillYoutubeElemsList(searchElem.searchResultList);
    console.log(searchElem.searchResultList);
    console.log(youtubeElems.youtubeElems);
});
