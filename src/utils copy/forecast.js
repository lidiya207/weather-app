const axios = require('axios');

const forecast = async function forecast(longitude, latitude, callback) {
    try {
        const { data } = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: 'bcbe0420058e471780e125031232512',
                q: `${latitude},${longitude}`,
                days: 1,
                aqi: 'no',
                alerts: 'no'
            }
        });

        const currentWeather = data.current;
        const forecastDay = data.forecast.forecastday[0].day.condition.text;
        
        const stringResponse = `${forecastDay}. It is currently ${currentWeather.temp_c} degrees out. There is a ${currentWeather.precip_in}% chance of rain.`;

        callback(undefined, stringResponse);
    } catch (error) {
        if (error.response) {
            callback(error.response.data.error.message, undefined);
        } else {
            console.error(error); // Log the error for debugging purposes
            callback('Unable to get the weather data.', undefined);
        }
    }
};

module.exports = forecast;





// const axios = require('axios')

// const forcast = async function address(longitude, latitude, callback) {
//     try {
//       const {data} = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=bcbe0420058e471780e125031232512=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
//       const stringResponse = data.forecast.forecastday[0].day.condition.text + '. it is currently ' + data.current.temp_c + ' degrees out. there is a ' + data.current.precip_in + '% chance of rain'
//      callback(undefined, stringResponse)
//     } catch (error) {
//         if(error.response){
//      callback(error.response.data.error.message , undefined)
//     } else {
//         console.log(error)
//      callback('unable to get the weather data ' , undefined)
//     }
//   }
// } 
//  module.exports = forcast