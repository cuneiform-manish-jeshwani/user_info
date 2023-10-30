
// import { Request, Response } from "express";
// import multer from 'multer';               
// import path from 'path';

// import { User, Userdata } from "../model/user";
// import {port} from '../../index'

// const profileStorage = multer.diskStorage({
//   destination: 'src/uploads/profile/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const audioStorage = multer.diskStorage({
//   destination: 'src/uploads/audio/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });


// const maxAudio = 5 * 1024 * 1024; 

// const uploadProfile = multer({
//   storage: profileStorage
 
// }).single('profile_picture');

// const uploadAudio = multer({
//   storage: audioStorage,
//   limits: {
//     fileSize: maxAudio,
//   },
// }).single('audio');




// // for create user
// export const createUser = (req: Request, res: Response) => {
//     uploadProfile(req, res, async (err) => {
//       //console.log(err)
//       if (err) {
//         return res.status(400).json({ error: 'Profile upload failed' });
//       }
//       //console.log(err)

  
//       // Handle audio file upload separately
//       uploadAudio(req, res, async (err) => {
//         if (err) {
//           return res.status(400).json({ error: 'Audio upload failed' });
//         }
//         try {
//             const { firstname, lastname, address, pincode, company_name } = req.body;
//             if (req.file) {
//               const profile_pictureFilename = req.file.filename;
//             const audioFile = req.file.filename;
      
      
//             const profile_picture = `${req.hostname}:${port}/api/user/${path.basename(profile_pictureFilename)}`;
//             if (audioFile.size > maxAudio) {
//               return res.status(400).json({ error: 'Audio file size not more than 5MB ' });
//             }
      
//             const audios = audioFile.filename;
           
//             const audio = `${req.hostname}:${port}/api/user/${path.basename(audios)}`;
      
//             const user: Userdata = await User.create({
//               firstname,
//               lastname,
//               profile_picture,
//               audio,
//               address,
//               pincode,
//               company_name,
//             });
      
//             res.status(201).json(user);
//           } catch (error) {
//             res.status(500).json({ error: 'Failed to create user' });
//           }
//       });
//     });
//   };





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




// // for find all user
// export const findUser = async(req:Request, res:Response)=>{

//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//       } catch (err) {
//         res.status(500).json({ error: err });
//       }
//     };



// // for update user
// // export const updateUser =async (req:Request, res:Response) => {

// //     const userId = req.params.id
    

// //     upload(req, res, async (err) => {
// //     if (err) {
// //       return res.status(400).json({ error: 'File upload failed' });
// //     }

// //     try {
// //       const { firstname, lastname, address, pincode, company_name } = req.body;
// //       const profile_pictureFilename = (req.files as { [fieldname: string]: Express.Multer.File[] })['profile_picture'][0].filename;
// //       const audiofile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];
// //       const profile_picture = `http:localhost:3000/api/user/${path.basename(profile_pictureFilename)}`;
// //       if (audiofile.size > maxaudio) {
// //         return res.status(400).json({ error: 'Audio file size not more than 5MB ' });
// //       }

// //       const audios = audiofile.filename;

// //       const audio = `http:localhost:3000/api/user/${path.basename(audios)}`

// //       const user = await User.updateOne({ id: userId }).set({
// //         firstname,
// //         lastname,
// //         profile_picture,
// //         audio,
// //         address,
// //         pincode,
// //         company_name,
// //       });
// //       res.status(201).json(user);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Failed to update user' });
// //     }
// //   });
    
// // }



// // for delete user
// export const deleteUser = async (req: Request, res: Response) => {
//     const userId = req.params.id;
//     try {
//       const deleteuser = await User.findByIdAndRemove(userId);
//       if (!deleteuser) {
//         res.status(404).json({ message: 'user not found' });
//       } else {
//         res.status(200).json({message: "user deleted successfully"});
//       }
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   };
