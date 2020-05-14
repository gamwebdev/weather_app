const express = require('express');
const request = require('request-promise');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send("Hi");
});

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "blondiebytes") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

let token = "EAAIIIUtJFa8BAOis8LGTwkZCMhALm7BPtWvN1ZCCyBVTgQPoEMolU68GyKaSwgwLvDQVwVxtKY908rRY9UcDKFqlXc6SKmDhKkZCx9fSRQZAdn5bZAB7YqvZC7fzOnhlbjtJZCt7kqYrv2czjZCkYeNAJPZAlYHWdICWSYeRm20hy6zIZCmqpsNSDX"

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	let event = messaging_events[0]
	let sender = event.sender.id
	if (event.message && event.message.text) {
		let text = event.message.text
		sendText(sender, "Text echo: " + text.substring(0, 100))
	}

	res.sendStatus(200)
})


function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v7.0/me/messages?access_token=EAAIIIUtJFa8BAOis8LGTwkZCMhALm7BPtWvN1ZCCyBVTgQPoEMolU68GyKaSwgwLvDQVwVxtKY908rRY9UcDKFqlXc6SKmDhKkZCx9fSRQZAdn5bZAB7YqvZC7fzOnhlbjtJZCt7kqYrv2czjZCkYeNAJPZAlYHWdICWSYeRm20hy6zIZCmqpsNSDX",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}



app.listen(process.env.PORT || 8000, function(){
	console.log("Server Running");
});


/*app.get('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	let event = messaging_events[i]
	let sender = event.sender.id
	let text = "Enter Your name:";
	sendTextAtBeg(sender, text);
	res.sendStatus(200);
})*/

/*function sendTextAtBeg(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v7.0/me/messages?access_token=EAAIIIUtJFa8BAOis8LGTwkZCMhALm7BPtWvN1ZCCyBVTgQPoEMolU68GyKaSwgwLvDQVwVxtKY908rRY9UcDKFqlXc6SKmDhKkZCx9fSRQZAdn5bZAB7YqvZC7fzOnhlbjtJZCt7kqYrv2czjZCkYeNAJPZAlYHWdICWSYeRm20hy6zIZCmqpsNSDX",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}*/


//EAAIIIUtJFa8BAMbY45UB4ZB8cQBGAC9AUI7YIIwsP0yhJwuMx0Shu9mTm3Fy2rC9z0CD4RrYmDZBKAbEXrB2NIlrJGzqFx9mONHLpxUyF3jj1UmI9KXuTaObwCGPdifaOuZCFA7ZAhFVTB3TGaadmUAQhKJJtmspvMuPcus4Fp0Yh1ACwFCH"

/*curl -X POST -H "Content-Type: application/json" -d '{
  "recipient": {
    "id": "100012039937613"
  },
  "message": {
    "text": "hello, world!"
  }
}' "https://graph.facebook.com/v7.0/me/messages?access_token=EAAIIIUtJFa8BAOis8LGTwkZCMhALm7BPtWvN1ZCCyBVTgQPoEMolU68GyKaSwgwLvDQVwVxtKY908rRY9UcDKFqlXc6SKmDhKkZCx9fSRQZAdn5bZAB7YqvZC7fzOnhlbjtJZCt7kqYrv2czjZCkYeNAJPZAlYHWdICWSYeRm20hy6zIZCmqpsNSDX"*/
/*curl -X GET -H "Content-Type: application/json" -d '{
  "recipient": {
    "id": "100012039937613"
  }
}' "https://graph.facebook.com/v7.0/me/messages?access_token=EAAIIIUtJFa8BAOis8LGTwkZCMhALm7BPtWvN1ZCCyBVTgQPoEMolU68GyKaSwgwLvDQVwVxtKY908rRY9UcDKFqlXc6SKmDhKkZCx9fSRQZAdn5bZAB7YqvZC7fzOnhlbjtJZCt7kqYrv2czjZCkYeNAJPZAlYHWdICWSYeRm20hy6zIZCmqpsNSDX"*/