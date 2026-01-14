import express from 'express';
import cors from 'cors';
import planRouter from '../src/routes/plan.router.js';
import userRouter from '../src/routes/user.router.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';

const app = express();

app.use(cookieParser());

const allowedOrigins = [
  "https://planify-chi.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json(
    {
        limit : '50mb'
    }
));

app.use(express.urlencoded({
    limit : '50mb',
    extended : true
}));

app.use(express.static('public'));

app.use('/planify/v1/plans' , planRouter );
app.use('/planify/v1/users' , userRouter );

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


export {app} ;