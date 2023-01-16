document.querySelector('.busca').addEventListener('submit', async (event)=>{
  event.preventDefault();
  let input = document.querySelector('#searchInput').value;

  if(input!== '') {
    clearInfo();
    showWarning('Buscando localidade...');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=545502318fc230c40bad1882a724c10f&units=metric&lang=pt_br`;
    let response = await fetch(url);
    let json = await response.json();
    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windDeg: json.wind.deg,
        iconDesc: json.weather[0].description,
        umidadeInfo: json.main.humidity,
      })
    } else {
      clearInfo();
      showWarning('Localidade não encontrada!');
    }
  } else {
    clearInfo();
  }
});

function clearInfo() {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none';
}
function showInfo(json) {
  showWarning('');
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country} <img src="https://openweathermap.org/images/flags/${json.country.toLowerCase()}.png">`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.iconDesc').innerHTML = `${json.iconDesc}`;
  document.querySelector('.umidadeInfo').innerHTML = `${json.umidadeInfo}<sup>%</sup>`;
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;
  document.querySelector('.resultado').style.display = 'block';
}
function showWarning (msg) {
  document.querySelector('.aviso').innerHTML = msg;
}