import express, { response } from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from '../backend/routes/productRoutes.js';

dotenv.config();

// const port = 5000;
const port = process.env.PORT || 5000;

connectDB();  //connet to Mongo DB

const app = express();

app.get("/", (request, response) => {
    response.send("API is running...");
});


app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`))