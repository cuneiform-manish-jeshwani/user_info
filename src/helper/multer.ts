import multer from 'multer';
import path from 'path';

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/audio");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/profile");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  },
});

const maxAudio = 5 * 1024 * 1024;
const maxProfile = 2 * 1024 * 1024;

const uploadAudio = multer({
  storage: audioStorage,
  limits: {
    fileSize: maxAudio,
  },
}).single('audio');

const uploadProfile = multer({
  storage: profileStorage,
  limits: {
    fileSize: maxProfile,
  },
}).single('profile');

export { uploadAudio, uploadProfile };