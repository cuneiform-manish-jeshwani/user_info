//import { Request, Response, NextFunction } from 'express';
// import { uploadAudio, uploadProfile } from '../helper/multer';

//import {upload} from '../helper/multer'

// export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
//   uploadAudio(req, res, (audioErr) => {
   
//     if (audioErr) {
//       return res.status(400).json({ error: 'Audio upload failed' });
//     }
//     uploadProfile(req, res, (profileErr) => {
//       if (profileErr) {
//         return res.status(400).json({ error: 'Profile upload failed' });
//       }
//       next(); 
//     });
//   });
// };

// export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
  // upload(req, res, (err) => {
   
  //   if (err) {
  //     return res.status(400).json({ error: 'upload failed' });
  //   }
  
  //     next(); 
  //   });
// };

import { Request, Response, NextFunction } from "express";
import multer from "multer";

 
const multerStorage=multer.diskStorage({
  destination: (req, file, callback) => {
 
    let destinationFolder = 'src/uploads/';
    if (file.mimetype.startsWith('audio/')) {
      destinationFolder = `src/uploads/audio`;
    }
     else if (file.mimetype.startsWith('image/')) {
      destinationFolder = `src/uploads/image`;
    }
    callback(null, destinationFolder);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
 
const multerFilter = (req: any, file: any, cb: any) => {
  let allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
     "audio/mp3",
     "audio/mpeg",
    ]
  if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
  } else {
    return cb(new Error("Invalid file type."));
  }
};
 
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
]);
 
const handleUpload = (req: any, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "failed",
      });
    } else if (err) {
      return res.status(400).json({
        message: "upload fail"
      });
    }

    // Check if audio and image files were uploaded
    if (!req.files['audio'] || !req.files['image']) {
      return res.status(401).json({
        message: 'Both audio and image files are required.',
      });
    }

    const imageFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['image'][0];
    const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

    console.log('Uploaded audio file:', audioFile.originalname);
    console.log('Uploaded image file:', imageFile.originalname);

    next();
  });
};

export { handleUpload };
