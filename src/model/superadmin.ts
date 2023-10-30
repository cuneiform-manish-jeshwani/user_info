import mongoose, {Model, Document} from 'mongoose'

interface Admindata extends Document{

    firstname: string;
    lastname: string;
    address: string;
    pincode: number;
    company_name: string;
}

const userschema = new mongoose.Schema<Admindata>({

    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
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

const Admin: Model<Admindata> = mongoose.model('superadmin', userschema);

export{Admin, Admindata}