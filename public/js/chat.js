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

  function createMessageNode(name, message) {
    var liNode = document.createElement('li');
    var nameNode = document.createElement('span');
    nameNode.appendChild(document.createTextNode(name));
    var messageNode = document.createElement('p');
    messageNode.appendChild(document.createTextNode(message));
    liNode.appendChild(nameNode);
    liNode.appendChild(messageNode);
    if (listMessages) {
      listMessages.appendChild(liNode);
    }
  }
})()