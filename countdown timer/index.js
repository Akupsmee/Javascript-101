const months = ["January", "february", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const deadline = document.querySelector(".deadline")
const giveaway = document.querySelector(".giveaway")
const items = document.querySelectorAll(".deadline-format h4")
// future Time dynamically passed 10days
let tempDate  = new Date();
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()

// future time hardcoded
// let futureDate = new Date(2021,5, 25, 9, 30, 0);

// adding dynamic functionality to the date field; 11 days from whenever the app is launched
const futureDate = new Date(tempYear, tempMonth, tempDay + 11, 11, 30, 0)

const date = futureDate.getDate()
const year = futureDate.getFullYear()
const month = months[futureDate.getMonth()]
const days = weekdays[futureDate.getDay()]
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const seconds = futureDate.getSeconds()


giveaway.textContent = `giveaway ends on  ${days}, ${date} ${month}  ${year} ${hours}:${minutes}am`
// future time in ms
const futureTime = futureDate.getTime()

function getRemainingTime(){
    // current
    const currentTime = new Date().getTime()
    const t = futureTime -currentTime
    // console.log(t);
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60min
    // 1day = 24hr

    // values in ms 
    const oneDay = 24 * 60 * 60 * 1000
    const oneHour = 60 * 60 * 1000
    const oneMin =  60 * 1000
    const oneSec =   1000

    // calculate value of time remaining

    // days
    let days = t / oneDay
    days = Math.floor(days)
    // hours
    let hours = (t % oneDay) / oneHour
    hours =   Math.floor(hours)
    // mins
    let mins = (t % oneHour)/ oneMin
    mins =    Math.floor(mins)
    // sec
    let secs = (t % oneMin)/ oneSec
    secs =    Math.floor(secs)

    // Set values array;
    const values = [days, hours, mins, secs]

    //to beautify:  Add a preceeding 0 if values[index] has a value less than 10
        function format(item){
            if(item < 10){
               return item = `0${item}` 
            }else{
               return item 
            }
        }
    

    // pass the values into the items declared in the dom making sure the values are formated with the format function
    items.forEach((item,index)=>{
        item.innerHTML = format(values[index])
    })

    if(t <0 ){
        clearInterval(countdown)
        deadline.innerHTML = `<h4 class="expired"> Sorry this giveaway has expired</h4>`
    }

    }

    // countdown
let countdown = setInterval(getRemainingTime,1000)

getRemainingTime()











