/**
 * Created by appstacksoultions.com on 11/12/17.
 */
var request = require('request');
var url ='https://34dbbe9d.ngrok.io/ooo';
request({url:url,
            json:true,
            method: 'POST',
            data: {name:'abc'}}
    , function (error, response, body) {
    if (!error) {
        console.log(body);
    }
});