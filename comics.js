var comics = require("./config.js")
var fs     = require("fs")
var feed   = require("feed-read")
var xray   = require('x-ray')();

comics.get("/", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.send(fs.readFileSync("./public/index.html"))
})

comics.get("/:comic", function(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.send(fs.readFileSync("./public/index.html"))
})



/* xkcd */
comics.get("/api/v1/xkcd", function(req, res) {
    feed("http://xkcd.com/atom.xml", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, '#comic img@title')(function(error, text) {
            data.text = text
            xray(articles[0].link, '#comic img@src')(function(error, comic) {
                data.comic = comic
                res.send(data)
            })
        })
    });
});


comics.get("/api/v1/xkcd/:id", function(req, res) {
    xray('http://xkcd.com/'+req.params.id, '#comic img@src')(function(error, comic) {
        res.send(comic)
    })
});


/* Will Tirando */
comics.get("/api/v1/willtirando", function(req, res) {
    feed("http://www.willtirando.com.br/rss/", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(error, comic) {
            data.comic = comic
            res.send(data)
        })
    });
});


/* Explosm */
comics.get("/api/v1/explosm", function(req, res) {
    feed("http://feeds.feedburner.com/Explosm", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: '', //articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, '#main-comic@src')(function(error, comic){
            data.comic = comic
            res.send(data)
        })
    });
});


/* Dilbert */
comics.get("/api/v1/dilbert", function(req, res) {
    feed("http://feed.dilbert.com/dilbert/daily_strip", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: '',
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, 'span.comic-title-name')(function(error, title){
            data.title = title;
            xray(articles[0].link, '.img-comic@src')(function(error, comic){
                data.comic = comic
                res.send(data)
            })
        })
    });
});


/* Dr. Pepper */
comics.get("/api/v1/drpepper", function(req, res) {
    feed("http://feeds.feedburner.com/drpepper", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'p')(function(error, text){
            data.text = text;
            xray(articles[0].content, 'img@src')(function(error, comic){
                data.comic = comic
                res.send(data)
            })
        })
    });
});


/* Hacktoon! */
comics.get("/api/v1/hacktoon", function(req, res) {
    feed("http://hacktoon.com/feed/rss.xml", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(error, comic){
            data.comic = comic
            res.send(data)
        })
    });
});


/* Vida de Programador */
comics.get("/api/v1/vidadeprogramador", function(req, res) {
    feed("http://feeds.feedburner.com/VidaDeProgramador", function(error, articles) {
        if (error) throw error;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@title')(function(error, text) {
            data.text = text
            xray(articles[0].content, 'img@src')(function(error, comic) {
                data.comic = comic
                res.send(data)
            })
        })
    });
});


/* PHD Comics */
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
});


comics.get("/api/v1/:invalid", function(req, res) {
    var data = {
        author: '',
        invalid: req.params.invalid,
    };
    res.send(data);
});
