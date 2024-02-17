const fetch = require("node-fetch");
var NodeHelper = require("node_helper");
var cheerio = require("cheerio");

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

			fetch(url)
				.then(response => response.text())
				.then(body => {
					console.log("body=" + body)
					var $ = cheerio.load(body);
					console.log("$=" + $)
					//var src = $(".img-comic").attr('src');
					//console.log('Simpsons Quote img -> ' + src);
					self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
				})
				.catch((error) => {
					console.log('Simpsons Quote Fetch Error -> ' + error);
				});
			return;
			// request(url, function (error, response, body) {
			// 	console.log('SimpsonsQuote -> ' + body);
			// 	self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
			// });
			return;
		}
	},
});
