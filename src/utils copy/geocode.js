const axios =require('axios')

const geocode = async (address , callback)=> {
    try {
      const {data} = await axios.get(`https://api.maptiler.com/geocoding/$${address}.json?key=jEHCm0SxqaSg3WARgk3d`)
      console.log(data)
     if (data.features.length === 0)
      callback('location not found. try another search', undefined)
     else {
        const{center , place_name} =data.features[0]
        callback(undefined,{
            longitude : center[0],latitude : center[1],location:place_name  
              })
     }
    } catch (error) {
      callback('unable to connect to the weather service', undefined)
    }
  }
  module.exports = geocode