window.onload = function() {
    header();
    banner();
    dateTime();
}

var header = function() {
    var searchBox = document.querySelector('.jd_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function() {
        var scrollTop = document.body.scrollTop;
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ');'

    }
};


var banner = function() {
    var banner = document.querySelector('.jd_banner');
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelector('li');
    var width = banner.offsetWidth;
    var index = 1;

    var addTransition = function() {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function() {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    var setTransalteX = function(translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

    var timer = setInterval(function() {
        index++;
        addTransition();
        setTransalteX(-index * width);

    }, 2000)

    imgBox.addEventListener('transitionend', function(e) {
        if (index > 8) {
            index = 1;
            removeTransition();
            setTransalteX(-index * width);
        } else if (index < 1) {
            index = 8;
            removeTransition();
            setTransalteX(-index * width);
        }
        setPoints();
    })

    var setPoints = function() {

        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('current');
        }
        points[index - 1].classList.add('current');
    }

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart', function(e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function(e) {
        isMove = true;
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var tranlateX = -index * width + distanceX;
        removeTransition();
        setTransalteX(tranlateX);
    });
    imgBox.addEventListener('touchend', function(e) {
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                setTransalteX(-index * width);
            } else {
                if (Math.abs(distanceX) < 0) {
                    /*向左滑,负数,下一张*/
                    index++;

                } else {
                    /*向右滑,正数,上一张*/
                    index--;
                }
                addTransition();
                setTransalteX(-index * width);
            }
        }

        isMove = false;
        distanceX = 0;
        startX = 0;
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            addTransition();
            setTransalteX(-index * width);

        }, 2000)
    })
};

var dateTime = function() {
    var time = 2 * 60 * 60;
    var spans = document.querySelector('.time').querySelectorAll('span');
    var timer = setInterval(function() {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)



}