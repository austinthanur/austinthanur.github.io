const grids = document.querySelectorAll('.card-group');
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menuBtn');
const grouper = document.querySelectorAll('.grouper');
const close = document.querySelector('.close');

menuBtn.addEventListener('click', menuClick);
function menuClick() {
    menuBtn.classList.toggle('hide', true);
    grouper[0].classList.toggle('move', true);
    grouper[1].classList.toggle('move', true);
    menu.classList.toggle('active', true);
}

close.addEventListener('click', closeClick);
function closeClick() {
    menuBtn.classList.toggle('hide', false);
    grouper[0].classList.toggle('move', false);
    grouper[1].classList.toggle('move', false);
    menu.classList.toggle('active', false);
}

window.addEventListener('keydown', keyPress)
function keyPress (e) {
    if(e.key === "Escape" || e.code == 27) {
        menuBtn.classList.toggle('hide', false);
        grouper[0].classList.toggle('move', false);
        grouper[1].classList.toggle('move', false);
        menu.classList.toggle('active', false);
    }
}

const load = document.querySelector('.loading');
const loading = document.querySelector('.loading p');

window.addEventListener('load', loadEvent, false)

function loadEvent() {

    let heic = [...Array(17).keys()].map((i) => i + '.png')
    let jpeg = [...Array(7).keys()].map((i) => i + '.jpeg')
    let jpg = [...Array(12).keys()].map((i) => i + '.jpg')

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }

    shuffle(heic)
    shuffle(jpeg)
    shuffle(jpg)

    let all = [...heic, ...jpeg, ...jpg]
    shuffle(all)
    let count = 0;

    function makeCard(img, group) {
        const cardDiv = document.createElement('div');
        cardDiv.className += "card";
        
        const image = document.createElement('img');
        image.src = new URL(`../img/${img}`, import.meta.url).href;
        image.onload = imgCount;

        grids[group].appendChild(cardDiv);
        cardDiv.appendChild(image);
        count++;
    }

    let imageLoaded = 0;
    function imgCount() {
        imageLoaded += 1;
        loading.innerHTML = ((imageLoaded/all.length) * 100).toFixed(2) + "%"
        if (all.length == imageLoaded) {
            load.classList.toggle('hide', true)
            inac = setInterval(() => {
                autoScroll = true;
            }, 5000)
                
            addPos0 = grids[0].offsetHeight * 0.00005 * 1.1;
            addPos1 = grids[1].offsetHeight * 0.000035 * 1.1;
            addPos2 = grids[2].offsetHeight * 0.000055 * 1.1;
            addPos3 = grids[3].offsetHeight * 0.00004 * 1.1;
            window.requestAnimationFrame(frame)
        }
    }

    let n = 0;
    all.forEach((item) => {
        makeCard(item, n);
        if (n >= 3) {
            n = 0;
        } else {
            n++
        }

        if (count/all.length == 1) {
        }
    })
}

let autoScroll = false;

let inac;
window.addEventListener('wheel', wheelEvent)

function wheelEvent(e) {
    let addPos0s = grids[0].offsetHeight * 0.00015 * 100;
    let addPos1s = grids[1].offsetHeight * 0.00012 * 100;
    let addPos2s = grids[2].offsetHeight * 0.00016 * 100;
    let addPos3s = grids[3].offsetHeight * 0.00011 * 100;

    if (e.deltaY > 0) {
        pos0 = pos0 >= (grids[0].offsetHeight - window.innerHeight) ? (grids[0].offsetHeight - window.innerHeight) : pos0 + addPos0s;
        grids[0].style.transform = `translateY(-${pos0}px)`;
        
        pos1 = pos1 >= (grids[1].offsetHeight - window.innerHeight) ? (grids[1].offsetHeight - window.innerHeight) : pos1 + addPos1s;
        grids[1].style.transform = `translateY(-${pos1}px)`;
        
        pos2 = pos2 >= (grids[2].offsetHeight - window.innerHeight) ? (grids[2].offsetHeight - window.innerHeight) : pos2 + addPos2s;
        grids[2].style.transform = `translateY(-${pos2}px)`;
        
        pos3 = pos3 >= (grids[3].offsetHeight - window.innerHeight) ? (grids[3].offsetHeight - window.innerHeight) : pos3 + addPos3s;
        grids[3].style.transform = `translateY(-${pos3}px)`;

    } else if (e.deltaY < 0) {
        pos0 = (pos0 - addPos0s) <= 0 ? 0 : pos0 - addPos0s;
        grids[0].style.transform = `translateY(-${pos0}px)`;
        
        pos1 = (pos1 - addPos1s) <= 0 ? 0 : pos1 - addPos1s;
        grids[1].style.transform = `translateY(-${pos1}px)`;
        
        pos2 = (pos2 - addPos2s) <= 0 ? 0 : pos2 - addPos2s;
        grids[2].style.transform = `translateY(-${pos2}px)`;
        
        pos3 = (pos3 - addPos3s) <= 0 ? 0 : pos3 - addPos3s;
        grids[3].style.transform = `translateY(-${pos3}px)`;
    }

    autoScroll = false;
    // window.clearTimeout(inac)
    // inac = setTimeout(() => {
    //     autoScroll = true;
    // }, 3500)    
}

let pos0 = 0;
let pos1 = 0;
let pos2 = 0;
let pos3 = 0;
let addPos0;
let addPos1;
let addPos2;
let addPos3;
function frame() {
    if (autoScroll) {
        pos0 = pos0 >= (grids[0].offsetHeight - window.innerHeight) ? (grids[0].offsetHeight - window.innerHeight) : pos0 + addPos0;
        grids[0].style.transform = `translateY(-${pos0}px)`;
        
        pos1 = pos0 >= (grids[1].offsetHeight - window.innerHeight) ? (grids[1].offsetHeight - window.innerHeight) : pos1 + addPos1;
        grids[1].style.transform = `translateY(-${pos1}px)`;
        
        pos2 = pos2 >= (grids[2].offsetHeight - window.innerHeight) ? (grids[2].offsetHeight - window.innerHeight) : pos2 + addPos2;
        grids[2].style.transform = `translateY(-${pos2}px)`;
        
        pos3 = pos3 >= (grids[3].offsetHeight - window.innerHeight) ? (grids[3].offsetHeight - window.innerHeight) : pos3 + addPos3;
        grids[3].style.transform = `translateY(-${pos3}px)`;
    }

    window.requestAnimationFrame(frame);
}
