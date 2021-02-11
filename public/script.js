const newsList = document.querySelector(".news-list");
const addNewsForm = document.querySelector(".add-news-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");
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
                    <a href="#" class="card-link" id="edit-post">Edit</a>
                    <a href="#" class="card-link" id="delete-post">Delete</a>
                </div>
            </div>
        `;

    });
    newsList.innerHTML = output;
}

const apiRoot = '/api/news';

// Get - Read the posts
//Method: GET
fetch(apiRoot)
    .then(res => res.json())
    .then(data => renderPosts(data))

newsList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-post';
    let editButtonIsPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id;

    //Delete - Remove the existing post
    //method: DELETE
    if(delButtonIsPressed) {
        fetch(`${apiRoot}/${id}`, {
         method: 'DELETE',
        })
            //.then(res => res.json())
            .then((response)=>{
                console.log(response);
            })
            .then(() => location.reload())
    }

    if(editButtonIsPressed) {
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }

    //Update - update the existing posts
    //method: PUT
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`${apiRoot}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                content: bodyValue.value,
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

});

//Create - Insert new post
//Method: POST
addNewsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(apiRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            content: bodyValue.value
        })
    })
        .then(res => res.json())
        //.then(text => console.log(text));
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })

    // reset input field to empty
    titleValue.value = '';
    bodyValue.value = '';
})
