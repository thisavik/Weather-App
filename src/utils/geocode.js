const axios = require('axios')

const geocode = async (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" + process.env.MAPBOX_API_KEY

    try {
        const body = await axios.get(url)
        const data = {
            longitude: body.data.features[0].center[0],
            lattitude: body.data.features[0].center[1],
            location: body.data.features[0].place_name
        }
        callback(undefined, data)
    } catch (e) {
            callback("Unable to access the Location Service !!", undefined)
    }
}

module.exports = geocode