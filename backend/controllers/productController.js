import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";

// // @desc   Fetch all products
// // @route  GET /api/products
// // @access Public
// const getProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
// });

// @desc   Fetch products using pagination
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword 
                    ? { name: { $regex: req.query.keyword, $options: 'i'} }  // i is used to use case insensitive keyword
                    : {  }
    const count = await Product.countDocuments({ ...keyword });  //docuemnts matching keyword if keyword is passed in request


    const products = await Product.find({ ...keyword })  // find prodcuts for matching keyword if it is passed in the request
                                  .limit(pageSize)
                                  .skip(pageSize * (page - 1));
    
    res.json({ products, page, pages: Math.ceil(count/pageSize) });
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

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    }
    res.status(404);
    throw new Error("Product not found.");
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(product) {
       await Product.deleteOne({ _id: product._id });
       res.status(200).json('No content');
    }
    res.status(404);
    throw new Error("Product not found.");
});

// @desc   Create a new review
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
       const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
       );

       if(alreadyReviewed){
            res.status(400);
            throw new Error("Prodcut is already reviewed");
       }

       const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
       };

       product.reviews.push(review);

       product.numReviews = product.reviews.length;

       product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

       await product.save();

       res.status(201).json({
        message: 'Review is added'
       });

    }
    res.status(404);
    throw new Error("Product not found.");
});

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3); //sort by rating
    console.log(products);
    res.status(200).json(products);
});

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopRatedProducts};