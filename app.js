window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const tempSectionSpan = document.querySelector(".degree-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/5fd7304bdb28c0d2f912d84660e6abfc/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                const {temperature,summary, icon} = data.currently;
                //set DOM elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent= data.timezone;
                //set icon
                setIcons(icon,document.querySelector(".icon"));

                //Formula to convert temperature to celsius
                let celsius = (temperature -32) * (5/9);

                //conversion of temperature to celsius/fahrenheit
                setTemperature(celsius,temperature);


            })

        });

    }
    // else{
    //     console.log("denied");
    //     locationTimeZone.textContent = "APP IS NOT WORKING BECAUSE GEOLOCATION ACCESS IS DENIED";
    // }

    function setTemperature(celsius,temperature){
        temperatureSection.addEventListener("click", ()=>
        {
            if(tempSectionSpan.textContent === "F"){
                tempSectionSpan.textContent = "°C";
                temperatureDegree.textContent = Math.floor(celsius);
            }else{
                tempSectionSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
            }
        });
    }

    function setIcons(icon , iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});