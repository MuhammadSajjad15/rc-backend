const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  txt: {
    type: String,
    required: true,
  },

  // 🔽 Product-related fields
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  inStock: {
    type: Boolean,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
  }
});

const File = model("File", fileSchema);

module.exports = File;
