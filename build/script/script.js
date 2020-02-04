"use strict";

var arrReviews = [];
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
    slider(arrReviews);
}

var objSlide = (function () {
    var obj = {};
    obj.reviewsSlideText = document.querySelector(".reviews-slide-text");
    obj.reviewsSlideName = document.querySelector(".reviews-slide-name");
    obj.reviewsSlideInst = document.querySelector(".reviews-slide-inst");
    obj.prev = document.querySelector(".prev");
    obj.next = document.querySelector(".next");
    obj.currentSlide = arrReviews.length - arrReviews.length - 1;
    return obj;
})();


function slider() {
    if (objSlide.currentSlide == -1) {
        objSlide.reviewsSlideText.innerHTML = "" + arrReviews[0].text;
        objSlide.reviewsSlideName.innerHTML = arrReviews[0].name + ",";
        objSlide.reviewsSlideInst.innerHTML = "" + arrReviews[0].instagram_username;
    } else {
        objSlide.reviewsSlideText.innerHTML = "" + arrReviews[objSlide.currentSlide].text;
        objSlide.reviewsSlideName.innerHTML = arrReviews[objSlide.currentSlide].name + ",";
        objSlide.reviewsSlideInst.innerHTML = "" + arrReviews[objSlide.currentSlide].instagram_username;
    }
}

objSlide.prev.onclick = function () {
    if (objSlide.currentSlide == 0 || objSlide.currentSlide == -1) {
        objSlide.currentSlide = arrReviews.length - 1;
    } else {
        objSlide.currentSlide--;
    }
    slider();
};

objSlide.next.onclick = function () {
    if (objSlide.currentSlide == arrReviews.length - 1) {
        objSlide.currentSlide = 0;
    } else if (objSlide.currentSlide == -1) {
        objSlide.currentSlide = objSlide.currentSlide + 2;
    } else {
        objSlide.currentSlide++;
    }
    document.querySelector(".prev svg").style.opacity = "1";
    slider();
};

var objPost = (function () {
    var obj = {};
    obj.loadPost = document.querySelector(".load-post");
    obj.postDiv = document.querySelector(".post");
    return obj;
})();

objPost.loadPost.addEventListener("click", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://open-media-task-master/script/blog_posts.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this.responseText);
        }
    };
});


function myFunction(data) {
    var post = JSON.parse(data);
    sortPost(post);
}

function sortPost(post) {
    post.sort(function (prev, next) {
        if (prev.date < next.date) return -1;
        if (prev.date > next.date) return 1;
    });
    post.reverse();
    for (var i = 0; i < post.length; i++) {
        objPost.postDiv.innerHTML += "<a href=\"" + post[i].url + "\"\n        target=\"_blank\" class=\"post-" + (i + 4) + " post-block\">\n                   <img src=\"image/desktop/img3.png\"\n                srcset=\"image/desktop/img3@3x.png 2x, image/desktop/img3@3x.png 3x\">\n\t\t<div class=\"wrapper-p\">\n             <p>" + post[i].title + "</p>\n        </div>\n    </a>";
    }
    objPost.loadPost.style.display = "none";
}