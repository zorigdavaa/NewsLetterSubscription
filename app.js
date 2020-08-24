const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = process.env.port || 3000;
const app = express();
const https=require("https");
app.use(express.static("wwwRoot"));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/failure",(req,res)=>{
    res.redirect("/");
})
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});
app.post("/",(req,res)=>{
    const lastName= req.body.lname;
    const firstName=req.body.fname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us17.api.mailchimp.com/3.0/lists/1a482f2a2e"
    const options={
        method:"POST",
        auth:"zorigdavaa:51e35d4e6b980a28846729eb31b193e6-us17"
    }
  var request=  https.request(url,options,function(response){
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
            
        });
        if (response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        request.on("error",(error)=>{
            console.log(error);
            
        });
        response.statusCode
    });
    request.write(jsonData);
    request.end();
    
    console.log(email+lastName+firstName);
});




app.listen(port, () => {
    console.log("App is listening on port " + port);
  });

  //APi KEY Mailchimp
  //51e35d4e6b980a28846729eb31b193e6-us17

  //List ID
  //1a482f2a2e