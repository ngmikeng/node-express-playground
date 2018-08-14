(function() {
  var formName = document.getElementById('formName');
  var formMessage = document.getElementById('formMessage');
  var inputName = document.getElementById('inputName');
  var inputMessage = document.getElementById('inputMessage');
  var listMessages = document.getElementById('listMessages');
  var socketClient = null;
  var emoji = new EmojiConvertor();
  emoji.init_env();
  emoji.replace_mode = 'unified';
  emoji.allow_native = true;

  if (formName) {
    formName.addEventListener('submit', function(event) {
      event.preventDefault();
      if (formMessage) {
        formName.setAttribute('style', 'display: none');
        formMessage.setAttribute('style', 'display: block');
        socketClient = connect();
        if (socketClient) {
          if (inputName) {
            socketClient.emit('userInfo', {
              name: inputName.value
            });
          }

          socketClient.on('receiveMessage', function(data) {
            if (data && data.name && data.message) {
              createMessageNode(data.name, data.message, formatTime(data.time));
            }
          });
        }
      }
    });
  }

  if (formMessage) {
    formMessage.addEventListener('submit', function(event) {
      event.preventDefault();
      if (socketClient) {
        if (inputMessage && inputName) {
          var name = inputName.value;
          var message = inputMessage.value;
          createMessageNode(name, message, formatTime(), true);
          inputMessage.value = '';
          socketClient.emit('sendMessage', message);
        }
      }
    });
  }

  function connect() {
    const socket = io('http://localhost:3001');

    return socket;
  }

  function handleMessage(socket) {
    if (socket) {
      socket.on('')
    }
  }

  function createMessageNode(name, message, time, color) {
    var liNode = document.createElement('li');
    liNode.classList.add('chat-messageItem');
    var nameNode = document.createElement('span');
    nameNode.classList.add('chat-messageUserName');
    nameNode.appendChild(document.createTextNode(name));
    var timeNode = document.createElement('small');
    timeNode.classList.add('chat-messageTime');
    timeNode.appendChild(document.createTextNode(time));
    var messageNode = document.createElement('p');
    messageNode.classList.add('chat-messageContent');
    if (color) {
      messageNode.classList.add('bg-info', 'text-light');
    }
    var messageData = emoji.replace_colons(message);
    messageNode.appendChild(document.createTextNode(messageData));
    liNode.appendChild(nameNode);
    liNode.appendChild(timeNode);
    liNode.appendChild(messageNode);
    if (listMessages) {
      listMessages.appendChild(liNode);
    }
  }

  function formatTime(time) {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    if (time) {
      hours = new Date(time).getHours();
      minutes = new Date(time).getMinutes();
      seconds = new Date(time).getSeconds();
    }

    return hours + ':' + minutes + ':' + seconds;
  }
})()