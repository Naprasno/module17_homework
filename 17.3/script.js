const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.j-result');

let userWidth= window.screen.width
let userHeight= window.screen.height
let userGeo = ''

// Функция, выводящая текст об ошибке
const error = () => {
  userGeo = 'Информация о местоположении недоступна';
  resultNode.innerHTML = `ширина экрана: ${userWidth} <br> высота экрана: ${userHeight} <br> ${userGeo}`;
}
// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  //console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  userGeo = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  resultNode.innerHTML = `ширина экрана: ${userWidth} <br> высота экрана: ${userHeight} <br> ${userGeo}`;
}


btn.addEventListener('click', () => {

  if (!navigator.geolocation) {
    userGeo = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
   
});