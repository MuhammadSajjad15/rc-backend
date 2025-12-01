const multer = require("multer");
const path = require("path");
const File = require("../models/fileModel");
const { log } = require("console");


//multer configuration starts here 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // ✅ Corrected
    }
});

const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const txt = req.body.name;
    const filePath = req.file.path;
    const filename = req.file.filename; // ✅ correct here

    console.log("TXT:", txt);
    console.log("FILE PATH:", filePath);
    console.log("FILENAME:", filename);

    const newFile = new File({ txt, filePath, filename });
    await newFile.save();

    res.status(200).json({
      message: "File uploaded and saved to MongoDB successfully.",
      file: req.file,
    });
  } catch (error) {
    console.error("❌ Error saving to DB:", error.message);
    res.status(500).send("Failed to save to database.");
  }
};


const getData = async (req, res) =>{
  try {
    const {name} = req.query;
    const queryObject = {};
    if(name){
      
      queryObject.name = {$regex: name.trim(), $options: "i"};
    }
    console.log(queryObject);
    const data = await File.find(queryObject).sort("name").limit(3);
    res.status(200).json(data);
  } catch (error) {
    console.log("ya error getData route say hai", error);
    
  }
}


const getPagination = async (req, res) =>{
  try {
    let {page, limit} = req.query;
    const queryObject = {};
    if(page){
      queryObject.page = Number(page) || 1;
    }
    if(limit){
      queryObject.limit = Number(limit) || 3;
    }
    let  skip = (page -1) * limit;
    console.log(queryObject);
    const data = await File.find(queryObject).skip(skip).limit(limit);
    res.status(200).json({data, nbHits: data.length});
  } catch (error) {
    console.log("ya error getData route say hai", error);
    
  }
}

module.exports = {upload, uploadFile, getData, getPagination}