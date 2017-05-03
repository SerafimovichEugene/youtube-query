import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';

const searchElem = new SearchElem();
const youtubeElems = new YoutubeElems();

// youtubeElems.renderYoutubeElemsWrapper();

document.addEventListener('gotResponse', () => {
    youtubeElems.clearYoutubeElemsList();
    youtubeElems.createYoutubeElemsList(searchElem.searchResultList);
});

document.addEventListener('gotStatistic', () => {
    youtubeElems.renderYoutubeElems();
});
