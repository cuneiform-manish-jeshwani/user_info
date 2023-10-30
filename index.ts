import express from 'express'

import mongoose from 'mongoose'

import {Admin} from "../User_info/src/model/superadmin"

import userRoutes from './src/route/user'

import authRoutes from './src/route/auth'

const app = express()

const port = 3000;

app.use(express.urlencoded({extended:false}))

app.use(express.json());



const superAdminData = [
  {
    firstname: 'Manish',
    lastname: 'Jeshwani',
    address: 'Ahmedabad',
    pincode: 382330,
    company_name: 'cuneiform',
  },
];


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/User_info');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection start');
});
Admin.insertMany(superAdminData);

app.use('/api/user', userRoutes)
app.use('/api/user', authRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  export{port}