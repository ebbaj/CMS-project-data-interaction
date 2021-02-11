const homeNewsList = document.querySelector(".home-news-list");
let output = "";

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
            <div class="card">
                <div class="card-body" data-id="${post.id}">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-created">Published: ${post.created}</h6>
                    <h6 class="card-updated">Updated: ${post.updated}</h6>
                    <p class="card-text">${post.content}</p>
                </div>
            </div>
        `;
    });
    homeNewsList.innerHTML = output;
}

const apiRoot = '/api/news';

// Get - Read the posts
//Method: GET
fetch(apiRoot)
    .then(res => res.json())
    .then(data => renderPosts(data))


