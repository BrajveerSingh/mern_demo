import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc   Fetch a product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   const product = new Product({
        name: 'smaple name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'smaple brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description',
   });

   const createdProduct = await product.save();

   res.status(201).json(createdProduct);

});

export {getProducts, getProductById, createProduct};