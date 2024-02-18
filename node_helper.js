var NodeHelper = require("node_helper");
const Log = require("logger");

module.exports = NodeHelper.create({
	
	start: function() {
		Log.Info("Starting node helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		Log.Info("SimpsonsQuote -> Notification: " + notification + " Payload: " + payload);
		
		if(notification === "GET_SIMPSONSQUOTE") {
			
			var url = "https://thesimpsonsquoteapi.glitch.me/quotes";
			
			Log.Info('-> SimpsonsQuote request');
			fetch(uri).then((response) => response.json())
  				  .then(data => {
      					Log.Info("Simpsons Quote : " + data)
					//var src = $(".img-comic").attr('src');
					//console.log('Simpsons Quote img -> ' + src);
					//self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
				  })
				  .catch((error) => {
					Log.Error('Simpsons Quote Fetch Error -> ' + error);
				  });
			//fetch(url)
			//	.then(response => response.text())
			//	.then(body => {
			//		console.log("body=" + body)
			//		var $ = cheerio.load(body);
			//		console.log("$=" + $)
			//		//var src = $(".img-comic").attr('src');
			//		//console.log('Simpsons Quote img -> ' + src);
			//		self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
			//	})
			//	.catch((error) => {
			//		console.log('Simpsons Quote Fetch Error -> ' + error);
			//	});
			//return;
			// request(url, function (error, response, body) {
			// 	console.log('SimpsonsQuote -> ' + body);
			// 	self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
			// });
			return;
		}
	},
});
