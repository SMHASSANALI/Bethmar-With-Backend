// const mongoose = require("mongoose");

// const HeroSectionSchema = new mongoose.Schema({
//     description: [
//         {
//             type: String,
//
//         }
//     ],
//     image: {
//         type: String,
//
//     },
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("HeroSection", HeroSectionSchema);

const mongoose = require('mongoose')

const AboutCardSchema = new mongoose.Schema({
  heading: { type: String },
  description: { type: String },
  SVG: { type: String },
  imageUrl: { type: String }
})

const HeroSectionSchema = new mongoose.Schema(
  {
    description: [
      {
        type: String
      }
    ],
    image: {
      type: String
    },
    clients: [String],
    services: {
      telecom: [String],
      utility: [String],
      traffic: [String]
    },
    about: [AboutCardSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('HeroSection', HeroSectionSchema)
