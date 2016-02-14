var express    = require('express')
var comics     = module.exports = express()
var bodyParser = require('body-parser')

/* Middlewares */
comics.use('/static', express.static('public'))
comics.use(bodyParser.json())
comics.use(bodyParser.urlencoded({ extended: true }))

/* Express settings */
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip   = process.env.OPENSHIFT_NODEJS_IP   || '0.0.0.0'

comics.listen(server_port, server_ip, function(){
    console.log("Listening on " + server_ip + ", port " + server_port)
});
