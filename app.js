const express =require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res){
  res.sendFile(__dirname +"/index.html");
});
app.post("/" , function(req , res){
//console.log(req.body.cityName);
//  console.log("Post recieved"); // For checking
const query = req.body.cityName;
const apikey = "d8d581038c6a2a7a9e05660cfb1504f1";
const unit = "metric";
const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apikey+ "&units=" +unit ;

https.get(url, function(response){
// console.log(response);
console.log(response.statusCode); // this will give status of code.

response.on("data" , function(data){   //console.log(data); 
                                        // This will give hexadecimal
  const weatherData = JSON.parse(data);      // code therefore to convert it into
    //console.log(weatherData);                // javascript code use this
  const temp = weatherData.main.temp;
  const desc = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png" ;
  //console.log(temp);
  // console.log(desc);
res.send("<h3>The weather is currently " + desc + ".</h3> <h1>The temperature in " +query+          " is " +temp+ " degrees Celcius.</h1> <img src =" +imageURL+ ">") ;

/*res.write("<h3>The weather is currently " + desc + ".</h3>");
res.write("<h1>The temperature in London is "+temp+ " degrees Celcius.</h1>");
res.write("<img src =" +imageURL+ ">");
res.send();
*/
                                      
/*const object = {                          // to convert js code into string
   name: "Palkin" ,
   favFood : "Pizza"
}  
console.log(JSON.stringify(object));     */        
                 
});
});  

});

  
  

app.listen(3000 , function(){
  console.log("Server is running");
});


