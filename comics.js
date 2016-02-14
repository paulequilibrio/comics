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
    feed("http://xkcd.com/atom.xml", function(err, articles) {
        if (err) throw err;
        // console.log(JSON.stringify(articles, null, 2));
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, '#comic img@src')(function(err, comic) {
            data.comic = comic
            res.send(data)
        })
    });
});

comics.get("/api/v1/xkcd/:id", function(req, res) {
    // console.log(JSON.stringify(articles, null, 2));
    // res.send('<pre>'+JSON.stringify(articles, null, 2)+'</pre>');
    // xray(articles[0].link, '#comic img@src')(function(err, comic) {
    xray('http://xkcd.com/'+req.params.id, '#comic img@src')(function(err, comic) {
        res.send(comic)
    })
});

/* Will Tirando */
comics.get("/api/v1/willtirando", function(req, res) {
    feed("http://www.willtirando.com.br/rss/", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});

/* Explosm */
comics.get("/api/v1/explosm", function(req, res) {
    feed("http://feeds.feedburner.com/Explosm", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: '', //articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, '#main-comic@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});

/* Dilbert */
comics.get("/api/v1/dilbert", function(req, res) {
    feed("http://feed.dilbert.com/dilbert/daily_strip", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: '', //articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].link, '.img-comic@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});

/* Dr. Pepper */
comics.get("/api/v1/drpepper", function(req, res) {
    feed("http://feeds.feedburner.com/drpepper", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});


/* Hacktoon! */
comics.get("/api/v1/hacktoon", function(req, res) {
    feed("http://hacktoon.com/feed/rss.xml", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});

/* Vida de Programador */
comics.get("/api/v1/vidadeprogramador", function(req, res) {
    feed("http://feeds.feedburner.com/VidaDeProgramador", function(err, articles) {
        if (err) throw err;
        var data = {
            comic: '',
            author: articles[0].feed.name,
            title: articles[0].title,
            source: articles[0].link,
            published: articles[0].published
        }
        xray(articles[0].content, 'img@src')(function(err, comic){
            data.comic = comic
            res.send(data)
        })
    });
});



/* PHD Comics */
// comics.get("/api/v1/phdcomics", function(req, res) {
//     feed("http://phdcomics.com/gradfeed.php", function(err, articles) {
//         if (err) throw err;
//         console.log(articles)
//         var data = {
//             comic: '',
//             author: articles[0].feed.name,
//             title: articles[0].title,
//             source: articles[0].link,
//             published: articles[0].published
//         }
//         xray(articles[0].content, 'img@src')(function(err, comic){
//             data.comic = comic
//             res.send(data)
//         })
//     });
// });
