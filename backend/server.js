import express, { response } from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from '../backend/routes/productRoutes.js';
import userRoutes from '../backend/routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// const port = 5000;
const port = process.env.PORT || 5000;

connectDB();  //connet to Mongo DB

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser middleware
app.use(cookieParser());  //page doesn't load if we use cookieParser instead of cookieParser()

app.get("/", (request, response) => {
    response.send("API is running...");
});


app.use("/api/products", productRoutes);

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))