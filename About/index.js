const btns = document.querySelectorAll(".tab-btn")
const about = document.querySelector(".about")
const articles = document.querySelectorAll(".content")

about.addEventListener("click", function(e){
   const id = e.target.dataset.id
   if(id){
    //    remove active from all btns
       btns.forEach(function(btn){
           btn.classList.remove("active")
        //    add active class to current button
           e.target.classList.add("active")
       })

    //   hide all articles initially
    articles.forEach((article)=>{
        article.classList.remove("active") 
    }) 

    const element = document.getElementById(id)
    element.classList.add("active")
   }
})