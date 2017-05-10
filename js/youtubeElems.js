import search from './search';
import YoutubeElem from './youtubeElem.js';

import _forEach from 'lodash/forEach';
import _takeRight from 'lodash/takeRight';
import _chunk from 'lodash/chunk';
import _clone from 'lodash/clone';

export default class YoutubeElems {

    constructor() {
        this.youtubeElems = [];
        this.statisticsObj;
        this.currentVideId;
        this.currentPage = 0;
        this.pagesCount;
        this.fromLeft = 0;
        this.gotStatistic = new Event('gotStatistic');
        this.onRender = new Event('onRender');
        this.renderYoutubeElemsWrapper(); //main Wrapper
        this.handleWidthChange(); //to init this.slice;
    }

    fillYoutubeElemsList(searchResultList) {

        _forEach(searchResultList.items, (value) => {
            this.youtubeElems.push({
                videoId: value.id.videoId,
                title: value.snippet.title,
                author: value.snippet.channelTitle,
                description: value.snippet.description,
                publishedAt: value.snippet.publishedAt,
                thumbnails: _clone(value.snippet.thumbnails)
            });
        });
        this.getStatistics();
    }

    createUrl() {

        const partOfUrl = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&id=";
        let videoIdArray = [];
        _forEach(_takeRight(this.youtubeElems, 12), (value) => {
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
                document.dispatchEvent(this.gotStatistic);
            })
            .catch((err) => {
                console.log(err.statusText);
            });
    }

    updateYoutubeElems() {

        _forEach(this.statisticsObj.items, (item) => {
            _forEach(_takeRight(this.youtubeElems, 12), (elem) => {
                if (item.id == elem.videoId) {
                    elem['viewCount'] = item.statistics.viewCount;
                }
            });
        });
    }

    renderYoutubeElemsWrapper() {

        this.youtubeElemsWrapper = document.createElement('div');
        this.youtubeElemsWrapper.id = 'youtubeElemsWrapper';
        document.body.appendChild(this.youtubeElemsWrapper);
    }

    renderYoutubeElems(slice) {

        this.pagesCount = this.youtubeElems.length / slice;
        this.youtubeElemsWrapper.innerHTML = '';
        const chunks = _chunk(this.youtubeElems, slice);
        _forEach(chunks, (chunk) => {
            let ul = document.createElement('ul');
            _forEach(chunk, (elem) => {
                const youtubeElem = new YoutubeElem(
                    elem.videoId,
                    elem.thumbnails.medium.url,
                    elem.title,
                    elem.author,
                    elem.viewCount,
                    elem.publishedAt,
                    elem.description
                );
                ul.appendChild(youtubeElem.renderYoutubeElem());
            });
            this.youtubeElemsWrapper.appendChild(ul);
        });

        //remember current page with first videoId
        for (let i = 0; i < chunks.length; i++) {
            for (let j = 0; j < chunks[i].length; j++) {
                if (this.currentVideId == chunks[i][j].videoId) {
                    this.currentPage = i;
                    break;
                }
            }
        }
        this.fromLeft = this.currentPage;
        this.fromRight = this.pagesCount - 1 - this.fromLeft;

        //redefine classes
        for (let i = 0; i < this.currentPage; i++) {
            this.youtubeElemsWrapper.children[i].className = 'moveToLeft';
        }
        this.youtubeElemsWrapper.children[this.currentPage].className = 'currentYoutubeElem';
        this.currentVideId = document.querySelector('.currentYoutubeElem li .videoId').innerHTML;
        document.dispatchEvent(this.onRender);
    }

    clearYoutubeElemsList() {
        this.youtubeElems = [];
        this.currentPage = 0;
        document.getElementById('youtubeElemsWrapper').innerHTML = '';
    }

    handleWidthChange() {

        let flag = false;
        if (window.innerWidth < 750 && this.width !== 'XS') {
            this.width = 'XS';
            this.slice = 1;
            // console.log('XS');
            flag = true;
        } else if (window.innerWidth > 750 && window.innerWidth < 1110 && this.width !== 'S') {
            this.width = 'S';
            this.slice = 2;
            // console.log('S');
            flag = true;
        } else if (window.innerWidth > 1110 && window.innerWidth < 1470 && this.width !== 'L') {
            this.width = 'L';
            this.slice = 3;
            // console.log('L');
            flag = true;
        } else if (window.innerWidth > 1470 && this.width !== 'XL') {
            this.width = 'XL';
            this.slice = 4;
            // console.log('XL');
            flag = true;
        }
        if (flag && this.youtubeElems.length) {
            this.renderYoutubeElems(this.slice);
            flag = false;
        }

    }

    updateCurrentPage(arg) {
        this.currentPage += arg;
        this.currentVideId = document.querySelector('.currentYoutubeElem li .videoId').innerHTML;
    }
};
