let Mainslide;

if(window.innerWidth > 450){
    const frame = document.querySelector("#frame");
    const panel = frame.querySelector(".panel");
    const interval = 3000;
    init();
    Mainslide = setInterval(() => {
        nextSlide();
        vidSlide();
    }, interval);
    


    function nextSlide(){

        const duration = 500;
        const initialValue = parseInt(panel.style.left);

        const targetValue = -200;
        const unit = "%";

        const startTime = performance.now();

        function animate(time){
            const timeReal = time - startTime;
            const progress = timeReal / duration;
            const currentValue = initialValue + (targetValue - initialValue) * progress;
            panel.style.left = `${currentValue}${unit}`;

            if(progress < 1){
                requestAnimationFrame(animate);
            }else if(progress >= 1){
                panel.style.left = "-100%";
                panel.append(panel.firstElementChild);
            }

        }
        requestAnimationFrame(animate);
    }

    function init(){
        panel.style.left = "-100%";
        panel.prepend(panel.lastElementChild);    
    }

    //ball rotate

    window.addEventListener("scroll", ()=>{
        const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const ball =  document.querySelector(".wrap .ball");
        if(scroll > 400){
            ball.classList.add("on");
        }else{
            ball.classList.remove("on");
        }
        
    })
}else{
    clearInterval(Mainslide);
}

const vidList = document.querySelector(".vidList");
const video_frame = vidList.querySelector(".video_frame");
let key = "AIzaSyDo3ukttxmit7HO2U0lP8ekZyRlZeUAVZ0";
let playlistId = "PLbpunYhud0VvdFsrmh_G73_-dGUcDPO67";
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;
let num = 0;

fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;
        let result = '';
        items.map((el, index) => {

            let title = el.snippet.title;
            if(title.length > 20){
                title = title.substr(0, 20) + "...";
            }

            let des = el.snippet.description
            if(des.length > 100){
                des = des.substr(0, 100) + "...";
            }

            let date = el.snippet.publishedAt
            date = date.split("T")[0];

            result += `
                <article style="left: ${(50 + (25 * index)) % 100}%;">
                    <img src="../img/football/youtube/pc_ucustom_contents_zone.png" class="bg" alt="컨텐츠란 배경사진">
                    <a href="${el.snippet.resourceId.videoId}" class="pic">
                        <img src="${el.snippet.thumbnails.medium.url}">
                    </a>

                    <div class="con">
                        <h2>CONTENTS ZONE</h2>
                        <p>2023 UMBRO x GOALE</p>
                        <a href="${el.snippet.resourceId.videoId}">View more</a>
                    </div>
                </article>
            `;
        })
        video_frame.style.left = "-200%";
        video_frame.innerHTML = result;
    })

function vidSlide(){
    const articles = video_frame.querySelectorAll("article");
    
    video_frame.style.left = "-200%";

    const len = articles.length;
    num = (num + 1 + len) % len;
    
    articles.forEach((el) => {
        num = (num + 1 + len) % len;
        el.style.left = `${(num * 25) + 25}%`;
        if(num == 3){
            el.style.opacity = "0";
        }else if(num == 1){
            el.style.opacity = "1";
        }
    });
}

let isPop = false

vidList.addEventListener("click", (e) => {
    if(isPop) return;
    e.preventDefault();
    const vidId = e.target.closest("article").querySelector("a").getAttribute("href");

    const header = document.querySelector("header");
    header.style.display = "none";

    let pop = document.createElement("figure");
    pop.classList.add("pop");

    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder = "0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose"><img src="../img/football/youtube/close.png" alt="CloseBtn"></span>
    `;
    vidList.append(pop);
});

vidList.addEventListener("click",(e)=>{
    isPop = true
    const pop = vidList.querySelector(".pop");
    const header = document.querySelector("header");
    
    if(pop){
        const close = pop.querySelector("span>img");
        if(e.target == close){
            pop.remove();
            header.style.display = "block";
            isPop = false;
        } 
    }
})
