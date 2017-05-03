import _ from "lodash";
import search from './search';

export default class YoutubeElems {

    constructor() {
        this.youtubeElems = [];
        this.statisticsObj;
        this.gotStatistic = new Event('gotStatistic');
    }

    createYoutubeElemsList(searchResultList) {

        _.forEach(searchResultList.items, (value) => {
            this.youtubeElems.push({
                videoId: value.id.videoId,
                title: value.snippet.title,
                author: value.snippet.channelTitle,
                description: value.snippet.description,
                publishedAt: value.snippet.publishedAt,
                thumbnails: _.clone(value.snippet.thumbnails)
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
                // console.log(this.youtubeElems);
                document.dispatchEvent(this.gotStatistic);
            })
            .catch((err) => {
                // console.log(err.statusText);
            });
    }

    updateYoutubeElems() {

        _.forEach(this.statisticsObj.items, (item) => {
            _.forEach(this.youtubeElems, (elem) => {
                if (item.id == elem.videoId) {
                    elem['viewCount'] = item.statistics.viewCount;
                }
            });
        });
    }

    renderYoutubeElemsWrapper() {

        let youtubeElemsWrapper = document.createElement('div');
        youtubeElemsWrapper.id = 'youtubeElemsWrapper';
        document.body.appendChild(youtubeElemsWrapper);
    }

    renderYoutubeElems() {

        const chunks = _.chunk(this.youtubeElems, 4);
        console.log(chunks);

        _.forEach(chunks, (chunk) => {

            let ul = document.createElement('ul');

            _.forEach(chunk, (elem) => {
                const youtubeElem = new YoutubeElem(
                    elem.thumbnails.medium.url,
                    elem.title,
                    elem.author,
                    elem.viewCount,
                    elem.publishedAt,
                    elem.description
                );
                
                ul.appendChild(youtubeElem.renderYoutubeElem());

            });
            document.getElementById('youtubeElemsWrapper').appendChild(ul);
        });

        console.log(document.getElementById('youtubeElemsWrapper').children);
        // _.forEach(this.youtubeElems, (elem) => {
        //     const youtubeElem = new YoutubeElem(
        //         elem.thumbnails.medium.url,
        //         elem.title,
        //         elem.author,
        //         elem.viewCount,
        //         elem.publishedAt,
        //         elem.description
        //     );
        //     document.getElementById('youtubeElemsWrapper').appendChild(youtubeElem.renderYoutubeElem());
        // });
    }



    clearYoutubeElemsList() {

        this.youtubeElems = [];
        document.getElementById('youtubeElemsWrapper').innerHTML = '';
    }
};


class YoutubeElem {

    constructor(thumbnail, title, author, viewCount, publishDate, description) {
        this.thumbnail = thumbnail;
        this.title = title;
        this.author = author;
        this.viewCount = viewCount;
        this.publishDate = publishDate;
        this.description = description;
    }

    renderYoutubeElem() {

        let youtubeElem = document.createElement('div');
        youtubeElem.className = 'youtubeElem';

        let thumbnail = document.createElement('p');
        let thumbnailImg = document.createElement('img');
        thumbnailImg.src = this.thumbnail;
        thumbnail.appendChild(thumbnailImg);
        youtubeElem.appendChild(thumbnail);

        let title = document.createElement('p');
        title.innerHTML = this.title;
        youtubeElem.appendChild(title);

        let author = document.createElement('p');
        author.innerHTML = this.author;
        youtubeElem.appendChild(author);

        let viewCount = document.createElement('p');
        viewCount.innerHTML = this.viewCount;
        youtubeElem.appendChild(viewCount);

        let publishDate = document.createElement('p');
        publishDate.innerHTML = this.publishDate;
        youtubeElem.appendChild(publishDate);

        let description = document.createElement('p');
        description.innerHTML = this.description;
        youtubeElem.appendChild(description);

        let li = document.createElement('li');
        li.appendChild(youtubeElem);
        return li;
    }
}
