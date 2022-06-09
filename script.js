// to fetch data of a weather we have to use API KEY

let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");

let iconfile;

const searchInput=document.getElementById("search-input");
const searchButton =document.getElementById("search-button");

// to stop browser submisson 

searchButton.addEventListener('click' ,(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const getWeather=async(city)=>
{
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3a0ba4a8b20bedcdd3af2c89ada2145`,
        {mode:"cors"}
        );

        const weatherData =await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        if(id<300 && id>200){
            tempicon.src="./icons/thunderstrom.png"
        }

        else if(id<600 && id>500){
            tempicon.src="./icons/raining.png"
        }

        else if(id<700 && id>600){
            tempicon.src="./icons/snow.png"
        }

        else if(id<800 && id>700){
            tempicon.src="./icons/atmosphere.png"
        }

        else if(id==800){
            tempicon.src="./icons/clear sky.png"
        }

        else if(id<900 && id>800){
            tempicon.src="./icons/clouds.png"
        }



    }

    catch(error){
        alert('city not found');
    }
}



// now first of all we will check for the weather of your current location

window.addEventListener("load" ,()=>{

    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>
        {
        long=position.coords.longitude;
        lat=position.coords.latitude;
        const proxy="https://cors.zimjs.com/";

        // url for local proxy server 


        // now we have to fetch data from the API KEY

        // `` this is called as tilde symbol

        // $ is used in javascript to fetch the data as Jquery


        const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b3a0ba4a8b20bedcdd3af2c89ada2145`

        fetch(api).then((response)=>{

            return response.json();
        })

        // fetch keyword or function is used to fetch information using api
        // we have to convert the json type to text type here

        .then (data =>{
            const{name}=data;
            const{feels_like}=data.main;
            const{id,main}=data.weather[0];

            loc.textContent=name;
            climate.textContent=main;
            tempvalue.textContent=Math.round(feels_like-273);
            // feels_like give the temperature in kelvin

            // now we will write code for diffrent weather types according to their ids
            
            if(id<300 && id>200){
                tempicon.src="./icons/thunderstrom.png"
            }

            else if(id<600 && id>500){
                tempicon.src="./icons/raining.png"
            }

            else if(id<700 && id>600){
                tempicon.src="./icons/snow.png"
            }

            else if(id<800 && id>700){
                tempicon.src="./icons/atmosphere.png"
            }

            else if(id==800){
                tempicon.src="./icons/clear sky.png"
            }

            else if(id<900 && id>800){
                tempicon.src="./icons/clouds.png"
            }

            console.log(data);


        })

        // the javascript will run only if CORS server is used ,it is a local proxy server for a particular location 
    }
        )
    }
})