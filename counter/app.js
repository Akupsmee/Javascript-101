let count = 0;
const btns = document.getElementsByClassName('btn')
//alert(btns);
const span = document.getElementById("value")

for(let btn of btns){
    btn.addEventListener("click", function(e){
      const start = e.currentTarget.classList
      if (start.contains("increase")){
          count++
          document.body.style.color = "green"
        }else if (start.contains("decrease")){
            count--
            document.body.style.color = "red"
        }else{
            count = 0
            document.body.style.color = "black"
      }
      console.log(count);
      if(count > 0){
          span.style.color = "green"
      }
      else if(count < 0){
          span.style.color = "red"
      }else{
          span.style.color ="black"
      }
      span.textContent = count
    })
    
}