import express from 'express';
import dotenv from 'dotenv';
import userRouters from './routers/userRouter.js'
import adminRoutes from './routers/adminRouter.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'


dotenv.config();
const port = process.env.PORT || 5000; 
connectDB();
const app = express()




//CORS SETUP
const corsOptions = {
    origin: ["http://localhost:3000","https://muhammedansar.online","https://www.muhammedansar.online"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',userRouters)
app.use('/api/admin',adminRoutes)


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})