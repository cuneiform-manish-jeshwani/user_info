import mongoose, {Model, Document} from "mongoose";

interface Userdata extends Document {
    email: string;
    password: string;
  }


const userSchema = new mongoose.Schema<Userdata>({

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

const User: Model<Userdata> = mongoose.model('auth', userSchema);

export { User,  Userdata };