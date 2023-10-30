import { Request, Response, NextFunction } from 'express';
import * as  jwt from 'jsonwebtoken'

export default async (req: Request|any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Auth failed" });
        }
        //console.log(token)
        const decoded: any = jwt.verify(token, "secret" );


            req.userData = decoded;
             next();
  } 

 catch (err) {
      return res.status(401).json({ message: 'Auth failed' });
 }  
}