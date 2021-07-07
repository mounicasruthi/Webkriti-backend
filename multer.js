const multer = require("multer");

//specifying the storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date().now + "-" + file.originalname);
  },
});

//file validation

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 400 * 400 },
  fileFilter: fileFilter,
});

module.exports = upload;
