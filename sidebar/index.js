const btn = document.querySelector(".sidebar-toggle")
const btnCancel = document.querySelector(".close-btn")
const sidebar = document.querySelector(".sidebar")

btn.addEventListener("click", function(){
    sidebar.classList.toggle("show-sidebar")
})
btnCancel.addEventListener("click", function(){
    sidebar.classList.remove("show-sidebar")

})