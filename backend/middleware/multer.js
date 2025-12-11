import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname); // unique file name
  },
});

// Create upload middleware
const upload = multer({ storage });

export default upload