var comics = require("./config.js")
var fs     = require("fs")
var feed   = require("feed-read")
var xray   = require('x-ray')()

comics.get("/", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.send(fs.readFileSync("./public/index.html"))
})

comics.get("/:comic", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.send(fs.readFileSync("./public/index.html"))
})



comics.get("/api/v1/willtirando", function(req, res) {
    feed("http://www.willtirando.com.br/rss/", function(error, articles) {
        if (error) throw error;
        xray(articles[0].content, {
            comic: 'img@src'
        })(function(error, data) {
            data.author = articles[0].feed.name
            data.title = articles[0].title
            data.source = articles[0].link
            data.published = articles[0].published
            res.send(data)
        })
    })
})


comics.get("/api/v1/drpepper", function(req, res) {
    feed("http://feeds.feedburner.com/drpepper", function(error, articles) {
        if (error) throw error;
        xray(articles[0].content, {
            text: 'p',
            comic: 'img@src',
        })(function(error, data){
            if (error) throw error;
            data.author = articles[0].feed.name
            data.title = articles[0].title
            data.source = articles[0].link
            data.published = articles[0].published
            res.send(data)
        })
    })
})


comics.get("/api/v1/vidadeprogramador", function(req, res) {
    feed("http://vidadeprogramador.com.br/feed.xml", function(error, articles) {
        if (error) throw error;
        xray(articles[0].content, {
            text: 'img@title',
            comic: '.tirinha img@src',
            video: 'a@href',
        })(function(error, data) {
            data.author = articles[0].feed.name
            data.title = articles[0].title
            data.source = articles[0].link
            data.published = articles[0].published
            data.text = (data.text) ? 'Camiseta: ' + data.text : undefined
            data.video = (data.video.split('?v=')[1]) ? data.video : undefined
            res.send(data)
        })
    })
})


comics.get("/api/v1/xkcd", function(req, res) {
    feed("http://xkcd.com/atom.xml", function(error, articles) {
        if (error) throw error;
        xray(articles[0].link, {
            comic: '#comic img@src',
            text: '#comic img@title',
        })(function(error, data) {
            if (error) throw error;
            data.author = articles[0].feed.name
            data.title = articles[0].title
            data.source = articles[0].link
            data.published = articles[0].published
            res.send(data)
        })
    })
})
comics.get("/api/v1/xkcd/:id", function(req, res) {
    xray('http://xkcd.com/'+req.params.id, '#comic img@src')
    (function(error, comic) {
        if (error) throw error;
        res.send(comic)
    })
})


comics.get("/api/v1/hacktoon", function(req, res) {
    feed("http://hacktoon.com/feed/rss.xml", function(error, articles) {
        if (error) throw error;
        xray(articles[0].content, {
            comic: 'img@src'
        })(function(error, data){
            if (error) throw error;
            data.author = articles[0].feed.name
            data.title = articles[0].title
            data.source = articles[0].link
            data.published = articles[0].published
            res.send(data)
        })
    })
})


comics.get("/api/v1/phdcomics", function(req, res) {
    xray("http://www.feedbucket.com/?src=http://phdcomics.com/gradfeed.php", {
        comic: 'img@src',
        author: 'a[href="http://www.phdcomics.com"]',
        title: 'font[size="-2"] a',
        source: 'font[size="-2"] a@href',
        published: 'font[size="1"] b',
    })(function(error, data){
        if (error) throw error;
        res.send(data)
    })
})


comics.get("/api/v1/explosm", function(req, res) {
    feed("http://feeds.feedburner.com/Explosm", function(error, articles) {
        if (error) throw error;
        xray(articles[0].link, {
            comic: '#main-comic@src',
            video: '#comic-container a@href',
        })(function(error, data){
            if (error) throw error;
            data.author = articles[0].feed.name
            data.published = articles[0].published
            data.source = (!data.video) ? articles[0].link : data.video
            data.video = undefined
            res.send(data)
        })
    })
})


comics.get("/api/v1/dilbert", function(req, res) {
    feed("http://feed.dilbert.com/dilbert/daily_strip", function(error, articles) {
        if (error) throw error;
        xray(articles[0].link, {
            title: 'span.comic-title-name',
            comic: '.img-comic@src',
        })(function(error, data){
            data.author = articles[0].feed.name
            data.source = articles[0].link
            data.published = articles[0].published
            res.send(data)
        })
    })
})


comics.get("/api/v1/:invalid", function(req, res) {
    var data = { invalid: req.params.invalid }
    res.send(data);
});
