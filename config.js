/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out or empty, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "calendar",
			position: "top_left",
			config: {
				calendars: [
					{
					symbol: "calendar-check",
					url: ""
					}
				]
			}
		},

		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Chicago",
				locationID: "4887398", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: ""
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Chicago",
				locationID: "4887398", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: ""
			}
		},
		{
			module: "newsfeed",
			position: "lower_third",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},

		{
		  module: "MMM-AVStock",
		  position: "bottom_bar", //"bottom_bar" is better for `mode:ticker`
		  config: {
		    apiKey : "", // https://www.alphavantage.co/
		    timeFormat: "YYYY-MM-DD HH:mm:ss",
		    symbols : ["RVLV"],
		    alias: ["RVLV"], //Easy name of each symbol. When you use `alias`, the number of symbols and alias should be the same. If value is null or "", symbol string will be used by default.
		    tickerDuration: 60, // Ticker will be cycled once per this second.
		    chartDays: 90, //For `mode:series`, how much daily data will be taken. (max. 90)
		    poolInterval : 1000*15, // (Changed in ver 1.1.0) - Only For Premium Account
		    mode : "ticker", // "table", "ticker", "series"
		    decimals: 4, // number of decimals for all values including decimals (prices, price changes, change%...)
		    candleSticks : false, //show candle sticks if mode is Series
		    coloredCandles : false, //colored bars: red and green for negative and positive candles
		    premiumAccount: false, // To change poolInterval, set this to true - Only For Premium Account
		  }
		},



{
 module: "MMM-AssistantMk2",
 position: "top_center",
 config: {
	  debug: false,
	  //ui: "Classic",
 	  assistantConfig: {
			    projectId: "", // Required to use gaction.
			    modelId: "", // (OPTIONAL for gaction)
			    instanceId: "", // (OPTIONAL for gaction)
			    latitude: 41.12345678,
			    longitude: -87.12345678,
			   },

	  responseConfig: {
			   useScreenOutput: true,
			   useAudioOutput: true,
			   useChime: true,
			   timer: 500,
			   myMagicWord: false,
			   useHTML5: false
			  },
	  },

 micConfig: {
	     recorder: "arecord",  
	     device: "plughw:1,0",
	    },
 notification: {
		 ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
		 ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
		},

defaultProfile: "default",
		profiles: {
  			   "default": {
    			   profileFile: "default.json",
    			   lang: "en-US"
  				       }
			   },
},


{
	module: "MMM-Hotword",
	//position: "top_center",
	config: {
		debug: false,
		chimeOnFinish: null,
		//recipes: ["with-AMk2v3_smart-mirror.js"],
		detectorApplyFrontend: true,
		mic: {
			recordProgram: "arecord",
			device: "plughw:1,0"
		},
		models: [
      // custom hotword but you could use any bulit-in options
			{
				hotwords    : "hey_google",
				file        : "hey_google.pmdl",
				sensitivity : "0.5",
			},
       // customhotword
			{
				hotwords    : "hello_mirror",
				file        : "hello_mirror.pmdl",
				sensitivity : "0.5",
			},
            
       // custom hotword
			{
				hotwords    : "goodbye_mirror",
				file        : "goodbye_mirror.pmdl",
				sensitivity : "0.5",
			},

    // activate google assistant and pass payload            
		],
		commands: {
			"hey_google": {
				notificationExec: {
					notification: "ASSISTANT_ACTIVATE",
					payload: (detected, afterRecord) => {
						return {profile:"default",
							type: "MIC"}
					}
				},
				restart: true,
				afterRecordLimit:0
			},
            
 // hide all modules NOT MMM-hotword
"goodbye_mirror": {
    moduleExec: {
      module: ["alert", "updatenotification", "clock", "calendar", "currentweather", 
 	  	"weatherforecast", "newsfeed", "MMM-AVStock"],
      exec: (module, hotword, file) => {
        module.hide()
      }
    },
    				restart: true,
				afterRecordLimit:0
  },
            
 // show all modules again     
"hello_mirror": {
    moduleExec: {
      module: [],
      exec: (module, hotword, file) => {
        module.show()
      }
    },
				restart: true,
				afterRecordLimit:0
  }
            
            
            
		}
	}
},


	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
