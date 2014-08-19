// FIXME: Do something if connection to websockets is impossible
// FIXME: readyState3
function Client(endpoint) {
  this.endpoint = endpoint;
  this.socket = null;
}

Client.prototype.connect = function() {
  if (!window.WebSocket) {
    $("#error").show();
    return false
  }
  this.socket = new WebSocket(this.endpoint);
  this.bindEvents();
  return true
}

Client.prototype.bindEvents = function() {
  this.socket.onmessage = function(event) {
    $("#waiting").hide();
    $("#error").hide();
    if (!event.data.length) return;
    
    response = JSON.parse(event.data);
    if (response.stream === 'error') {
      $("#error").show();
      return;
    }
    if (response.stream === 'status') {
      response.chunk = "\n[Program exited with status: " + response.chunk + "]";
      $("body").animate({scrollTop:$(document).height()}, 1000);
    }
    $("#console").append($('<span class="'+ response.stream +'">').text(response.chunk));
  };
  var that = this;
  this.socket.onclose = function() {
    that.socket = null;
  };
}

// FIXME: stop connection attempt if 10 fails
Client.prototype.send = function(data) {
  $("#waiting").show();
  if (this.socket === null) {
    var ok = this.connect();
  if (!ok) return;
  }
  var that = this;
  setTimeout(function(){
    if (that.socket !== null && that.socket.readyState === 1) {
      that.socket.send(data);
      return;
    } else {
      that.send(data);
    }
  }, 1);
};
