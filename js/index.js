const spans = document.querySelectorAll('.loading span');
const loading = document.querySelector('.loading');

let num = 1;

// const fv = localStorage.getItem('fv');
// if (fv == null) {
//     num = Math.floor((Math.random() * 6) + 4)
//     localStorage.setItem('fv', 0)
// } else {
//     num = Math.floor((Math.random() * 4) + 2)
// }

window.addEventListener('load', loadEvent)

function loadEvent() {
    spans[2].addEventListener('animationend', animation2);
    spans[1].addEventListener('animationend', animation1);
    // const links = document.querySelectorAll('nav ul li a');
    // links.forEach((a) => {
    //     if (a.innerHTML.toLowerCase().includes(document.location.pathname)) {
    //         a.classList.toggle('active', true);
    //     }
    // })
}

const header = document.querySelector('header');
const skip = document.querySelector('.loading .skip');
skip.addEventListener('click', skipClickEvent);

function skipClickEvent() {
    header.classList.toggle("hide", true);
    skip.classList.toggle("hide", true);
    setTimeout(() => {
        skip.remove();
        spans[0].classList.toggle("disabled", true);
        spans[1].classList.toggle("disabled", true);
        spans[2].classList.toggle("disabled", true);
        headlineCon.classList.toggle("active", true);
        headline.classList.toggle("goup", true)
        block.remove();
        headlineP.classList.toggle("active", true);
        scrolldown.classList.toggle("active", true);
        spans[3].classList.toggle("active", true);
        document.body.classList.toggle("noscroll", false);
        ended = 3;
    }, 200)
    
    setTimeout(() => {
        header.classList.toggle("hide", false);
    }, 1200)
}

spans[0].style.animationIterationCount = num;
spans[1].style.animationIterationCount = num;
spans[2].style.animationIterationCount = num;

let ended = 0;
function animation2() {
    switch (ended) {
        case 0:
            skip.classList.toggle('hide', false);
            spans[0].style.animationName = "joinl";
            spans[0].style.animationFillMode = "forwards";
            spans[0].style.animationDuration = "1.25s";
            spans[0].style.animationTimingFunction = "ease-in-out";
            spans[0].style.animationDelay = "none";
            spans[0].style.animationIterationCount = "1";

            spans[2].style.animationName = "joinr";
            spans[2].style.animationFillMode = "forwards";
            spans[2].style.animationDuration = "1.25s";
            spans[2].style.animationTimingFunction = "ease-in-out";
            spans[2].style.animationDelay = "0s";
            spans[2].style.animationIterationCount = "1";
            ended += 1;
            break;

        case 1:
            spans[0].classList.toggle("disabled");
            // spans[1].className += "block";
            spans[2].classList.toggle("disabled");

            spans[1].style.animationName = "line";
            spans[1].style.animationFillMode = "forwards";
            spans[1].style.animationDuration = "1.25s";
            spans[1].style.animationTimingFunction = "ease-in-out";
            spans[1].style.animationDelay = "0s";
            spans[1].style.animationIterationCount = "1";
            ended += 1;
            break;
    }
}

let headlineCon = document.querySelector('.headline-container');
let headline = document.querySelector('.headline h1');
let headlineP = document.querySelector('.headline p');
let scrolldown = document.querySelector('.headline-container span');
let block = document.querySelector('.loading .block');

function animation1() {
    switch (ended) {
        case 2:
            skip.classList.toggle("hide", true);
            spans[1].style.transform = "translateY(6vw)";
            spans[1].classList.toggle("godown");
            headlineCon.classList.toggle("active");
            headline.classList.toggle("goup")
            block.classList.toggle("godown");
            setTimeout(() => {
                block.remove();
                skip.remove();
                headlineP.classList.toggle("active");
            }, 1500)
            setTimeout(() => {
                scrolldown.classList.toggle("active");
                spans[3].classList.toggle("active");
                spans[1].classList.toggle("disabled");
                document.body.classList.toggle("noscroll", false);
            }, 3000)
            ended += 1;
            break;
    }
}

document.addEventListener('scroll', scrollEvent)
let st = false;
const nav = document.querySelector('.container nav');

function scrollEvent(e) {
    switch (ended) {
        case 3:
            scrolldown.classList.toggle("active", false);
            ended += 1;
            break;
    }

    if (ended == 4) {
    
        const mouseDelta = (window.scrollY - (2*window.innerHeight)),
                maxDelta = window.innerHeight;
        
        const percentage = (mouseDelta / maxDelta) * 100,
                nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        console.log(mouseDelta, percentage, nextPercentage)
        
        track.dataset.percentage = nextPercentage;
        
        // track.animate({
        //     transform: `translate(${nextPercentage}%, -50%)`
        // }, { duration: 1000, fill: "forwards" });
        
        for(const image of track.querySelectorAll("img")) {
            image.animate({
            objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1000, fill: "forwards" , animationTimingFunction: "ease-in-out"});
        }
    }

    if (window.scrollY > window.innerHeight && !st) {
        nav.classList.toggle('fix')
        st = true
    } else if (window.scrollY < window.innerHeight && st) {
        nav.classList.toggle('fix')
        st = false;
    }
}

// image slider
const track = document.querySelector(".container .image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            console.log(mouseDelta, percentage, nextPercentage)
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1000, fill: "forwards" });
    
    for(const image of track.querySelectorAll("img")) {
        image.animate({
        objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1000, fill: "forwards" , animationTimingFunction: "ease-in-out"});
    }
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
