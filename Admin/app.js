import express from 'express'
import morgan from 'morgan'
import connect from './DB/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/adming.routes.js'


connect()

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true})) // read data from url
app.use(cookieParser());
app.use('/admin', adminRoutes);


export default app;