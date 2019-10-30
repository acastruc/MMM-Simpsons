Module.register("MMM-Simpsons", {

    // Default module config.
    defaults: {
        updateInterval : 10000 * 60 * 60, // 10 hours
    },

    start: function() {
        Log.info(this.config);
        Log.info("Starting module: " + this.name);

        this.dailyComic = "";
        this.getComic();
        
        self = this;
        if(self.config.updateInterval < 60000) {
			self.config.updateInterval = 60000;
		}			
		
        setInterval(function() {
            self.getComic();
        }, self.config.updateInterval);
    },

    // Define required scripts.
    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return ["simpsons.css"];
    },

    getComic: function() {
        Log.info("SimpsonsQuote: Getting comic.");
        this.sendSocketNotification("GET_SIMPSONSQUOTE", {
            config: this.config
        });
    },

    socketNotificationReceived: function(notification, body) {
        if (notification === "SIMPSONSQUOTE") {
            Log.info('Simpsons body.data= ' + body.data);
            let quotes = JSON.parse(body.data);
            if (quotes && quotes.length > 0) {
                this.dailyComic = quotes[0];
                //let i = quotes[0].image;
                //let q = quotes[0].quote;
                //let who = quotes[0].character;
                this.updateDom(1000);
            } else {
                console.error('Failed to parse Simpsons quote payload: ', JSON.stringify(body));
            }
        }
    },

    notificationReceived: function(notification, payload, sender) {
    },

    // Override dom generator.
    getDom: function() {
        let imgsrc = this.dailyComic.image;
        let q = this.dailyComic.quote;
        let who = this.dailyComic.character;

        var wrapper = document.createElement("div");

        var comicWrapper = document.createElement("div");
        comicWrapper.className = "simpsons-container";
    
        var img = document.createElement("img");
        img.id = "simpsons-content";
        img.src = imgsrc;
		img.classList.add('simpsons-image');
		comicWrapper.appendChild(img);

		var para = document.createElement('p');
        para.classList.add('simpsons-quote-text');
        var quoteText = document.createTextNode('"' + q + '" - ' + who);
        para.appendChild(quoteText);
        comicWrapper.appendChild(para);

        wrapper.appendChild(comicWrapper);
        return wrapper;
    }
});