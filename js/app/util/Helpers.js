$(function() {
    Handlebars.registerHelper('format', function(str) {
        if(str) {
            // @部分をハイライト表示
            str = str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                var username = u.replace('@','');
                return u.link("http://twitter.com/" + username);
            });
                return new Handlebars.SafeString(str);
        } else {
            return str;
        }
    });
});