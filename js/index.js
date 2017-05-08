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
    youtubeElems.createYoutubeElemsList(searchElem.searchResultList);
    
});

document.addEventListener('gotStatistic', () => {
    youtubeElems.renderYoutubeElems(3);
    
});

document.addEventListener('onRender', () => { 
    
    searchElem.stopSpinner();
    swipeObj.updateSwipe();
});

document.addEventListener('endOfPage', ()=>{
    console.log('endOfPage');
});
