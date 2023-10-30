import express from "express"

//import { handleFileUpload } from '../middleware/multer'
import Auth from '../middleware/check-auth';
import{
    createUser,
   

} from "../controller/users"

const router = express.Router();

router.post("/",  createUser)


export default router;