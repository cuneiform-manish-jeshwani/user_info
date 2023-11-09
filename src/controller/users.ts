// controller/userController.ts
// controller/userController.ts
// import { Request, Response } from "express";
// import multer from 'multer';
// import path from 'path';
// import { handleProfileUpload } from '../middleware/multer';
// import { User, Userdata } from "../model/user";
// import { port } from '../../index';

// export const createUser = (req: Request, res: Response) => {
//   handleProfileUpload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: 'Uploads failed' });
//     }

//     try {
//       const { firstname, lastname, address, pincode, company_name } = req.body;

//       const imageFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['image'][0];
//     const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

//       const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;
//       const image = `http://${req.hostname}:${port}/api/user/profile/${path.basename(imageFile.filename)}`;

//       const user: Userdata = await User.create({
//         firstname,
//         lastname,
//         address,
//         pincode,
//         company_name,
//         audio,
//         image,
//       });

//       console.log(user);
//       res.status(201).json(user);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });
// };





// // // import { Request, Response } from 'express';
// // // import { User, Userdata } from '../model/user';
// // // import { handleFileUpload } from '../middleware/multer';
// // // import path from 'path';;
// // // import {port} from '../../index'

// // // const maxAudio = 5 * 1024 * 1024;  
// // // const maxProfile = 2 * 1024 * 1024;


// // // export const createUser = (req: Request, res: Response) => {
// // //   handleFileUpload(req, res, async (err) => {
// // //     if (err) {
// // //       return res.status(400).json({ error: 'File upload failed' });
// // //     }
    
// // //     try {
// // //       const { firstname, lastname, address, pincode, company_name } = req.body;

// // //       if (!req.file || !req.file.size) {
// // //         return res.status(400).json({ error: 'No file uploaded' });
// // //       }

// // //       const audioFile = req.file;
// // //       const profileFile = req.file;

// // //       if (audioFile.size > maxAudio) {
// // //         return res.status(400).json({ error: 'Audio file size should not exceed 5MB' });
// // //       }

// // //       const audios = audioFile.filename;
// // //       const audio = `${req.hostname}:${port}/api/user/audio/${path.basename(audios)}`;

// // //       if (profileFile.size > maxProfile) {
// // //         return res.status(400).json({ error: 'Profile file size should not exceed 2MB' });
// // //       }

// // //       const profiles = profileFile.filename;
// // //       const profile = `${req.hostname}:${port}/api/user/profile/${path.basename(profiles)}`;
// // //       console.log(profile)
// // //       console.log(audio)

// // //       const user: Userdata = await User.create({
// // //         firstname,
// // //         lastname,
// // //         address,
// // //         pincode,
// // //         company_name,
// // //         audio,
// // //         profile,
// // //       });
// // //       console.log(user)

// // //       res.status(201).json(user);
// // //     } catch (error) {
// // //       res.status(500).json({ error: 'Failed to create user' });
// // //     }
// // //   });
// // // };



// import { Request, Response } from "express";
// import multer from 'multer';
// import path from 'path';
// import { port } from '../../index';
// import {handleFileUpload} from '../middleware/multer'
// import { User, Userdata } from "../model/user";




// export const createUser = (req: Request, res: Response) => {
//   handleFileUpload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: 'File upload failed' });
//     }

//     try {
//       const { firstname, lastname, address, pincode, company_name } = req.body;
//       const profileFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['profile'][0];
//       const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

//       if (!profileFile || !audioFile) {
//         return res.status(400).json({ error: 'Both profile and audio files are required' });
//       }


//       const profile = `http://${req.hostname}:${port}/api/user/${path.basename(profileFile.filename)}`;
//       const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;

//       const user: Userdata = await User.create({
//         firstname,
//         lastname,
//         profile,
//         audio,
//         address,
//         pincode,
//         company_name,
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });

// };


// import { Request, Response } from "express";
// import multer from 'multer';
// import path from 'path';
// import { port } from '../../index';
// import { User, Userdata } from "../model/user";

// const storage = multer.diskStorage({
//   destination: 'src/uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const maxAudioSize = 5 * 1024 * 1024; // 5MB

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: maxAudioSize,
//   },
// }).fields([
//   { name: 'profile', maxCount: 1 },
//   { name: 'audio', maxCount: 1 },
// ]);

// export const createUser = (req: Request, res: Response) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: 'File upload failed' });
//     }

//     try {
//       const { firstname, lastname, address, pincode, company_name } = req.body;
//       const profileFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['profile'][0];
//       const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

//       if (!profileFile || !audioFile) {
//         return res.status(400).json({ error: 'Both profile and audio files are required' });
//       }

//       if (audioFile.size > maxAudioSize) {
//         return res.status(400).json({ error: 'Audio file size should not exceed 5MB' });
//       }

//       const profile = `http://${req.hostname}:${port}/api/user/${path.basename(profileFile.filename)}`;
//       const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;

//       const user: Userdata = await User.create({
//         firstname,
//         lastname,
//         profile,
//         audio,
//         address,
//         pincode,
//         company_name,
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to create user' });
//     }
//   });

// };



// import { Request, Response, NextFunction } from "express";
// import multer from "multer";
// import constants from "../utils/constants";
 
 
// const multerStorage=multer.diskStorage({
//   destination: (req, file, callback) => {
 
//     let destinationFolder = 'public/';
//     if (file.mimetype.startsWith('audio/')) {
//       destinationFolder = `public/audio`;
//     }
//      else if (file.mimetype.startsWith('image/')) {
//       destinationFolder = `public/photos`;
//     }
//     callback(null, destinationFolder);
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });
 
// const multerFilter = (req: any, file: any, cb: any) => {
//   let allowedMimes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "image/avif",
//     "image/heif",
//     "image/heic",
//      "audio/mpeg",
//     "audio/wave",
//     "audio/ogg",
//      "audio/flac",
//      "audio/aac",
//     ]
//   if (allowedMimes.includes(file.mimetype)) {
//         cb(null, true);
//   } else {
//     return cb(new Error("Invalid file type."));
//   }
// };
 
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// }).array("profile_media", 5);
 
// const handleProfileUpload = (req: any, res: Response, next: NextFunction) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(constants.code.preconditionFailed).json({
//         status: constants.status.statusFalse,
//         userStatus: req.status,
//         message: err.message,
//       });
//     } else if (err) {
//       return res.status(constants.code.preconditionFailed).json({
//         status: constants.status.statusFalse,
//         userStatus: req.status,
//         message: err.message,
//       });
//     }
 
//     // Access uploaded files using req.files
//     if (!req.files || req.files.length === 0) {
//       return res.status(constants.code.preconditionFailed).json({
//         status: constants.status.statusFalse,
//         userStatus: req.status,
//         message: 'No files uploaded.',
//       });
//     }
 
//     // Iterate through uploaded files
//     req.files.forEach((file:any) => {
//       console.log('Uploaded file:', file.originalname);
//     });
 
//     next();
//   });
// };
 
 
// export { handleProfileUpload };