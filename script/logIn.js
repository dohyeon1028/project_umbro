const form = document.querySelector("#formLogin");
const btnSubmit = form.querySelector("button[type=submit]");

btnSubmit.addEventListener("click", (e)=>{
   if(!isTxt("loginId", 5)) e.preventDefault();
   if(!isTxt("loginPwd", 8)) e.preventDefault();

})

function isTxt(el, len){
   let input = form.querySelector(`#${el}`); 
   let txt = input.value;

   if(txt.length >= len){
      return true;
   }
   else{
      if(el == "loginId"){
         input.setAttribute("placeholder", "아이디를 입력해주세요"); 
         alert("아이디를 입력해주세요");
         input.focus();
      }else if(el == "loginPwd"){
         input.setAttribute("placeholder", "비밀번호를 입력해주세요"); 
         alert("비밀번호를 입력해주세요");
      }
      input.classList.add("on");
      return false
   }
}