const express = require("express");
const multer = require("multer");
const Conn = require("./utils/db");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Uploadrouter = require("./routes/file-route");

const transporter = nodemailer.createTransport({
    service:"gmail",
auth:    {
    user:"engrsajjad15@gmail.com",
    pass:"vprs ndrr ustv xqid"
    }
})

const mailOptions = {
    from:"engrsajjad15@gmail.com",
    to:"engrsajjad15@gmail.com",
    subject:"Testing Mail",
    html:`
    <div style="
      background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e'); 
      background-size: cover;
      background-position: center;
      padding: 40px; 
      color: white; 
      font-family: Arial, sans-serif;
      text-align: center;
    ">
      <div style="background-color: rgba(0, 0, 0, 0.6); padding: 30px; border-radius: 10px;">
        <h1>Welcome, Sajjad!</h1>
        <p style="font-size: 18px;">This is your first HTML email with a background image 🎉</p>
        <p style="margin-top: 20px;">Stay consistent, keep learning.<br><strong>MERN stack is powerful!</strong></p>
      </div>
    </div>
  `
}

// transporter.sendMail(mailOptions,(err,info)=>{
//     if(err){
//         console.log("Sorry there is some error to send msg");
        
//     }
//       if(info){
//         console.log("Your msg is send successfully");
        
//     }
// });


const app = express();
const PORT = 8000;

//middlewares 
app.use(express.json({}));
app.use(cors());
app.use("/upload",Uploadrouter);


app.get('/', (req,res)=>{
    res.send("Hello to the future");
})


Conn().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);

    })
}).catch((error) => {
    console.log("Unsuccseful Connection.... Sajjad", error);

})
