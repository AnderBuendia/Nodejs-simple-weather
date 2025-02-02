const request = require('postman-request');

/* Geocode callback */
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG9sYW5kb3RyYXAiLCJhIjoiY2tjdTZ2dnpjMGxmbjJ5bnRxM29rMXY3OSJ9.bqsfs9tCWJ0qXHCO_A7fvA';

    request ({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            /* argument undefined for error */
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode;
