const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express ()

        // server.get('/vendor/profile-details/:id', (req, res) => {
        //     const actualPage = '/vendor-profile-details'
        //     const queryParams = { title: req.params.id }
        //     app.render(req, res, actualPage, queryParams)
        // })

        server.get('/vendor/profile-details', (req, res) => {
            const actualPage = '/vendor-profile-details'
            app.render(req, res, actualPage)
        })

        server.get('/vendor/dashboard', (req, res) => {
            const actualPage = '/vendor-main-dashboard'
            app.render(req, res, actualPage)
        })

        server.get('/vendor/add-product/:sCId', (req, res) => {
            const actualPage = '/vendor-add-product-details'
            const queryParams = { sCId: req.params.sCId }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })