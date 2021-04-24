/**
 * localhost:8080/timeline でホストされるシンプルなAPI
 */
var express = require('express');
var app = express();
var Twit = require('twit');
var bodyParser = require('body-parser');
var client = null;

function connectToTwitter() {
    client = new Twit({
        consumer_key: '',
        consumer_secret: '',
        access_token: '',
        access_token_secret: ''
    });
}

// アプリケーションをTwitterに接続
connectToTwitter();

// CORS リクエストをサポートするためのセットアップ
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    if('OPTIONS' == req.method) {
        response.send(200);
    } else {
        next();
    }
};

app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * カレントユーザーのTwitter タイムラインを取得
 */
app.get('/timeline', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');

    client.get('statuses/home.timeline', {}, function(err,reply) {
        if(err) {
            response.send(404);
        }
        if(reply) {
            response.json(reply);
        }
    });
});

// ポート8080でAPIを起動
app.listen(8080);