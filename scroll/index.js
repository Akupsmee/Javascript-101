// DYNAMIC DATE
const weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Friday", "Saturday"]

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const year = document.getElementById("year")
const month = document.getElementById("month")
const day = document.getElementById("day")
const digit = document.getElementById("digit")

year.innerHTML = new Date ().getFullYear()
month.innerHTML = months[new Date ().getMonth()]
day.innerHTML = weekDays[new Date ().getDay()]
digit.innerHTML = new Date ().getUTCDate()


//close links
const navToggle = document.querySelector(".nav-toggle")  
const linksContainer = document.querySelector(".links-container")  
const links = document.querySelector(".links")

navToggle.addEventListener("click", function(){
    // linksContainer.classList.toggle("show-links")
    
    // dynamically add link height
    // getBoundingClientRect returens the size of an element and its position relative to the viewport

    const containerHeight =linksContainer.getBoundingClientRect().height
    const linksHeight =links.getBoundingClientRect().height
  
    if(containerHeight ===0){
        linksContainer.style.height = `${linksHeight}px`
    }else{
    linksContainer.style.height = 0
}
})



// fixed navbar

// pageYOffset is a read only window preoperty that returns the number of pixels the document has been scrolled vertically
const navbar = document.querySelector("#nav")
const topLink = document.querySelector(".top-link")

window.addEventListener("scroll", function(){
    const navbarHeight =navbar.getBoundingClientRect().height
    const scrollHeight = window.pageYOffset

    if(scrollHeight> navbarHeight){
        navbar.classList.add("fixed-nav")
    }else{
        navbar.classList.remove("fixed-nav")
    }

    if (scrollHeight > 500 ){
        topLink.classList.add("show-link")
    }else{
        topLink.classList.remove("show-link")
    }
})

// smooth-scroll

const scrollLinks = document.querySelectorAll(".scroll-link")

scrollLinks.forEach(function(link){
    link.addEventListener("click", (e)=>{
        // prevent default scrolling
        e.preventDefault()
        // NAVIGATE TO SPECIFIC SPOT
        const id = e.currentTarget.getAttribute("href").slice(1)
        //console.log(id);
       const item =  document.getElementById(id)

    //    calculating the nav Height
    const navHeight = navbar.getBoundingClientRect().height
    const containerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = navbar.classList.contains("fixed-nav")

    let position = item.offsetTop-navHeight

    // position -= navHeight substracts the height on large and small screen.

    // if(navHeight > 82) but for small screens this height is larger because the link is displayed block. So we need to add back the overflow height from this links to make sure we are only substracting the actual navheight(and not subtracting the navheight and extra overflow height gotten from the a tags in small screens due to them been dispalyed block(offcourse with extra height).)

    // IN Ssummary we are trying to get a height for conditions of fixed Navbar and conditions of unfixed Navbar

    if(!fixedNav){
        position -=navHeight
    }
    if(navHeight > 82){
    //     //  since for small screens we substract a larger value of navHeight we need to add back the linkContainer height to make sure that we are only subtracting the same height (~82px) for both large and small screens
         position = position + containerHeight
     }
        window.scrollTo({
            left:0,
            top:position,
            behavior: "smooth"
        })
        linksContainer.style.height = 0;

    })
})