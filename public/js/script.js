window.addEventListener("DOMContentLoaded", () => {
  let socket = io()
  let new_message = document.getElementById('message')
  let chat_panel = document.querySelector('.chat-panel')
  let login = document.querySelector('.login')
  let username = document.querySelector('#username')
  let content = document.querySelector('.content')
  let h6 = document.querySelector('#user')
  let panel_left = document.querySelector('.panel-left')
  let friends = document.querySelector('.friends')

  let active_user

  document.querySelector('.open-users').onclick = function (event) {
    panel_left.classList.toggle('panel-mobile');
  }

  document.querySelector('#ingresar').onclick = function (event) {
      socket.emit('new:user_conn', username.value, (res)=>{
        if(res){
          active_user = username.value
          h6.innerHTML = username.value
          login.style.display = 'none'
          content.style.display = 'block'
        }else{
          document.querySelector('.username-error').style.display = 'unset'
        }
      });
  }
  
  document.querySelector('#message').onkeydown = function (event) {
    var codigo = event.which || event.keyCode;
  
    if(codigo === 13){
      if (new_message.value) {
        data = {
          message: new_message.value,
          username: active_user
        }
        socket.emit('chat:message', data);
        new_message.value = '';
      }
    } 
  }

  document.querySelector('#send').onclick = function (event) {
    if (new_message.value) {
      data = {
        message: new_message.value,
        username: active_user
      }
      socket.emit('chat:message', data);
      new_message.value = '';
    }
  }

  socket.on('res:message', (res)=>{
    if (res[0].user == active_user) {
      chat_panel.innerHTML += `
                            <div class="row g-0">
                              <div class="col-12">
                                <div class="chat-bubble chat-bubble--right text-end">
                                  <span class="message-autor-right">${res[0].user}</span>
                                  <span>${res[0].msg}</span>
                                  <span class="message-hour-right">${res[0].hour}</span>
                                </div>
                              </div>
                            </div>
                          `
    } else {
      chat_panel.innerHTML += `
                              <div class="row g-0">
                                <div class="col-12">
                                  <div class="chat-bubble chat-bubble--left text-start">
                                  <span class="message-autor-left">${res[0].user}</span>
                                  <span>${res[0].msg}</span>
                                  <span class="message-hour-left">${res[0].hour}</span>
                                  </div>
                                </div>
                              </div>
                            `
    }
    chat_panel.scrollTo(9999, chat_panel.scrollHeight);
  })

  socket.on('users:list', (res)=>{
    let list = ''
    for (i in res){
      if (res[i] != active_user) {
        list += `<div class="friend-drawer friend-drawer--onhover">
                  <img class="profile-image" src="assets/images/avatar.jpg" alt="">
                  <div class="text">
                    <h6>${res[i]}</h6>
                    <p class="text-m">Disponible</p>
                  </div>
                    <span class="text-m small"></span>
                  </div>
                <hr>`
      }
    }

    friends.innerHTML = list
  })

  socket.on('old:messages', (data)=>{
    for(i in data){
      if (data[i].user == active_user) {
        chat_panel.innerHTML += `
                              <div class="row g-0">
                                <div class="col-12">
                                  <div class="chat-bubble chat-bubble--right text-end">
                                    <span class="message-autor-right">${data[i].user}</span>
                                    <span>${data[i].msg}</span>
                                    <span class="message-hour-right">${data[i].hour}</span>
                                  </div>
                                </div>
                              </div>
                            `
      } else {
        chat_panel.innerHTML += `
                                <div class="row g-0">
                                  <div class="col-12">
                                    <div class="chat-bubble chat-bubble--left text-start">
                                    <span class="message-autor-left">${data[i].user}</span>
                                    <span>${data[i].msg}</span>
                                    <span class="message-hour-left">${data[i].hour}</span>
                                    </div>
                                  </div>
                                </div>
                              `
      }
    }
    chat_panel.scrollTo(9999, chat_panel.scrollHeight);
  })
})