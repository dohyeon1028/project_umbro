const articles = document.querySelectorAll("section article");

articles.forEach((el, index) => {
    el.querySelector(".imgBox").addEventListener("mouseenter", ()=>{
        el.querySelector(".before").style.opacity = "0";
        
        setTimeout(() => {
            el.querySelector(".after").style.opacity = "1";
        }, 10);
    })
    el.querySelector(".imgBox").addEventListener("mouseleave", ()=>{
        setTimeout(() => {
            el.querySelector(".before").style.opacity = "1";
        }, 10);
        el.querySelector(".after").style.opacity = "0";
    })
});