const { Formidable } = require('formidable');
const cloudinary  = require('cloudinary').v2;

// const cloudinary = new Cloudinary(
//     process.env.CLOUDINARY_URL
// );


cloudinary.config({ 
    //  cloud_name: 'dhzozm2my', 
    //  api_key: '132299938121256', 
    // api_secret: 'its a secret key',
    
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
    
  });
  

module.exports = cloudinary; 
module.exports = Formidable;