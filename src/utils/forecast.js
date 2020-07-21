const request = require('postman-request');

/* Geocode callback */
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=61f818f3e763490f3f5e831f887b1272&query=' + latitude + ',' + longitude; 

    request ({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            /* argument undefined for error */
            callback(undefined, body.current.temperature + 'º Degrees');
        } 
    })
}

module.exports = forecast;