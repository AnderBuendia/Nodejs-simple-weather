const express = require('express');
const path = require('path');
const hbs = require('hbs');
const favicon = require('serve-favicon');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/* set server // set PORT for heroku */
const app = express();
const port = process.env.PORT || 3000;

/* Paths  for Express config */
// console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, '../public');

/* Change views hbs path // By default views */
const viewsPath = path.join(__dirname, '../templates/views'); 
const partialsPath = path.join(__dirname, '../templates/partials');

/* Favicon in all pages */
app.use(favicon(path.join(__dirname,'../public/img/weather.png')));

/* Setup handlebars engine and views location */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/* Setup static directory to serve */
app.use(express.static(publicDirectoryPath));

/** Routes */
app.get('/', (req, res) => {
    /* To configure views hbs */
    res.render('index', {
        title: 'Weather App',
        name: 'Ander'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ander'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpText',
        title: 'Help',
        name: 'Ander'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        /* With return won't be any problem when the server reloads */
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        })
    }
    // req.query()
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        /* With return won't be any problem when the server reloads */
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
    // req.query()
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Ander',
        errorMessage: 'Error 404. Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
            title: 'Error 404',
            name: 'Ander',
            errorMessage: 'Error 404. Page not found'
    });
});

/* Setup server */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});