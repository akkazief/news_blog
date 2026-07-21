async function makeRequest(url, method = "GET") {
    let response = await fetch(url, {method: method, cache: "no-store"});
    let data = await response.json();
    return data;
}

async function onClick(event) {
    event.preventDefault();
    let link = event.target;
    let counterId = link.dataset.counterId;
    let counter = document.getElementById(counterId);
    let url = link.href;
    let response = await makeRequest(url);
    counter.innerText = response.count;
    link.innerText = response.liked ? 'Убрать лайк' : 'Лайк';
}

function onLoad() {
    let links = document.querySelectorAll('[data-key="likes"]');
    for (let link of links) {
        link.addEventListener('click', onClick);
    }
}

window.addEventListener('load', onLoad);