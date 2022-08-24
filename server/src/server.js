import {PORT, NODE_ENV, MONGO_URI} from './config'; // added
import { studentRouter } from './routes/routes';
import express from 'express';
import mongoose from 'mongoose';

(async () => {
    try {
        await mongoose.connect(MONGO_URI, {useNewURLParser:true});
        console.log('MongoDB Connected');
        
        const app = express();
        app.disable('x-powered-by'); //ap Hides what server is used from user.
        app.use(express.urlencoded({extended:true})); // a  uses the inbuilt express body parser
        app.use(express.json());//ap

        const appRouter = express.Router();
        app.use('/app',appRouter);
        appRouter.use('/student',studentRouter);

        app.listen(PORT,() =>{
            console.log(`Listening on port ${PORT}`)
        })


    } catch (err){
        console.log(err)
    }
})();

// appRouter.use('staff', staffRouter);
// appRouter.use('admin', adminRouter);





// app.use(cors())
// const dotenv = require('dotenv');
// const routerUrls = require('./routes/routes');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// dotenv.config()

// mongoose.connect(process.env.DATABASE_CONNECT,()=>{
//     console.log("Database connected")
// });