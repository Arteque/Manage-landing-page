// Show backgroundcolor 
const sections = document.querySelectorAll("section")
const mainHeader = document.querySelector("header#main-header")
document.addEventListener("scroll", (e) => {
    let scrollPos = window.scrollY
    if(scrollPos >= 500){
        mainHeader.classList.add("scroll")
    }else{
        mainHeader.classList.remove("scroll")
    }
})




//JSON DATA

const testimonialSliderContainer = document.querySelector("#testimonials-section .sliders")


function setupCurrent(index){
    if(index > 1) return ""
    return "current"
}

function sliderTemplate(item){

    return `
    <div class="slider ${setupCurrent(item.id)}">
        <img src="./images/${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>
            “${item.comm}”
        </p>
    </div>
    `
}

//Fetch Data

async function fetchData(){
    const data = await fetch("./testimonials.json")
    const response = data.json()
    return response
}


fetchData()
.then(items => {
    testimonialSliderContainer.innerHTML = items.map(sliderTemplate).join("")
    return items
})
.then((items) => {
    const sliderCtrls = document.querySelector(".dots-container")
    // remove all the items from the parent element
    sliderCtrls.innerHTML = ""
    items.forEach((item, index) => {
        let DOMLi = document.createElement("li")
        index == 0 && DOMLi.classList.add("current")
        sliderCtrls.appendChild(DOMLi)
    })
    
})
.then(() => {


    const sliders = [...document.querySelectorAll(".sliders .slider")]
    const ctrls = document.querySelectorAll(".dots-container li")
    

    

    ctrls.forEach((ctrl, index) => {
        ctrl.addEventListener("click", (e) => {
            const currentSlider = document.querySelector(".sliders .slider.current")
            const i = sliders.indexOf(currentSlider)

            currentSlider.classList.remove("current")
            ctrls[i].classList.remove("current")

            sliders[index].classList.add("current")
            ctrl.classList.add("current")

            //resize the box
            const box = sliders[index].getBoundingClientRect()
            const boxHeight = box.height
            sliders[index].parentElement.style.cssText = "height:"+boxHeight+"px"
        })
    })
})