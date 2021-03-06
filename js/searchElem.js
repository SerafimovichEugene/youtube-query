export default class SearchElem {

    constructor() {
        this.renderSearchBox();
        this.renderSpinner();
        this.nextPageToken;
        this.searchResultList;
        this.gotResponse = new Event('gotResponse');
        this.nextPage = new Event('nextPage');

        this.searchButton.addEventListener('click', () => {
            this.makeRequest();
        });
        this.searchBox.addEventListener('keypress', (event) => {
            if (event.keyCode == '13') {
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
        fetch(this.createUrl())
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.searchResultList = json;
                this.nextPageToken = this.searchResultList.nextPageToken;
                document.dispatchEvent(this.gotResponse);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    makeRequestNextPage() {
        this.startSpinner();
        fetch(this.createUrlNextPage())
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.searchResultList = json;
                this.nextPageToken = this.searchResultList.nextPageToken;
                document.dispatchEvent(this.nextPage);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    renderSearchBox() {

        this.searchBox = document.createElement('input');
        this.searchButton = document.createElement('input');
        this.searchBox.id = 'searchBox';
        this.searchBox.placeholder = 'Enter query';
        this.searchButton.type = 'button';
        this.searchButton.value = 'Search';
        this.searchButton.id = 'searchButton';
        document.body.appendChild(this.searchBox);
        document.body.appendChild(this.searchButton);

    }

    renderSpinner() {
        this.spinner = document.createElement('p');
        this.spinner.id = 'spinner';
        this.spinner.innerHTML = '<i class="fa fa-spinner fa-2x fa-spin" ></i>';
        document.body.appendChild(this.spinner);
        let swipeInfo = document.createElement('p');
        swipeInfo.id = 'swipeInfo';
        swipeInfo.innerHTML = 'swipe left/rigth to turn page';
        document.body.appendChild(swipeInfo);
    }

    createUrl() {

        const q = '&q=' + this.searchBox.value;
        const partOfUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&type=video&maxResults=12';
        return partOfUrl + q;
    }

    createUrlNextPage() {
        let nextPageToken;
        if (this.nextPageToken) {
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
