window.addEventListener('beforeunload', (e) => {
    event.preventDefault();

    window.scrollY = 0;
    window.pageYOffset = 0; 
    document.documentElement.scrollTop = 0;

});
const submit = document.querySelector("#submit");
let isDataChanged = false;
let submitted = false;

document.addEventListener("DOMContentLoaded", function(){
    var formEl = document.querySelectorAll("input, textarea");

    formEl.forEach(function(el){
        el.addEventListener("change",function(){
            isDataChanged = true;
        })
    })
})



submit.addEventListener("click",()=>{
    submitted = true;
})

window.addEventListener("beforeunload", function(e){
    
    if(isDataChanged && !submit){
        var confirmMsg = "변경 사항이 저장되지 않을 수 있습니다. 정말로 이 페이지를 떠나시겠습니까?";

        e.returnValue = confirmMsg;
        return confirmMsg;
    }
})

