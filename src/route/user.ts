import express from "express"

//import { handleFileUpload } from '../middleware/multer'
import Auth from '../middleware/check-auth';
import{
    createUser,
    findUser,
    updateUser,
    deleteUser
   

} from"../controller/use"

const router = express.Router();

router.post("/",  createUser)

router.get("/", findUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router;