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

spans[0].style.animationIterationCount = num;
spans[1].style.animationIterationCount = num;
spans[2].style.animationIterationCount = num;

spans[2].addEventListener('animationend', animation2);
spans[1].addEventListener('animationend', animation1);

let ended = 0;
function animation2() {
    switch (ended) {
        case 0:
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
            spans[0].className += "disabled";
            // spans[1].className += "block";
            spans[2].className += "disabled";

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
            spans[1].style.transform = "translateY(6vw)";
            spans[1].className += "godown";
            headlineCon.className += " active";
            headline.className += "goup";
            block.className += " godown";
            setTimeout(() => {
                block.remove();
                headlineP.className += "active";
            }, 1500)
            setTimeout(() => {
                scrolldown.className += "active";
            }, 3000)
            ended += 1;
            break;

        case 3:
    }
}

// setTimeout(() => {
//     spans[0].style = "animation: none !important";
// }, 2100);

// setTimeout(() => {
//     spans[1].style = "animation: none !important";
// }, 2500);

// setTimeout(() => {
//     spans[2].style = "animation: none !important";
// }, 2900);


