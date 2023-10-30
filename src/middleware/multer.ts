import { Request, Response, NextFunction } from 'express';
import { uploadAudio, uploadProfile } from '../helper/multer';

export const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
  uploadAudio(req, res, (audioErr) => {
   
    if (audioErr) {
      return res.status(400).json({ error: 'Audio upload failed' });
    }
    uploadProfile(req, res, (profileErr) => {
      if (profileErr) {
        return res.status(400).json({ error: 'Profile upload failed' });
      }
      next(); 
    });
  });
};