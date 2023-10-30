import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



import {User, Userdata} from '../model/auth'

export const signup = async(req:Request, res: Response) => {

    const {email, password} = req.body

    try{

        const user: Userdata | null =  await User.findOne({email})

        if(user){
            return res.status(401).json({ message: 'Email already exists' });
        }
         
        const hash: string = await bcrypt.hash(password, 10)

        const newuser:Userdata = await User.create({email, password:hash})

        return res.json({
            user: newuser,
            success: true,
            message: 'User created successfully',
          });
    }
    catch{

        return res.status(500).json({ success: false, message: 'err' });

    }
}

export const login = async(req:Request, res:Response)=>{

 const {email, password} = req.body

 try{

    const user: Userdata | null = await User.findOne({email})

    if(!user){
        return res.status(404).json({message: "user not found"})

    }
      
    const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const payload = {
        id: user._id,
        email: user.email
      }

      const token: string = jwt.sign(payload,  "secret", {
        expiresIn: '1h',
      }
      )
      await User.updateOne({ _id: user._id }, { token: token });

      res.status(200).json({ message: 'Login successful', token: token })

 }
 catch(err){

    res.status(500).json({ error: err });

 }

}