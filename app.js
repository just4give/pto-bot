/**
 * Created by appstacksoultions.com on 11/10/17.
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT||1400;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.status(200).send('Bot is running!');
})

app.listen(port, function(){
    console.log('listening on port '+port);
})


app.post('/ooo',function(req,res,next){
    var username = req.body.user_name;
    var botPayload = {
        text:'Hello '+ username+ ', welcome to PTO Bot!'
    };

    if(username!='slackbot'){
        return res.status(200).json(botPayload);
    }else{
        return res.status(200).end();
    }

})