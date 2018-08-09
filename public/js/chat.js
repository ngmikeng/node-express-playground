(function() {
  var formName = document.getElementById('formName');
  var formMessage = document.getElementById('formMessage');
  var inputName = document.getElementById('inputName');
  var inputMessage = document.getElementById('inputMessage');
  var listMessages = document.getElementById('listMessages');
  var socketClient = null;

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
            console.log(data);
            if (data && data.name && data.message) {
              createMessageNode(data.name, data.message);
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
        if (inputMessage) {
          var message = inputMessage.value;
          createMessageNode('YOU', message);
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
    messageNode.appendChild(document.createTextNode(message));
    liNode.appendChild(nameNode);
    liNode.appendChild(timeNode);
    liNode.appendChild(messageNode);
    if (listMessages) {
      listMessages.appendChild(liNode);
    }
  }
})()