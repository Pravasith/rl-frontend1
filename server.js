const express = require('express')
const next = require('next')
const favicon = require('serve-favicon')
var path = require('path')
let https = require('https')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const fs = require('fs')

// NODE_ENV=production PORT=80 node server


nextApp.prepare()
    .then(() => {
        const server = express ()


        let port = 80;

        let options = {
            // key: fs.readFileSync('./ssl/privatekey.pem'),
            // cert: fs.readFileSync('./ssl/certificate.pem'),
            key: fs.readFileSync('/etc/letsencrypt/live/vendor.rollinglogs.com/privkey.pem', 'utf-8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/vendor.rollinglogs.com/fullchain.pem', 'utf-8'),
            // key: fs.readFileSync('/var/www/rollinglogs/fullkeys/privkey.pem', 'utf-8'),
            // cert: fs.readFileSync('/var/www/rollinglogs/fullkeys/fullchain.pem', 'utf-8')
        };

        // let app = express();

        

        // server.use(favicon(path.join(__dirname, "/favicon.ico")))

        // server.get('/vendor/profile-details/:id', (req, res) => {
        //     const actualPage = '/vendor-profile-details'
        //     const queryParams = { title: req.params.id }
        //     app.render(req, res, actualPage, queryParams)
        // })

        server.get('/vendor/profile-details', (req, res) => {
            const actualPage = '/vendor-profile-details'
            nextApp.render(req, res, actualPage)
        })

        server.get('/vendor/dashboard', (req, res) => {
            const actualPage = '/vendor-main-dashboard'
            nextApp.render(req, res, actualPage)
        })

        server.get('/vendor/add-product/:sCId', (req, res) => {
            const actualPage = '/vendor-add-product-details'
            const queryParams = { sCId: req.params.sCId }
            nextApp.render(req, res, actualPage, queryParams)
        })

        server.get('/vendor/edit-product/:pId', (req, res) => {
            const actualPage = '/vendor-edit-product-details'
            const queryParams = { pId: req.params.pId }
            nextApp.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        let app = https.createServer(options, server)
        .listen((port), function(){
        console.log("Express server listening on port " + port);
        });

        // server.listen((3000, "localhost"), (err) => {
        //     if (err) throw err
        //     console.log('>> Ready on 3000')
        // })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })