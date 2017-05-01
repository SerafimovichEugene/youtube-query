export default function search(url) {
          
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });

}

// https://www.googleapis.com/youtube/v3/search?part=id&q=tuto&type=video&key={YOUR_API_KEY}
// GET https://www.googleapis.com/youtube/v3/search

//search list
// 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=kamikadzedead&type=video&order=date&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI'

//contentDetails
// https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=TruIq5IxuiU,-VoFbH8jTzE,RPNDXrAvAMg,gmQmYc9-zcg&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI
