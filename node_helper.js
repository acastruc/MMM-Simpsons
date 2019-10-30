var request = require('request');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	
	start: function() {
		console.log("Starting node helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log("SimpsonsQuote -> Notification: " + notification + " Payload: " + payload);
		
		if(notification === "GET_SIMPSONSQUOTE") {
			
			var url = "https://thesimpsonsquoteapi.glitch.me/quotes";
			
			console.log('-> SimpsonsQuote request');
			request(url, function (error, response, body) {
				console.log('SimpsonsQuote -> ' + body);
				self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
			});
			return;
		}
	},
});