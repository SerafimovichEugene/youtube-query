import _ from "lodash";
import search from './search';

export default class YoutubeElems {

    constructor() {
        this.youtubeElems = [];
        this.statisticsObj;
    }

    createYoutubeElemsList(searchResultList) {
        _.forEach(searchResultList.items, (value) => {
            this.youtubeElems.push({
                videoId: value.id.videoId,
                title: value.snippet.title,
                auther: value.snippet.channelTitle,
                description: value.snippet.description,
                publishedAt: value.snippet.publishedAt,
                thumbnails:  _.clone(value.snippet.thumbnails)
            });
        });
        this.getStatistics();
        
    }

    createUrl() {
        const partOfUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&id=";
        let videoIdArray = [];
         _.forEach(this.youtubeElems, (value) => {
            videoIdArray.push(value.videoId);
        });
        const ids = videoIdArray.join(',');
        return partOfUrl + ids;
    }

    getStatistics() {
         search(this.createUrl())
                .then((response) => {
                    this.statisticsObj = JSON.parse(response);
                    this.updateYoutubeElems();
                    console.log(this.youtubeElems);
                })
                .catch((err) => {
                    console.log(err.statusText);
                });
    }

    updateYoutubeElems() {

         _.forEach(this.statisticsObj.items, (item) => {
             _.forEach(this.youtubeElems, (elem) => {
                if(item.id == elem.videoId) {                  
                    elem['viewCout'] = item.statistics.viewCount; 
                }
            });
        });
    }


}


class YoutubeElem {


    renderYoutubeElem() {

    }
}
