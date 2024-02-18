var NodeHelper = require("node_helper");
const Log = require("logger");

module.exports = NodeHelper.create({
	
	start: function() {
		Log.info("Starting node helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		Log.info("SimpsonsQuote -> Notification: " + notification + " Payload: " + JSON.stringify(payload));
		
		if(notification === "GET_SIMPSONSQUOTE") {
			
			var url = "https://thesimpsonsquoteapi.glitch.me/quotes";
			
			Log.info('-> SimpsonsQuote requested');
			fetch(url).then((response) => response.json())
                		  .then(respdata => {
				       if (Array.isArray(respdata) && respdata.length > 0){
                            		   Log.info("The quote is " + JSON.stringify(respdata[0]));
					   self.sendSocketNotification("SIMPSONSQUOTE", { data : respdata });
				       } else {
                            		   Log.error("Unexpected data was returned");
                        	       }                        	       
				  })
				  .catch((error) => {
					console.error('Simpsons Quote Fetch Error -> ' + error);
				  });			
			
			
			// request(url, function (error, response, body) {
			// 	console.log('SimpsonsQuote -> ' + body);
			// 	self.sendSocketNotification("SIMPSONSQUOTE", { data : body });
			// });
			return;
		}
	},
});
