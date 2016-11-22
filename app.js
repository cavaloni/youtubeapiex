var YouTubeAPI = "https://www.googleapis.com/youtube/v3/search";
var $nextPageToken = '';
var globalQuery = '';

function getSearchResults (searchTerm, callback) {
  var params = {
    part : 'snippet',
    key : 'AIzaSyDlSj8PhERDYCb0vekIkqD4Q3WwpCAfWbM',
    q : searchTerm,
  };
  $.getJSON (YouTubeAPI, params, callback);
  console.log(callback);
};

function displaySearchResults (data) {
  console.log(data);
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function (item) {
      resultElement += '<p>' + item.snippet.title + '<p>';
      resultElement += '<iframe width="560" height="315" src=\"https://www.youtube.com/embed/' + item.id.videoId + '\" frameborder=\"0\" allowfullscreen></iframe>';
    });
  }
    else {
      resultElement += '<p>' + 'No results' + '</p>'
    }
  $('.js-search-results').html(resultElement);
  $nextPageToken = data.nextPageToken;
  nextPageButton();
  console.log(globalQuery);
};

function getNextPageResults (searchTerm, callback) {
  var params = {
    part : 'snippet',
    key : 'AIzaSyDlSj8PhERDYCb0vekIkqD4Q3WwpCAfWbM',
    q : searchTerm,
    pageToken : $nextPageToken,
  };
  $.getJSON (YouTubeAPI, params, callback);
  console.log(callback);
};

function nextPageButton () {
  $(document.body).on('click', '.js-next-page-button', function (event) {
    event.preventDefault();
    getNextPageResults(globalQuery, displaySearchResults);
    console.log(globalQuery);
  })
};

function searchButton () {
  $('.js-search-button').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.ajax-search').val();
    getSearchResults (query, displaySearchResults);
    globalQuery = query;
  })
};

// function playVideoLightbox () {
//   $(document.body)on('click', 'img', function (event) {
//
//   }
// }

searchButton ();
nextPageButton();
