const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection successful");
}).catch((error) => {
    console.error("Connection failed:", error.message);
});


