const userLocation = document.getElementById("city-input"),
    converter = document.getElementById("converter"),
    weathericon = document.querySelector(".weather-icon"),
    temprature = document.querySelector(".temprature"),
    feelslike = document.querySelector(".feels-like"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),
    hvalue = document.querySelector(".h-value"),
    wvalue = document.querySelector(".w-value"),
    srvalue = document.querySelector(".sr-value"),
    ssvalue = document.querySelector(".ss-value"),
    cvalue = document.querySelector(".c-value"),
    uvvalue = document.querySelector(".uv-value"),
    pvalue = document.querySelector(".p-value"),
    forecast = document.querySelector(".forecast"),
    search = document.querySelector(".fa-search");



async function getinfo() {
    const cityInputee = userLocation.value.trim();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputee}&appid=${API_KEY}&units=metric`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`city not found : ${cityInputee}`)
        }
        const data = await response.json();


        temprature.innerHTML = `${data.list[0].main.temp}°C`
        feelslike.innerHTML = `<p> feels like ${data.list[0].main.feels_like}°c</p>`
        hvalue.innerHTML = `<p>${data.list[0].main.humidity} %</p>`
        pvalue.innerHTML = `<p>${data.list[0].main.humidity} hpa</p>`
        const icon = data.list[0].weather[0].icon;
        weathericon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png"/>`
        description.innerHTML = `<p>${data.list[0].weather[0].description}</p>`
        city.innerHTML = `<h2>${data.city.name}</h2>`
        wvalue.innerHTML = ` <p>${data.list[0].wind.speed} m/s</p>`
        cvalue.innerHTML = ` <p>${data.list[0].clouds.all} %</p>`

        let sunrise = new Date(data.city.sunrise * 1000)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        srvalue.innerHTML = ` <p>${sunrise}</p>`
        let sunset = new Date(data.city.sunset * 1000)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        ssvalue.innerHTML = ` <p>${sunset}</p>`

        date.innerHTML = ` <p>${data.list[0].dt_txt} </p>`
        uvvalue.innerHTML = ` <p>${data.list[0].visibility} meters</p>`

        // daily data 
        for (let i = 0; i < data.list.length; i += 8) {
            let card = document.createElement("div");
            card.classList.add("forecast-card");
            let icon1 = data.list[i].weather[0].icon;
            let dateObj = new Date(data.list[i].dt * 1000);

            // Format to "12 Aug"
            let carddate = dateObj.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short"
            });
            card.innerHTML = `<p>${carddate}</p> 
           <img src="https://openweathermap.org/img/wn/${icon1}@2x.png"/>
           <p>${data.list[i].main.temp}°C`
            forecast.appendChild(card);
            userLocation.value="";
        }

    } catch (error) {
        alert(`${error}`)
    }
}