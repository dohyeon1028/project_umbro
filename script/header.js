const header = document.querySelector("header");
const headerBox = document.querySelector(".headerBox");
const a = document.querySelector("#gnb li a");

if(window.innerWidth > 768){
    window.addEventListener("scroll", ()=>{
        const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    
        if(scroll < 10){
            headerBox.style.height = `${6 - scroll * 0.15}vw`
            
            header.style.height = "6vw";
        } 
        else if(scroll > 10){
            headerBox.style.height = "3vw";
    
            header.style.height = "3vw";
        }
    })
}

const bars = header.querySelector(".fa-bars");
const mobile_aside = document.querySelector(".mobile_aside");
const mobile_aside_closeBtn = mobile_aside.querySelector(".close");
const body = document.querySelector("body")
bars.addEventListener("click", ()=>{   
    mobile_aside.classList.add("on");
})
mobile_aside_closeBtn.addEventListener("click", ()=>{
    mobile_aside.classList.remove("on");
})