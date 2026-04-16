import express from 'express'
import morgan from 'morgan'
import connect from './db/db.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'

connect()  

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser()); 
app.use('/users', userRoutes);


export default app;