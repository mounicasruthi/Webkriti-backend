const cloudinary = require("cloudinary").v2;

// const cloudinary = new Cloudinary(
//     process.env.CLOUDINARY_URL
// );

// required dotenv in video but skipped here

cloudinary.config({
  //  cloud_name: 'dhzozm2my',
  //  api_key: '132299938121256',
  // api_secret: 'its a secret key',

  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// exports.image = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };

module.exports = cloudinary;
