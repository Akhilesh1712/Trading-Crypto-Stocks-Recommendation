const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeschema = new mongoose.Schema({
     firstname : {
        type:String,
        required:true
     },
     email : {
        type:String,
        requireed:true,
        unique:true
     },
     password : {
        type:String,
        required:true,
     },
     confirmpassword : {
        type:String,
        required:true,
     },
     tokens : [{
          token : {
            type : String,
            required : true
          }
     }]
})

//JWT
employeeschema.methods.generateAuthToken = async function() {  //for using instance(means collection kio ak tuple) then we have to use methods and if using collection then have to use statics
   try {
      const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY); //we have to use unique identifier which is ID in this databse
      this.tokens = this.token.concat({token:token});
      await this.save();
      return token;
   } catch (error) {
       res.send("the error is " + error);
   }
}

//Hashing
employeeschema.pre("save", async function(next) {            //save se phale ye ker na  
       
   if(this.isModified("password")){  //ager password modified hoga registration ya login ke time jabi bcrypt call hoga
   
     this.password = await bcrypt.hash(this.password,4);

     this.confirmpassword = await bcrypt.hash(this.password,4);//database per confirm password store nhi hoga ,hamne us per dcryption thodi lagayi hai

   }  
   next(); //uske bad ab ye next walla kam kerte rho (save)
})         
//collection

const Register = new mongoose.model("Register", employeeschema);
module.exports = Register;