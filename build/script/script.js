"use strict";

var loadPost = document.querySelector(".load-post");
var postDiv = document.querySelector(".post");
var xhttp = new XMLHttpRequest();
var post = 0;
var arr = [];
var arrPost = [];
var arrReviews = [];

//Slider

var xhttpSlide = new XMLHttpRequest();

xhttpSlide.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunctionSlide(this.responseText);
    }
};

xhttpSlide.open("POST", "http://open-media-task-master/script/feedback_data.json", true);
xhttpSlide.send();

function myFunctionSlide(data) {
    arrReviews = JSON.parse(data);
    console.log(arrReviews);
    slider(arrReviews);
}

var reviewsSlideText = document.querySelector(".reviews-slide-text");
var reviewsSlideName = document.querySelector(".reviews-slide-name");
var reviewsSlideInst = document.querySelector(".reviews-slide-inst");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
var currentSlide = arrReviews.length - arrReviews.length - 1;

function slider() {
    if (currentSlide == -1) {
        console.log(currentSlide);
        reviewsSlideText.innerHTML = "" + arrReviews[0].text;
        reviewsSlideName.innerHTML = arrReviews[0].name + ",";
        reviewsSlideInst.innerHTML = "" + arrReviews[0].instagram_username;
    } else {
        reviewsSlideText.innerHTML = "" + arrReviews[currentSlide].text;
        reviewsSlideName.innerHTML = arrReviews[currentSlide].name + ",";
        reviewsSlideInst.innerHTML = "" + arrReviews[currentSlide].instagram_username;
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
};


xhttp.open("POST", "http://open-media-task-master/script/blog_posts.json", true);
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
    for (var i = 0; i < arrPost.length; i++) {
        postDiv.innerHTML += "<a href=\"" + arrPost[i].url + "\"\n        target=\"_blank\" class=\"post-" + (i + 4) + " post-block\">\n        <div>\n            <img src=\"image/desktop/img3.png\"\n                srcset=\"image/desktop/img3@3x.png 2x, image/desktop/img3@3x.png 3x\">\n            <p>" + arrPost[i].title + "</p>\n        </div>\n    </a>";
    }
    loadPost.style.display = "none";
});