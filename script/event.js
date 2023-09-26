const btns = document.querySelectorAll(".btns>li");
const articles = document.querySelectorAll("section article");

let idx = 0;

btns.forEach((el, index) => {
   el.addEventListener("click", ()=>{
      remove(btns);
      remove(articles);
      add(btns);
      add(articles);
      idx = index;

      function remove(el){
         el[idx].classList.remove("on");
      }
      function add(el){
         el[index].classList.add("on");
      }
   })
});

