// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    let q = $('#query').val();
    let request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        let str = JSON.stringify(response.result);
        $('#search-container').html('<pre>' + str + '</pre>');
    });
}


// GET https://www.googleapis.com/youtube/v3/search
