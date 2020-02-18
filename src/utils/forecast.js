const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/20a925e100f97707e0fa10da5c47b7f7/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location! Try another search', undefined)
        } else {
            //callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast