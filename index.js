var express = require('express')
var bodyParser = require('body-parser');
var uuid = require('uuid');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/webhook1/', function (req, res) {
	console.log("request");
	response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
  }));
})

app.post('/webhook/', function (req, res) {
	console.log("request");
	var result = '';
	if(req.body && req.body.result){
	   result = req.body.result;
	  // if(result.actionIncomplete == "false"){
	   var mortstart = result.parameters["mort-start"];
	   var morttype = result.parameters["mort-type"];
		if(mortstart != '' && morttype == ''){
			 res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
			  res.send(JSON.stringify({ "speech": response, "displayText": response
			,"messages":[{
			"type": 0,
			"speech": "my first response"
			},
			{
			"type": 0,
			"speech": "my second response"
			}]

			  }));
		}
		else{
	   var buyer = result.parameters["mort-buyer"];
	   var apply = result.parameters["mort-apply"];
	   var deposit = result.parameters["mort-depo"];
	   var earn = result.parameters["mort-earn"];
	   var cc = result.parameters["mort-CC"];
	   var repay = result.parameters["mort-repay"];
	   var rate = result.parameters["mort-rate"];
	   var name = result.parameters["mort-name"];
	   var num = uuid.v4(); 
	   result =  "Reference No:" ;
	   result +=  num.substr(0, 7)
	   result += "                    ";
	   result += "======Details=====";
	   result += " Type:" + morttype + " | Buyer:" + buyer + "| deposit: $" + deposit + " | Earn: $" + earn;
	   result += " Credit Card balances: $" + cc + " | Monthly repayments: $" + repay;
	   result += " Rate: " + rate + " | Name:" + name ;
	   result += "-----THANK YOU----";
	   response = result
	   res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
	  res.send(JSON.stringify({ "speech": response, "displayText": response 

	  }));
	   }
	}
	else{
		response = "This is a sample response from your webhook! "
		 res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
		  res.send(JSON.stringify({ "speech": response, "displayText": response 

		  }));
	}
	 //Default response from the webhook to show it's working

 
	res.sendStatus(200);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

/*var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var uuid = require('uuid');

app.set('port', (process.env.PORT || 5000))

//verify request came from facebook

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))


app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	console.log("request");
	response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  ,"messages":[{
"type": 0,
"speech": "my first response"
},
{
"type": 0,
"speech": "my second response"
}]
  }));
})

app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})*/
