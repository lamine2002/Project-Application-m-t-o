import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const apiWetherKey = '8456f8496dd543ca94d144502231511';
const apiWetherUrl = 'https://api.weatherapi.com/v1/forecast.json?key=';
const apiWetherQuery = '&q=';
const apiWetherDays = '&days=';
const apiWetherLang = '&lang=';
const apiWetherUnit = '&units=';
const apiWetherAstronomy = '&aqi=yes';
const apiWetherForecast = '&forecast_days=';  // Ajout de cette ligne
const apiWetherAlerts = '&alerts=yes';

const apiWether = {
    key: apiWetherKey,
    url: apiWetherUrl,
    query: apiWetherQuery,
    days: apiWetherDays,
    lang: apiWetherLang,
    unit: apiWetherUnit,
    astronomy: apiWetherAstronomy,
    forecast: apiWetherForecast,  // Ajout de cette ligne
    alerts: apiWetherAlerts
}

const temp_c = document.querySelector('.temp_c');
const humidity = document.querySelector('.humidity');
const wind_kph = document.querySelector('.wind_kph');
const pressure_mb = document.querySelector('.pressure_mb');
const feelslike_c = document.querySelector('.feelslike_c');
const region = document.querySelector('.region');
const weatherState = document.querySelector('.weatherState');
const bottomContent = document.querySelector('.bottomContent');
const icon = document.querySelector('.icon');
const errorMessage = document.querySelector('.errorMessage');

// getTemp avec async/await
const getTemp = async (city) => {
   try {
       bottomContent.innerHTML = '';
       const weather = await fetch(`${apiWether.url}${apiWether.key}${apiWether.query}${city}${apiWether.days}4${apiWether.lang}fr${apiWether.unit}metric${apiWether.astronomy}${apiWether.forecast}3${apiWether.alerts}`);
       const showTemp = await weather.json();
       console.log(showTemp);
       region.textContent = showTemp.location.region + ', ' + showTemp.location.country;
       temp_c.textContent = showTemp.current.temp_c + ' °C';
       humidity.textContent = showTemp.current.humidity;
       wind_kph.textContent = showTemp.current.wind_kph;
       pressure_mb.textContent = showTemp.current.pressure_mb;
       feelslike_c.textContent = showTemp.current.feelslike_c;
       weatherState.textContent = showTemp.current.condition.text;

       icon.src = showTemp.current.condition.icon;
       console.log(showTemp);
       // Les données pour les 4 prochains jours sont dans showTemp.forecast.forecastday
       const forecastDays = showTemp.forecast.forecastday;

       // Vous pouvez itérer sur les jours et afficher les températures
       forecastDays.forEach(day => {
           console.log(day.date, day.day.avgtemp_c);
           const dayElement = document.createElement('div');
           dayElement.classList.add('day');
           const dateElement = document.createElement('div');
           dateElement.classList.add('date');
           // avoir le jour de la date en français
           const date = new Date(day.date);
           const options = { weekday: 'long'};
           const jour = new Intl.DateTimeFormat('fr-FR', options).format(date);
           dateElement.textContent = jour.toUpperCase();
           const tempElement = document.createElement('div');
           tempElement.classList.add('temp');
           tempElement.textContent = day.day.avgtemp_c + ' °C';
           dayElement.appendChild(dateElement);
           dayElement.appendChild(tempElement);
           bottomContent.appendChild(dayElement);
           const iconElement = document.createElement('img');
           iconElement.classList.add('iconTemp');
           iconElement.src = day.day.condition.icon;
           dayElement.appendChild(iconElement);

       });
   }catch (error) {
       errorMessage.textContent = 'Ville non trouvée';
       getTemp('Dakar');
       console.log(error);
   }
}

getTemp('Dakar');

const search = document.querySelector('.input');

search.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getTemp(search.value);
        search.value = '';
        errorMessage.textContent = '';
    }
}

