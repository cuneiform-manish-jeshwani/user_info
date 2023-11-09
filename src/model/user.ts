import mongoose, {Model, Document} from 'mongoose'

interface Userdata extends Document{

    firstname: string;
    lastname: string;
    //profile_data: String;
   image:string
    audio: string;
    address: string;
    pincode: number;
    company_name: string;
}

const userschema = new mongoose.Schema<Userdata>({

    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    },

    image:{
        type:String,
        
    },

  
    audio:{
        type:String,
        
    },

    address:{
        type:String,
        required:true
    },

    pincode:{
        type:Number,
        required:true
    },

    company_name:{
        type:String,
        required:true
    }

})

const User: Model<Userdata> = mongoose.model('user', userschema);

export{User, Userdata}