/**
 * Created by appstacksoultions.com on 11/10/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var port = process.env.PORT||1400;

var Slack = require('slack-node');
apiToken = "";
webhookUri = "";

slack = new Slack(apiToken);
slack.setWebhook(webhookUri);


app.use(bodyParser.urlencoded({extended:true}));
//https://ivbsqo6n15.execute-api.us-east-1.amazonaws.com/dev/event-handler

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.status(200).send('Bot is running!');
})

app.listen(port, function(){
    console.log('listening on port '+port);
})

app.post('/game',function(req,res,next){
    var username = req.body.user_name;
    var payload = JSON.parse(req.body['payload']);
    console.log('Game selection response',payload);

    /*var botPayload ={
        "text":"Hey <@U5HKU75R7>, did you see my file?"
    }
    if(username!='slackbot'){
        return res.status(200).json(botPayload);
    }else{
        return res.status(200).end();
    }*/
    //text:'<@'+payload['user']['id']+'> your message has updated',

    /*var message = {
        text:'your message has updated',
        channel:payload['channel']['id'],
        token: apiToken,
        ts: payload['message_ts']
    };
    console.log('chat.update', message);

    slack.api('chat.update', message, function(err, response){

        if(!err){
            console.log('successful event', response);
        }else{
            console.log('error in api');
            console.log(err);
        }


    });*/

    var response_url = payload.response_url;

    var data = {
        "replace_original": true,
        "text": "Sorry, that didn't work. Please try again."
    }

    var options = {
        url: response_url,
        method: 'POST',
        body:JSON.stringify(data)
    }

    request(options,function(err, response, body) {
       console.log('message posted', err,body);
    });

    return res.status(200).end();
})

app.post('/vacation',function(req,res,next){
    var username = req.body.user_name;
    //console.log('User ID:'+username);
    //console.log(req.body.event);

    if(req.body.challenge){
        return res.status(200).json({"challenge":req.body.challenge});
    }else{

        if(req.body.event['bot_id']){
            console.log('*** This is from bot');

        }else{
            console.log('text received=',req.body.event['text']);
            slack.api('chat.postMessage', {
                text:reverseString(req.body.event['text']),
                channel:req.body.event['channel'],
                token: apiToken
            }, function(err, response){

                if(!err){
                    console.log('successful event', response);
                }else{
                    console.log('error in api');
                    console.log(err);
                }


            });
        }



        return res.status(200).end();

    }


    /*var botPayload ={
        "text":"Hey <@U5HKU75R7>, did you see my file?"
    }
    if(username!='slackbot'){
        return res.status(200).json(botPayload);
    }else{
        return res.status(200).end();
    }*/



})
app.post('/ooo',function(req,res,next){
    var username = req.body.user_name;
    //console.log(req.body);
    /*var botPayload = {
        text:'Hello '+ username+ ', ready for vacation ?!'
    };*/

    var botPayload ={
        "text": "Would you like to play a game?",
        "attachments": [
            {
                "text": "Choose a game to play",
                "fallback": "You are unable to choose a game",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "game",
                        "text": "Chess",
                        "type": "button",
                        "value": "chess"
                    },
                    {
                        "name": "game",
                        "text": "Falken's Maze",
                        "type": "button",
                        "value": "maze"
                    },
                    {
                        "name": "game",
                        "text": "Thermonuclear War",
                        "style": "danger",
                        "type": "button",
                        "value": "war",
                        "confirm": {
                            "title": "Are you sure?",
                            "text": "Wouldn't you prefer a good game of chess?",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    }

    slack.webhook({
       // channel: "D8023UL3Z",//"#general",
       // username: "webhookbot",
        text: "This is posted to #general and comes from a bot named webhookbot at "+new Date()
    }, function(err, response) {
        console.log(response);
    });


    if(username!='slackbot'){
        return res.status(200).json(botPayload);
    }else{
        return res.status(200).end();
    }

})

function reverseString(str) {
    if(str){
        return str.split("").reverse().join("");
    }else{
        return "";
    }

}