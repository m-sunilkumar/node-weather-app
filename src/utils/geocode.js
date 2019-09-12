const request=require('request')



const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/`+address+`.json?access_token=pk.eyJ1Ijoic3VuaWxwaWt0b3IiLCJhIjoiY2p5OG1pa3QyMDF4ODNkbzBoc2dmNnV0YyJ9.MogdrY7fj1rKReWFK4hpEQ`
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to location server",undefined)
    
        }
        else if(response.body.features.length===0){
            callback("Adrress not found",undefined)
        }
        else {
            callback(undefined,{
                 longitude:response.body.features[0].center[1],
                  latitude:response.body.features[0].center[0],
                  location:response.body.features[0].place_name
            })
        }
    })
   
}


module.exports=geocode