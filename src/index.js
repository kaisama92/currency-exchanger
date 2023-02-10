
import './css/styles.css';

function getGif(search) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=pg&lang=en`;

  request.addEventListener("loadend", function() {
    try {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        printElements(response, search);
      } else {
        throw Error("Status Error");
      }
    } catch(error) {
      /* eslint-disable no-console */
      console.error(`RED ALERT: There is an error: ${error.message}`);
      /* eslint-enable no-console */
      printError(this, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}




// UI Logic

function printError(request, search) {
  document.querySelector('#results').innerText = `There was an error accessing gifs matching "${search}": ${request.status} ${request.statusText}`;
}

function printElements(apiResponse, search) {
  document.querySelector('#results').innerText = `Here are the gifs matching your search: ${search}:`;
  apiResponse.data.forEach(function(element){
    let newUrl = element.images.fixed_height.url;
    let img = document.createElement('img');
    img.setAttribute('src', newUrl);
    document.querySelector('#results-img').append(img);
  });
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#search').value;
  getGif(search);
}

window.addEventListener("load", function () {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});