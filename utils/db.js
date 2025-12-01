const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const Conn = async () =>{
 mongoose.connect("mongodb+srv://sajjad:faqeer123@cluster0.r0puq1a.mongodb.net/fileUploads?retryWrites=true&w=majority&appName=Cluster0")
 .then(()=>{
    console.log("MongoDB Connection successful");
})
.catch(()=>{
    console.log("Error to connecting Mongodb", error);
    
})
}

module.exports = Conn;

