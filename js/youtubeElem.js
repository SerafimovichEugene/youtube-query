export default class YoutubeElem {

    constructor(videoId, thumbnail, title, author, viewCount, publishDate, description) {
        this.videoId = videoId;
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

        let videoId = document.createElement('div');
        videoId.className = 'videoId';
        videoId.innerHTML = this.videoId;
        youtubeElem.appendChild(videoId);

        let thumbnail = document.createElement('p');
        thumbnail.className = 'thumbnail';
        let thumbnailImg = document.createElement('img');
        thumbnailImg.src = this.thumbnail;
        thumbnail.appendChild(thumbnailImg);
        youtubeElem.appendChild(thumbnail);

        let link = document.createElement('a');
        link.href = 'https://www.youtube.com/watch?v=' + this.videoId;
        link.innerHTML = this.title
        link.target = '_blank';
        youtubeElem.appendChild(link);

        let author = document.createElement('p');
        author.className = 'author';
        author.innerHTML = this.author;
        youtubeElem.appendChild(author);

        let viewCount = document.createElement('p');
        viewCount.className = 'viewCount';
        viewCount.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i> ' + this.viewCount;
        youtubeElem.appendChild(viewCount);

        let publishDate = document.createElement('p');
        publishDate.className = 'publishDate';
        const date = new Date(Date.parse(this.publishDate));
        publishDate.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i> ' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        youtubeElem.appendChild(publishDate);

        let description = document.createElement('p');
        description.className = 'description';
        description.innerHTML = this.description;
        youtubeElem.appendChild(description);

        let li = document.createElement('li');
        li.appendChild(youtubeElem);
        return li;
    }
}
