//api.openweathermap.org/data/2.5/weather?q={city name}&appid=90097385080ce7e78b756f4b298ae50d
//https://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={API key}
//https://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=90097385080ce7e78b756f4b298ae50d
$(document).ready(function() {
    $('#city').keypress(function(e) {
        if(e.keyCode==13)
        GetWeater();
    });
});
function GetWeater() {
    console.log("https://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("city").value + "&appid=90097385080ce7e78b756f4b298ae50d");
    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("city").value + "&appid=90097385080ce7e78b756f4b298ae50d");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            let info = JSON.parse(xhr.responseText);
            console.log(info);
            let area = document.getElementById("weather");
            area.innerHTML = "";
            area.appendChild(document.createElement("br"));
            let title = document.createElement("h2");
            title.innerHTML = info.name + ", " + info.sys.country;
            area.appendChild(title);
            let generalweather = document.createElement("p");
            generalweather.innerHTML = info.weather[0].main;
            area.appendChild(generalweather);
            let time = document.createElement("p");
            let now = new Date();
            time.innerHTML = "Tid: ";
            if(now.getHours() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getHours() + ":";
            if(now.getMinutes() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getMinutes() + ":";
            area.appendChild(time);
            if(now.getSeconds() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getSeconds();
            let coordinates = document.createElement("p");
            coordinates.innerHTML = "Koordeinater: ";
            if(info.coord.lat < 0) {
                coordinates.innerHTML += (-1) * info.coord.lat.toPrecision(4) + "°S ";
            }
            else {
                coordinates.innerHTML += info.coord.lat.toPrecision(4) + "°N ";
            }
            if(info.coord.lon < 0) {
                coordinates.innerHTML += (-1) * info.coord.lon.toPrecision(4) + "°W";
            }
            else {
                coordinates.innerHTML += info.coord.lon.toPrecision(4) + "°E";
            }
            area.appendChild(coordinates);
            let temp = document.createElement("p");
            temp.innerHTML = "Teperatur: " + (info.main.temp - 273.15).toPrecision(4) + "° C";
            area.appendChild(temp);
            let feel_temp = document.createElement("p");
            feel_temp.innerHTML = "Känns som: " + (info.main.feels_like - 273.15).toPrecision(4) + "° C";
            area.appendChild(feel_temp);
            let humidity = document.createElement("p");
            humidity.innerHTML = "Luftfuktighet: " + info.main.humidity + "%";
            area.appendChild(humidity);
            let pressure = document.createElement("p");
            pressure.innerHTML = "Tryck: " + info.main.pressure + " hPa";
            area.appendChild(pressure);
            let wind = document.createElement("p");
            wind.innerHTML += "Vind: ";
            wind.innerHTML += info.wind.speed + "m/s ";
            wind.innerHTML += info.wind.deg + "°";
            area.appendChild(wind);
        }
    };
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
function showPosition(position) {
    document.getElementById("weather").innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.openweathermap.org/geo/1.0/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&limit=5&appid=90097385080ce7e78b756f4b298ae50d");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            console.log(position);
            console.log(JSON.parse(xhr.responseText));
            let places = JSON.parse(xhr.responseText);if(window.screen.width > 700) {
                for(var i = 0; i < 5; i++) {
                    getLocalWeather(places[i].name);
                }
            }
            else {
                getLocalWeather(places[0].name);
            }
        }
    }
}
function getLocalWeather(place) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=90097385080ce7e78b756f4b298ae50d");
    xhr.send();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            let info = JSON.parse(xhr.responseText);
            console.log(info);
            let area = document.createElement("div");
            area.classList.add("area");
            let title = document.createElement("h2");
            title.innerHTML = info.name;
            area.appendChild(title);
            let generalweather = document.createElement("p");
            generalweather.innerHTML = info.weather[0].main;
            area.appendChild(generalweather);
            let time = document.createElement("p");
            let now = new Date();
            time.innerHTML = "Tid: ";
            if(now.getHours() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getHours() + ":";
            if(now.getMinutes() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getMinutes() + ":";
            area.appendChild(time);
            if(now.getSeconds() < 10) {
                time.innerHTML += "0";
            }
            time.innerHTML += now.getSeconds();
            let coordinates = document.createElement("p");
            coordinates.innerHTML = "Koordeinater: ";
            if(info.coord.lat < 0) {
                coordinates.innerHTML += (-1) * info.coord.lat.toPrecision(4) + "°S ";
            }
            else {
                coordinates.innerHTML += info.coord.lat.toPrecision(4) + "°N ";
            }
            if(info.coord.lon < 0) {
                coordinates.innerHTML += (-1) * info.coord.lon.toPrecision(4) + "°W";
            }
            else {
                coordinates.innerHTML += info.coord.lon.toPrecision(4) + "°E";
            }
            area.appendChild(coordinates);
            let temp = document.createElement("p");
            temp.innerHTML = "Teperatur: " + (info.main.temp - 273.15).toPrecision(4) + "° C";
            area.appendChild(temp);
            let feel_temp = document.createElement("p");
            feel_temp.innerHTML = "Känns som: " + (info.main.feels_like - 273.15).toPrecision(4) + "° C";
            area.appendChild(feel_temp);
            let humidity = document.createElement("p");
            humidity.innerHTML = "Luftfuktighet: " + info.main.humidity + "%";
            area.appendChild(humidity);
            let pressure = document.createElement("p");
            pressure.innerHTML = "Tryck: " + info.main.pressure + " hPa";
            area.appendChild(pressure);
            let wind = document.createElement("p");
            wind.innerHTML += "Vind: ";
            wind.innerHTML += info.wind.speed + "m/s ";
            wind.innerHTML += info.wind.deg + "°";
            area.appendChild(wind);
            document.getElementById("weather").appendChild(area);
        }
    };
}
