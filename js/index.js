import SearchElem from './searchElem';
import YoutubeElems from './youtubeElems';

const searchElem = new SearchElem();
const youtubeElems = new YoutubeElems();

document.addEventListener('gotResponse', () => {
    youtubeElems.createYoutubeElemsList(searchElem.searchResultList);
});
