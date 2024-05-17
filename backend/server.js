import express, { response } from 'express';
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

dotenv.config();

// const port = 5000;
const port = process.env.PORT || 5000;

connectDB();  //connet to Mongo DB

const app = express();

app.get("/", (request, response) => {
    response.send("API is running...");
});

app.get("/api/products", (request, response) => {
    response.json(products);
});

app.get('/api/products/:id', (request, response)=>{
    const product = products.find((p) => p._id === request.params.id);
    response.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`))