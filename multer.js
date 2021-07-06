const multer = require("multer");

//specifying the storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date());
  },
});
