const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/a194658d73e3550e58c8d9827f2cdf90/`+latitude+','+longitude+``
     
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to location server",undefined)
    
        }
        else if(response.body.currently===0){
            callback("Adrress not found",undefined)
        }
        else {
            callback(undefined,{
                address:response.body.currently
            })
        }
    })

}

module.exports=forecast