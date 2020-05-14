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

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
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

// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAIIIUtJFa8BACkmuWFZBrrcP6xm7jqE29r57ZCOH6PSMi1O3zfEwiuF6UGvVJ9iju5EZBYgzoatLY8aYdGT7JiotylTJZCwPmYc0bU3K7DfaViLOZCuRJJj5ZBJspQzgVn28qRaJKlAEDRDlHTuTS1El4DwOFKG55rQaZCRRFepV7hXc2w0X8p"
// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAIIIUtJFa8BACkmuWFZBrrcP6xm7jqE29r57ZCOH6PSMi1O3zfEwiuF6UGvVJ9iju5EZBYgzoatLY8aYdGT7JiotylTJZCwPmYc0bU3K7DfaViLOZCuRJJj5ZBJspQzgVn28qRaJKlAEDRDlHTuTS1El4DwOFKG55rQaZCRRFepV7hXc2w0X8p"
//EAAIIIUtJFa8BACkmuWFZBrrcP6xm7jqE29r57ZCOH6PSMi1O3zfEwiuF6UGvVJ9iju5EZBYgzoatLY8aYdGT7JiotylTJZCwPmYc0bU3K7DfaViLOZCuRJJj5ZBJspQzgVn28qRaJKlAEDRDlHTuTS1El4DwOFKG55rQaZCRRFepV7hXc2w0X8p"
//curl -X POST "https://graph.facebook.com/v3.3/me/subscribed_apps?subscribed_fields=publisher_subscriptions&access_token=EAAIIIUtJFa8BACkmuWFZBrrcP6xm7jqE29r57ZCOH6PSMi1O3zfEwiuF6UGvVJ9iju5EZBYgzoatLY8aYdGT7JiotylTJZCwPmYc0bU3K7DfaViLOZCuRJJj5ZBJspQzgVn28qRaJKlAEDRDlHTuTS1El4DwOFKG55rQaZCRRFepV7hXc2w0X8p"
//curl -X POST "https://graph.facebook.com/v3.3/me/subscribed_apps?subscribed_fields=publisher_subscriptions&access_token=EAAIIIUtJFa8BAE3BHiVgUjQJNZBy1VYRTM9aQNcOTvZAWgZCXHJ1BUsDbgjzCg5GQQ2sHsmjMRPBn34PZAq1Edt3jAQZC0jR4RWr5HJPzqi25K2zEOZAPX9chMLoyoPgbEm7lZAsnomKvsikYNn8nRZBjMOGfhRohShpmpZBQbNj8mjZBroRU88Yz6"
