var app = new Vue({
  el: '#app',
  data: {
    username: "",
    password: "",
    error: ""
  },
  methods: {
    submit: submit
  }
})

function submit () {

  var request = new XMLHttpRequest();
  request.open('GET', '/my/', true);
  
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)
    } else {
  
    }
  }
  
  request.onerror = function() {

  }

  // Create the request string.
  var data = this.username + this.password
  // Send the request.
  request.send(data);
}