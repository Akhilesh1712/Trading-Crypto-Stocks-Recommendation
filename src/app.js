require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./db/conn");
const Register = require("./models/register");
const { json } = require("express");
const auth = require("./middleware/auth");
const { log } = require("console");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
hbs.registerPartials(partials_path);

app.set("view engine", "hbs");
app.set("views" , templates_path); //ab vo views walla folder ye ho chuka hai

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/register", (req,res) => {
    res.render("register");
})

app.get("/secret", auth ,(req,res) => {

    res.render("secret");
})

app.get("/login", (req,res) => {
    res.render("login");
})

app.post("/register", async (req,res) => {
    try {
        
       const  password = req.body.password;
       const  cpassword = req.body.confirmpassword;

       if(password === cpassword){
           const registeremp = new Register({
              firstname : req.body.firstname,
              email : req.body.email,
              password : req.body.password,
              confirmpassword : req.body.confirmpassword
           })
           //using middleware(hashing and also used jwt)


            const token = await registeremp.generateAuthToken();
            console.log("the token part" + token);
            
            res.cookie("jwt",token);

            const registered = await registeremp.save();
            console.log("the token part" + token);
            res.status(201).render("index");//register hone ke bad is site(index) per 
       }else{
          res.send("not matching");
       }

    } catch (error) {
        res.status(400).send(error);
    }
})


//login validation
app.post("/login", async(req,res) => {
    try {
       
        const email = req.body.username;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email}); //user ne jo email di and database me jo hai vo same hai ya nhi (vesse {email} bhi lihk sakte kyuki due to object destrucring of both are same we can use one)
        
        const isMatch = await bcrypt.compare(password,useremail.password); // its just checking ke jo password hame ne diya login ke wakt vo kya same hai jo databse me save hai dcrypt hoker
        
        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);

        res.cookie("jwt",token);
        
        if(isMatch){
            res.status(201).render("index");//if correct so send me to main index page
        }else{
            res.send("email is wrong or password is wrong");
        }
    } catch(error) {
        res.status(400).send("invalid email")
    }
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})

