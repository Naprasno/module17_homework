const wsUri = "wss://ws.ifelse.io";

const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
let websocket;

function writeToScreen(message) {
  let pre = document.createElement("div");
  pre.classList = "message";
  pre.innerHTML = message;
  output.appendChild(pre);
}

  websocket = new WebSocket(wsUri);
  websocket.onmessage = function(evt) {
    str=evt.data
    if(str.includes('- ГЕО, выводить в чат не нужно')){
        console.log(`${evt.data} , уже кинули ссылку`)
    }
    else{
        writeToScreen(`<div class=response_message> Сообщение сервера: <br>  ${evt.data} </div>`);
    }; 
    
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };


btnSend.addEventListener('click', () => {
    let message = document.getElementById("select").value;
  message = message.replace(/^\s+|\s+$/g, '')
   
  if(!message){
    alert('Пусто')
  }
  else{
    writeToScreen(`<div class=send_message>Сообщение отправителя: <br>  ${message}</div>`);
    websocket.send(message);
    document.getElementById("select").value=''
  }
});





/*******************гео**************************/ 


// Функция, выводящая текст об ошибке
const error = () => {
    writeToScreen ( `<div class=response_message>Информация о местоположении недоступна</div>`)
  }
  // Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    //console.log('position', position);
    writeToScreen ( `<div class=response_message><a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Ссылка на карту</a></div>`)
    websocket.send(`${latitude}, ${longitude} - ГЕО, выводить в чат не нужно`) /*отправялем серверу гео локацию*/ 
  }
  

btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen (`<div class=response_message>Geolocation не поддерживается вашим браузером</div>`);
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
});