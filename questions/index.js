// traversing the dom
// const questionBtns = document.querySelectorAll(".question-btn")

// questionBtns.forEach(function (btn) {
//     btn.addEventListener("click", function (e) {
//         const question = e.currentTarget.parentElement.parentElement;
//         const questionArt = document.querySelectorAll(".question")  
//         questionArt.forEach(item=>{
//             if(item !== question){
//                 item.classList.remove("show-text")
//                 console.log(item  );
//             }
//         })
//         question.classList.toggle("show-text")
//     })
// })



const questions = document.querySelectorAll(".question")

for( let question of questions){
    const btn = question.querySelector(".question-btn")
    // console.log(btn);
    btn.addEventListener("click", function(){
        questions.forEach(function(item){
            if(item !== question){ 
               item.classList.remove("show-text")
            }
        })
        question.classList.toggle("show-text")
    })
}