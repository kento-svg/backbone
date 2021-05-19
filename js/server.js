/**
 * localhost:8080/timeline でホストされるシンプルなAPI
 */
var express = require('./external/node_modules/express');
var app = express();
var Twit = require('./external/node_modules/twit');
var bodyParser = require('./external/node_modules/body-parser');
var client = null;

function connectToTwitter() {
    client = new Twit({
        consumer_key: 'E4D6hJUdQQT4sEmyzJoqgPlAg',
        consumer_secret: 'XzwvlTwxVlOF3u9dI3WtUuqEEyTMaBodEDvZxe07Wm8px7a4DL',
        access_token: '2915455687-tC457XVLe7bccgVXXmkufmbMulCg8XaQiqOmINl',
        access_token_secret: 'NpmdlT3UqSmlUYbsTzOiKBa80zNayUYfDmtICPcigNvRQ'
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

    client.get('statuses/home_timeline', {}, function(err,reply) {
        if(err) {
            return response.send(404);
        }
        if(reply) {
            return response.json(reply);
        }
    });
});


/**
 * ユーザーのアカウント設定を取得
 */
app.get('/profile', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');

    client.get('users/show', {screen_name: 'sugrue'}, function(err,reply) {
        if(err) {
            console.log('Error: ' + err);
            response.send(404);
        }
        if(reply) {
            response.json(reply);
        }
    });
});

/**
 * 指定されたIDを持つユーザーアカウント設定を取得
 */
app.get('/profile/:id', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    client.get('users/show', {screen_name: request.params.id},
        function(err, reply) {
            if(err) {
                console.log('Error: ' + err);
                response.send(404);
            }
            if(reply) {
                response.json(reply);
            }
        }
    );
});

/**
 * 指定されたクエリを使って検索を実行
 */
app.get('/search/:query', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');

    // 検索するキーワード
    var searchTerm = request.params.query;

    client.get('search/tweet', {q: searchTerm, count1: 100, function(err, reply) {
        if(err) {
            console.log('Error: ' + err);
            response.send(404);
        }
        if(reply) {
            response.json(reply);
        }
    }});
});


app.use(allowCrossDomain);
app.use(bodyParser());

// ポート8080でAPIを起動
app.listen(8080);