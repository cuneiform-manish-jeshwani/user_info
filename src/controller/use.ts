import { Request, Response } from "express";
import multer from 'multer';
import path from 'path';
import { handleUpload } from '../middleware/multer';
import { User, Userdata } from "../model/user";
import { port } from '../../index';


// for create user
export const createUser = (req: Request, res: Response) => {
    handleUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Uploads failed' });
        }

        try {
            const { firstname, lastname, address, pincode, company_name } = req.body;

            const imageFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['image'][0];
            const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

            const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;
            const image = `http://${req.hostname}:${port}/api/user/profile/${path.basename(imageFile.filename)}`;

            const user: Userdata = await User.create({
                firstname,
                lastname,
                address,
                pincode,
                company_name,
                audio,
                image,
            });

            console.log(user);
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    });
};

// for find all user
export const findUser = async (req: Request, res: Response) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


// for update user

export const updateUser = async (req: Request, res: Response) => {

    const userId = req.params.id

    handleUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Uploads failed' });
        }

        try {
            const { firstname, lastname, address, pincode, company_name } = req.body;

            const imageFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['image'][0];
            const audioFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['audio'][0];

            const audio = `http://${req.hostname}:${port}/api/user/audio/${path.basename(audioFile.filename)}`;
            const image = `http://${req.hostname}:${port}/api/user/profile/${path.basename(imageFile.filename)}`;


            const user = await User.updateOne({ id: userId }).set({
                firstname,
                lastname,
                address,
                pincode,
                company_name,
                audio,
                image,
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    });

}

// for delete user

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const deleteuser = await User.findByIdAndRemove(userId);
      if (!deleteuser) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.status(200).json({message: "user deleted successfully"});
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };









