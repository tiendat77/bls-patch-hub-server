import multer from 'multer';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' +file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
