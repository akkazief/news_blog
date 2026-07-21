async function makeRequest(url, method = "GET") {
    let response = await fetch(url, {method: method, cache: "no-store"});
    let data = await response.json();
    return data;
}

async function onClick(event) {
    event.preventDefault();
    let link = event.target.closest('[data-key="likes"]');
    let counterId = link.dataset.counterId;
    let counter = document.getElementById(counterId);
    let url = link.href;
    let response = await makeRequest(url);
    counter.innerText = response.count;
    link.innerHTML = response.liked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
}

function onLoad() {
    let links = document.querySelectorAll('[data-key="likes"]');
    for (let link of links) {
        link.addEventListener('click', onClick);
    }
}

window.addEventListener('load', onLoad);