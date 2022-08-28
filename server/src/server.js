const express = require("express");

import {userRouter} from './routes/userRouter';


const app = express();
// Hides the server details from the user(security)
app.disable('x-powered-by');
// Middleware
app.use(express.json());


