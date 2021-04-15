const btn = document.querySelector(".btn")
const input = document.getElementById("input")
const span = document.querySelector(".span")

btn.addEventListener("click", function(){


    let words = input.value.split(" ")
    console.log(words);
    let longestWord = ""

    for (let word of words){
        if (word.length > longestWord.length)
        longestWord = word
    }
    span.innerHTML = longestWord
    setTimeout(()=>{input.value = ""}, 200)
})