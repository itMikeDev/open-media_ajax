let loadPost = document.querySelector(".load-post");
let postDiv = document.querySelector(".post");
let xhttp = new XMLHttpRequest();
let post = 0;
let arr = [];
let arrPost = [];
let arrReviews = [];

//Slider

let xhttpSlide = new XMLHttpRequest();

xhttpSlide.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunctionSlide(this.responseText);
    }
}

xhttpSlide.open("POST", "http://test-open-media.mike/script/feedback_data.json", true);
xhttpSlide.send();

function myFunctionSlide(data) {
    arrReviews = JSON.parse(data);
    console.log(arrReviews);
    slider(arrReviews);
}


let reviewsSlideText = document.querySelector(".reviews-slide-text");
let reviewsSlideName = document.querySelector(".reviews-slide-name");
let reviewsSlideInst = document.querySelector(".reviews-slide-inst");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let currentSlide = arrReviews.length - arrReviews.length - 1;

function slider() {
    if (currentSlide == -1) {
        console.log(currentSlide);
        reviewsSlideText.innerHTML = `${arrReviews[0].text}`;
        reviewsSlideName.innerHTML = `${arrReviews[0].name},`;
        reviewsSlideInst.innerHTML = `${arrReviews[0].instagram_username}`;
    } else {
        reviewsSlideText.innerHTML = `${arrReviews[currentSlide].text}`;
        reviewsSlideName.innerHTML = `${arrReviews[currentSlide].name},`;
        reviewsSlideInst.innerHTML = `${arrReviews[currentSlide].instagram_username}`;
    }
}


prev.onclick = function () {
    if (currentSlide == 0 || currentSlide == -1) {
        currentSlide = arrReviews.length - 1;
    } else {
        currentSlide--;
    }
    slider();
};

next.onclick = function () {
    if (currentSlide == arrReviews.length - 1) {
        console.log(currentSlide);
        currentSlide = 0;
    } else if (currentSlide == -1) {
        currentSlide = currentSlide + 2;
        console.log(currentSlide);
    } else {
        console.log(currentSlide);
        currentSlide++;
    }
    slider();
};

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this.responseText);
    }
}

xhttp.open("POST", "http://test-open-media.mike/script/blog_posts.json", true);
xhttp.send();

function myFunction(data) {
    post = JSON.parse(data);
    sortPost(post);
}

function sortPost(post) {
    arrPost = post;
    arrPost.sort(function (prev, next) {
        if (prev.date < next.date) return -1;
        if (prev.date > next.date) return 1;
    });
    arrPost.reverse();
}

loadPost.addEventListener("click", function () {
    for (let i = 0; i < arrPost.length; i++) {
        postDiv.innerHTML += `<a href="${arrPost[i].url}"
        target="_blank" class="post-${i + 4} post-block">
        <div>
            <img src="image/desktop/img3.png"
                srcset="image/desktop/img3@3x.png 2x, image/desktop/img3@3x.png 3x">
            <p>${arrPost[i].title}</p>
        </div>
    </a>`;
    }
    loadPost.style.display = "none";
});



