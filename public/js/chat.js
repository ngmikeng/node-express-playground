(function() {
  var formName = document.getElementById('formName');
  var formMessage = document.getElementById('formMessage');
  var inputName = document.getElementById('inputName');
  var inputMessage = document.getElementById('inputMessage');
  var socketClient = null;

  if (formName) {
    formName.addEventListener('submit', function(event) {
      event.preventDefault();
      if (formMessage) {
        formName.setAttribute('style', 'display: none');
        formMessage.setAttribute('style', 'display: block');
        socketClient = connect();
      }
    });
  }

  if (formMessage) {
    formMessage.addEventListener('submit', function(event) {
      event.preventDefault();
      if (socketClient) {
        if (inputMessage) {
          var message = inputMessage.value;
          socketClient.emit('sendMessage', message);
        }
      }
    });
  }

  function connect() {
    const socket = io('http://localhost:3001');

    return socket;
  }
})()