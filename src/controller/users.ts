import { Request, Response } from "express";
import multer from 'multer';               
import path from 'path';

import { User, Userdata } from "../model/user";
import {port} from '../../index'


const audioStorage = multer.diskStorage({
  destination: 'src/uploads/audio/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  },
});

const profileStorage = multer.diskStorage({
    destination: 'src/uploads/profile/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
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
  }).single('profile_picture');



// for create user
export const createUser = (req: Request, res: Response) => {
    // Handle audio file upload first
    uploadAudio(req, res, async (audioUploadError) => {
      if (audioUploadError) {
        console.error(audioUploadError);
        return res.status(400).json({ error: 'Audio upload failed' });
      }
  
      // Handle profile file upload after audio upload is complete
      
  
        try {
          const { firstname, lastname, address, pincode, company_name } = req.body;
  
          const audioFile = req.file; // Use req.file for audio
          const profileFile = req.file; // Use req.file for profile

            if (!audioFile || !profileFile) {
          return res.status(400).json({ error: 'Both profile and audio files are required' });
        }
  
          const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;
          const profile = `http://${req.hostname}:${port}/api/user/profile/${path.basename(profileFile.filename)}`;
  
          const user: Userdata = await User.create({
            firstname,
            lastname,
            address,
            pincode,
            company_name,
            audio,
            profile,
          });
  
          console.log(user);
          res.status(201).json(user);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create user' });
        }
      });
    ;
  };





// // import { Request, Response } from 'express';
// // import { User, Userdata } from '../model/user';
// // import { handleFileUpload } from '../middleware/multer';
// // import path from 'path';;
// // import {port} from '../../index'

// // const maxAudio = 5 * 1024 * 1024;  
// // const maxProfile = 2 * 1024 * 1024;


// // export const createUser = (req: Request, res: Response) => {
// //   handleFileUpload(req, res, async (err) => {
// //     if (err) {
// //       return res.status(400).json({ error: 'File upload failed' });
// //     }
    
// //     try {
// //       const { firstname, lastname, address, pincode, company_name } = req.body;

// //       if (!req.file || !req.file.size) {
// //         return res.status(400).json({ error: 'No file uploaded' });
// //       }

// //       const audioFile = req.file;
// //       const profileFile = req.file;

// //       if (audioFile.size > maxAudio) {
// //         return res.status(400).json({ error: 'Audio file size should not exceed 5MB' });
// //       }

// //       const audios = audioFile.filename;
// //       const audio = `${req.hostname}:${port}/api/user/audio/${path.basename(audios)}`;

// //       if (profileFile.size > maxProfile) {
// //         return res.status(400).json({ error: 'Profile file size should not exceed 2MB' });
// //       }

// //       const profiles = profileFile.filename;
// //       const profile = `${req.hostname}:${port}/api/user/profile/${path.basename(profiles)}`;
// //       console.log(profile)
// //       console.log(audio)

// //       const user: Userdata = await User.create({
// //         firstname,
// //         lastname,
// //         address,
// //         pincode,
// //         company_name,
// //         audio,
// //         profile,
// //       });
// //       console.log(user)

// //       res.status(201).json(user);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Failed to create user' });
// //     }
// //   });
// // };

