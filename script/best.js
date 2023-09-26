const articles = document.querySelectorAll("section article");
const articles_len = articles.length;

articles.forEach((el, index) => {
   el.innerHTML += `<div class="rank">${index+1}</div>`
});


