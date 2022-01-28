const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')
const { response } = require('express')

const app=express()

/**
* API key link should be copied from the site and should be pasted here.
*/
const apikey='078ef7056df51407ac1e2c7b57f727ea'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('index',{weather:null,error:null})
})
/**
 * open api from site -> openweathermap.org
 * generate your own api key in site by logging in and delete tha api after your completion of your project.
 * It's free of cost
 */
app.post('/',function(req,res){
    let city=req.body.city
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    console.log(req.body.city);
    request(url,function(err,response,body){
        if(err){
            res.render("index",{weather:null,error:"Error, Please enter again"})
        }
        else{
            let weather=JSON.parse(body);
            if(weather.main==undefined){
                res.render("index",{
                    weather:null,
                    error:"Error, Please enter again",
                });
            }
            else{
                let weathertext=`It's ${weather.main.temp} degree Celsius with ${weather.weather[0].main} in ${weather.name}!!`;
                res.render("index",{weather:weathertext, error:null});
                console.log("body:",body);
            }
        }
    });
});

app.listen(3000,function(){
    console.log("Weatherly app listening on port 3000")
});

