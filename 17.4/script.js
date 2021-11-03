const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.j-result');

// Функция, выводящая текст об ошибке
const error = () => {
  resultNode.innerHTML = `Информация о местоположении недоступна`;
}
// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  //console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
  .then((response) => {
    const result = response.json();
    return result;
  })
  .then((data) => {
  let allData = data
    //console.log(allData)
    resultNode.innerHTML = `Широта: ${latitude} °, Долгота: ${longitude} ° <br> 
    Временная зона, в которой находится пользователь: ${allData.timezone} <br>
    Местные дата и время: ${allData.date_time_txt}`;
     
  })
}


btn.addEventListener('click', () => {

  if (!navigator.geolocation) {
    resultNode.innerHTML = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
   
});



