const daysElem = document.getElementById("days");
const hoursElem = document.getElementById("hours");
const minutesElem = document.getElementById("minutes");
const secondsElem = document.getElementById("seconds");

const secs = 1000;
const mins = 60;
const hs = 60;
const ds = 24;

const today = new Date().getTime();
const endDate = new Date().setHours(new Date().getHours() + 215)
let  t, days , minutes, hours , seconds;

const counter = setInterval(() => {
    let now = new Date().getTime(); // The current time in  milliseconds
    let timeLeft = parseInt(localStorage.getItem('t')); // Get The leftTime for the Launching if it exists in the local storage
   
    if (parseInt(localStorage.getItem("t")) <= 0) {
        localStorage.removeItem("t");
        clearInterval(counter);
        document.querySelector(".title").textContent = "Countdown is Over";
        document.getElementById("counter").hidden = true;
    }

    if (timeLeft > 0) {
        t = timeLeft - 1000
    } else {
        t = endDate - now;  // Calculate the remaining time
    }
    
    days = Math.floor(t / (secs * mins * hs * ds));
    hours = Math.floor((t % (secs * mins * hs * ds)) / (secs * mins * hs));
    minutes = Math.floor((t % (secs * mins * hs)) / (secs * mins))
    seconds = Math.floor((t % (secs * mins)) / secs);

    flip(document.querySelector("[data-seconds]"), seconds);
    flip(document.querySelector("[data-minutes]"), minutes);
    flip(document.querySelector("[data-hours]"), hours);
    flip(document.querySelector("[data-days]"), days);
 
    timeLeft =  days * secs * mins * hs * ds + hours * secs * mins * hs + minutes * secs * mins + seconds * secs  
    localStorage.setItem('t', `${timeLeft}`)
   
}, 1000)

// alternative
// const countToDate = new Date().setHours(new Date().getHours() + 215)
// let previousTimeBetweenDates

// setInterval(() => {
//    const currentDate = new Date()
//    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
//    flipAllCards(timeBetweenDates)

//    previousTimeBetweenDates = timeBetweenDates
// // }, 250)

// function flipAllCards(time) {
//    const seconds = time % 60
//    const minutes = Math.floor(time / 60) % 60
//    const hours = Math.floor(time / 3600)
//    const days = Math.floor(time / )
//    // console.log(days, hours, minutes, seconds)

//    flip(document.querySelector("[data-seconds]"), seconds);
//    flip(document.querySelector("[data-minutes]"), minutes);
//    flip(document.querySelector("[data-hours]"), hours);
//    flip(document.querySelector("[data-days]"), days);
// }

function flip(flipCard, newNumber) {
   const topHalf = flipCard.querySelector(".top-number")
   const startNumber = parseInt(topHalf.textContent)
   if (newNumber === startNumber) return // The golden code

   const bottomHalf = flipCard.querySelector(".bottom-number")
   const topFlip = document.createElement("div")
   topFlip.classList.add("top-flip")
   const bottomFlip = document.createElement("div")
   bottomFlip.classList.add("bottom-flip")
   

   top.textContent = startNumber
   bottomHalf.textContent = startNumber
   topFlip.textContent = startNumber
   bottomFlip.textContent = newNumber

   topFlip.addEventListener("animationstart", e => {
   topHalf.textContent = newNumber
})
   topFlip.addEventListener("animationend", e => {
   topFlip.remove()
})
   bottomFlip.addEventListener("animationend", e => {
   bottomHalf.textContent = newNumber
   bottomFlip.remove()
})
   flipCard.append(topFlip, bottomFlip)
}