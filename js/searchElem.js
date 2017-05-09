import search from './search';

export default class SearchElem {

    constructor() {
        this.renderSearchBox();
        this.nextPageToken;
        this.searchResultList;
        this.gotResponse = new Event('gotResponse');
        this.nextPage = new Event('nextPage');

        this.searchButton.addEventListener('click', () => {
            this.makeRequest();
        });

        this.searchBox.addEventListener('keypress', (event) => {
            if(event.keyCode == '13') {
                this.makeRequest();
            }            
        });
    }

    makeRequest() {
        if (!this.searchBox.value) {
            alert('input is empty');
            return;
        }
        this.startSpinner();
        search(this.createUrl())
            .then((response) => {
                this.searchResultList = JSON.parse(response);
                this.nextPageToken = this.searchResultList.nextPageToken;
                document.dispatchEvent(this.gotResponse);
            })
            .catch((err) => {
                console.log(err.statusText);
            });
    }

    makeRequestNextPage() {
        this.startSpinner();
        search(this.createUrlNextPage())
            .then((response) => {
                this.searchResultList = JSON.parse(response);
                this.nextPageToken = this.searchResultList.nextPageToken;
                document.dispatchEvent(this.nextPage);
            })
            .catch((err) => {
                console.log(err.statusText);
            });
    }

    renderSearchBox() {

        this.searchBox = document.createElement('input');
        this.searchButton = document.createElement('input');
        this.searchBox.id = 'searchBox';
        this.searchButton.type = 'button';
        this.searchButton.value = 'Search';
        this.searchButton.id = 'searchButton';
        document.body.appendChild(this.searchBox);
        document.body.appendChild(this.searchButton);
    }

    createUrl() {
        
        const q = '&q=' + this.searchBox.value;
        const partOfUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&type=video&maxResults=12';
        return partOfUrl + q;
    }

    createUrlNextPage() {
        let nextPageToken;
        if(this.nextPageToken) {
            nextPageToken = 'pageToken=' + this.nextPageToken;
        }
        const q = '&q=' + this.searchBox.value;
        const mainPartOfUrl = 'https://www.googleapis.com/youtube/v3/search?';
        const snippetPartOfUrl = '&part=snippet&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&type=video&maxResults=12'
        return mainPartOfUrl + nextPageToken + snippetPartOfUrl + q;
    }

    startSpinner() {
        document.getElementsByClassName('fa-spinner')[0].style.visibility = 'visible';
    }

    stopSpinner() {
        document.getElementsByClassName('fa-spinner')[0].style.visibility = 'hidden';
    }

}
