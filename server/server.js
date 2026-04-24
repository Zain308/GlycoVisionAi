import dotenv from 'dotenv';
import path from 'path';

// 1. THIS MUST BE THE FIRST LINE OF CODE EXECUTED
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

// 2. Now import everything else
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send("GlycoVision API is running..."));

app.listen(port, () => console.log(`Server started on PORT: ${port}`));


