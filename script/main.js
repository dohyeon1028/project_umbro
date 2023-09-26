const frame = document.querySelector("#frame");
const panel = frame.querySelector(".panel");
const panel_lis = panel.querySelectorAll("li");
const interval = 3000;
let len = panel_lis.length;
let slide;

if(window.innerWidth > 450){
    init();
    slide = setInterval(() => {
        nextSlide();
    }, interval);


    function nextSlide(){

        const duration = 500;
        const initialValue = parseInt(panel.style.left);

        const targetValue = -200;
        const unit = "vw";

        const startTime = performance.now();

        function animate(time){
            const timeReal = time - startTime;
            const progress = timeReal / duration;
            const currentValue = initialValue + (targetValue - initialValue) * progress;
            panel.style.left = `${currentValue}${unit}`;

            if(progress < 1){
                requestAnimationFrame(animate);
            }else if(progress >= 1){
                panel.style.left = "-100vw";
                panel.append(panel.firstElementChild);
            }

        }
        requestAnimationFrame(animate);
    }

    function init(){
        panel.style.left = "-100vw";
        panel.prepend(panel.lastElementChild);
    }

    //banner
    const banner_item_wrap = document.querySelector("#banner .item_wrap");
    const banner_slide_ul = banner_item_wrap.querySelector(".imgBox .banner_slide");
    const banner_slide_ul_lis = banner_slide_ul.querySelectorAll("li");
    const imgBox_btns = banner_item_wrap.querySelectorAll(".btns li");

    imgBox_btns.forEach((el, index) => {
        banner_slide_ul.style.left = `0%`
        banner_slide_ul_lis[index].style.left = `${index * 100}%`
        el.addEventListener("click", ()=>{
            for (const el of imgBox_btns) {
                el.classList.remove("on");
            }
            el.classList.add("on");
            banner_slide_ul.style.left = `${index * -100}%`
        })
    });


    const items_wrap = document.querySelector(".items_wrap");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    prevBtn.addEventListener("click", ()=>{
        items_wrap.prepend(items_wrap.lastElementChild);
    })
    nextBtn.addEventListener("click", ()=>{
        items_wrap.append(items_wrap.firstElementChild);
    })


    const sections = document.querySelectorAll("#full_banner section");

    for(let i = 0; i < 4; i++){
        (i % 2 == 0) ? sections[i].style.left = "-100%" : sections[i].style.right = "-100%";
        sections[i].style.opacity = "0";
    }
    const section_Y = [];
    for(let el of sections){
        section_Y.push(el.offsetTop);
    }

    window.addEventListener("scroll", ()=>{
        const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        
        for(let i = 0; i < 4; i++){
            if(scroll >= section_Y[i] - 800){
                (i % 2 == 0) ? sections[i].style.left = "0" : sections[i].style.right = "0";
                sections[i].style.opacity = "1";
            }
        }

    })
}else{
    clearInterval(slide);
}

var mobileWidth = window.matchMedia("screen and (max-width: 450px)");

if(mobileWidth.matches){
    
    let startPoint = 0;
    let endPoint = 0;
    
    panel.addEventListener("touchstart", (e)=>{
        startPoint = e.touches[0].pageX;
    })
    panel.addEventListener("touchend", (e)=>{
        endPoint = e.changedTouches[0].pageX;
        
        if (startPoint < endPoint) {
            frame_prevMove();
        } else if (startPoint > endPoint) {
            frame_nextMove();
            
            
        }
        startPoint = 0;
        endPoint = 0;
    })

    function frame_prevMove(){
        panel.prepend(panel.lastElementChild);
    }
    function frame_nextMove(){
        panel.append(panel.firstElementChild);
        
    }

    const items_wrap = document.querySelector(".items_wrap");
    const articles = items_wrap.querySelectorAll("article");

    let article = ``;

    items_wrap.innerHTML = ``;

    articles.forEach(el => {
        article += `
        <li>
            ${el.innerHTML}
        </li>
        `
    });
    items_wrap.innerHTML = article;
    
    items_wrap.addEventListener("touchstart", (e)=>{
        startPoint = e.touches[0].pageX;
    })
    items_wrap.addEventListener("touchend", (e)=>{
        endPoint = e.changedTouches[0].pageX;
        
        if (startPoint < endPoint) {
            recommend_prevMove();
            console.log("left");
        } else if (startPoint > endPoint) {
            console.log("right");
            recommend_nextMove();
            
            
        }
        startPoint = 0;
        endPoint = 0;
    })

    function recommend_prevMove(){
        items_wrap.prepend(items_wrap.lastElementChild);
    }
    function recommend_nextMove(){
        items_wrap.append(items_wrap.firstElementChild);
    }

    const full_banner = document.querySelector("#full_banner");
    let eventTitle = `<h1>EVENT</h1>`;
    
    let event = document.createElement("h1");
    event.innerText = "event";
    full_banner.prepend(event);

}
