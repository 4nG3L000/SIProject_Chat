window.addEventListener("DOMContentLoaded", () => {
  let socket = io()
  let new_message = document.getElementById('message')
  let chat_panel = document.querySelector('.chat-panel')
  let login = document.querySelector('.login')
  let username = document.querySelector('#username')
  let content = document.querySelector('.content')
  let h6 = document.querySelector('#user')
  let active_user

  document.querySelector('#ingresar').onclick = function (event) {
      if(username.value){
        active_user = username.value
        h6.innerHTML = username.value
        login.style.display = 'none'
        content.style.display = 'block'
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
    if (res.username == active_user) {
      chat_panel.innerHTML += `
                            <div class="row g-0">
                              <div class="col-12">
                                <div class="chat-bubble chat-bubble--right text-end">
                                  <span class="message-autor-right">${res.username}</span>
                                  ${res.message}
                                </div>
                              </div>
                            </div>
                          `
    } else {
      chat_panel.innerHTML += `
                              <div class="row g-0">
                                <div class="col-12">
                                  <div class="chat-bubble chat-bubble--left text-start">
                                  <span class="message-autor-left">${res.username}</span>
                                  ${res.message}
                                  </div>
                                </div>
                              </div>
                            `
    }

  })
})

