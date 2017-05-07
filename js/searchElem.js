import search from './search';

export default class SearchElem {

    constructor() {
        this.renderSearchBox();

        this.searchResultList;
        this.haveData = new Event('gotResponse');

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
        search(this.createUrl())
            .then((response) => {
                this.searchResultList = JSON.parse(response);
                // console.log(this.searchResultList);
                document.dispatchEvent(this.haveData);
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

        // console.log(this.searchBox.value);
        const q = '&q=' + this.searchBox.value;
        const partOfUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI&type=video&maxResults=16';
        // console.log(partOfUrl + q);
        return partOfUrl + q;
    }

}
