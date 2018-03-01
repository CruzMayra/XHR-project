const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
})

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=68cddbd69beb4350b8e922d327629378`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  // console.log(data.response.docs[0]);
  for(var i = 0; i < 5; i++){
    const article = data.response.docs[i];
    const title = article.headline.main;
    const snippet = article.snippet;
    const url = article.web_url;
    const img = article.multimedia[1].url;

    let li = document.createElement('li');
    let enlace = document.createElement('a')
    let image = document.createElement('img')
    li.className = 'articleClass';
    image.setAttribute('src','https://www.nytimes.com/' + img)
    enlace.setAttribute('href',url);
    enlace.innerText = snippet;

    responseContainer.appendChild(li);
    li.appendChild(image);
    li.appendChild(enlace);
  }
}
