let inputSearch= document.querySelector("#inputSearch")
let btnSearch= document.querySelector("#btnSearch")
let tableWeather= document.querySelector("#tableWeather")


 btnSearch.addEventListener("click", function(e){
  e.preventDefault()
search(inputSearch.value)
 })


 inputSearch.addEventListener("keyup", function(e){
console.log(e.target.value);
  search(e.target.value)
 })


async function search(e){
 var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c43e0586fa84e79823151555233012&q=${e}&days=3`)
 response= await response.json()
 var forecastday= response.forecast.forecastday
 currentDay(response,forecastday)
 weatherAnotherDays(forecastday)

 }



let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

 function currentDay(t,e){
  let newDate= new Date(e[0].date.replace(" ","T"))
  let Cols=""
  Cols=`<div class="col-lg-4 mb-3">
  <div class="row">
      <div class="headerText col-md-12 d-flex justify-content-between p-2 text-secondary">
          <span>${days[newDate.getDay()]}</span>
          <span>${newDate.getDate() + months[newDate.getMonth()]}</span>
      </div>
      <div class="col-md-12 mt-4  text-secondary">
          <p>${t.location.name}</p>
          <h1 class="text-white" style="font-size: xxx-large;">${e[0].day.avgtemp_c} °c</h1>
          <img src="http:${e[0].day.condition.icon}" alt="">
          <p class="text-primary">${e[0].day.condition.text}</p>
        </div>
    <div class=" col-md-12 text-secondary d-flex justify-content-evenly">
<span class=" d-flex align-items-center"> 
<img class="me-2" src="./imgs/icon-umberella.png" alt="">
<span>20%</span>
</span >
<span class="d-flex align-items-center ">
<img class="me-2" src="./imgs/icon-wind.png" alt=""
<span>15Km/h</span>
</span>
<span class=" d-flex align-items-center ">
<img class="me-2" src="./imgs/icon-compass.png" alt="">
<span>East</span>
</span>
    </div>     
  </div>
</div>`
tableWeather.innerHTML=Cols
 }



 function weatherAnotherDays(e){

  let anotherCols=""
  for(let i=1; i<e.length; i++){
    let newDate= new Date(e[i].date.replace(" ","T"))
    anotherCols += `  <div id="anotherCols" class="col-lg-4 ">
   <div class="row">
       <div class="headerText text-center col-md-12  p-2 text-secondary">
           <span >${days[newDate.getDay()]}</span>
          
       </div>
       <div class="col-md-12 mt-4 text-center text-secondary">
       <img class="mt-3" src="http:${e[i].day.condition.icon}" alt="">
           <h1 class="text-white mt-4">${e[i].day.avgtemp_c} °c</h1>
  
           <p class="text-primary mt-4">${e[i].day.condition.text}</p>
         </div>
    
   </div>
 </div>
 `

  }
  tableWeather.innerHTML+=anotherCols
 }


 search("cairo")