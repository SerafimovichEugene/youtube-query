function search() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=kamikadzedead&type=video&order=date&key=AIzaSyDoT9Nw1mPXiXSTAbivHpp7zaXB9cPs6UI', true);
  
  let obj = {
    part: 'snippet',
    q: 'kamikadzedead',
    type: 'video',
    order: 'relevance',
  }

  console.log(JSON.stringify(obj));

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      console.dir(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
}



// // Search for a specified string.
// function search() {
//     let q = $('#query').val();
//     let request = gapi.client.youtube.search.list({
//         q: q,
//         part: 'snippet'
//     });

//     request.execute(function (response) {
//         let str = JSON.stringify(response.result);
//         $('#search-container').html('<pre>' + str + '</pre>');
//     });
// }

// https://www.googleapis.com/youtube/v3/search?part=id&q=tuto&type=video&key={YOUR_API_KEY}
// GET https://www.googleapis.com/youtube/v3/search
