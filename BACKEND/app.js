import express from 'express'
import morgan from 'morgan'
import connect from './db/db.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'

connect()  // connecting database.

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser()); 
app.use('/users', userRoutes);



export default app;