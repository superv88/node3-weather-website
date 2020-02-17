const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express configs
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static home page path to serve
app.use(express.static(publicDirPath)) 

app.get('', (req, res) => {
    res.render('index', {// route for index.hbs
        title:'Weather APP 2',
        name: 'Reman Chim'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Reman Chim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Reman Chim',
        helpText: 'This is a help page for everyone!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Reman Chim',
        errorText: 'Help article not found!!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Reman Chim',
        errorText: 'Page not found!!!'
    })
})

app.listen(3000, () => { // localhost:3000
    console.log('Server is up on port 3000.')
})

//== run in command prompt: nodemon src/app.js