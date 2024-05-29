import express from "express";
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct ,
    createProductReview,
    getTopRatedProducts
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/top',getTopRatedProducts);  //must be defined before rout /:id

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin,deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);


export default router;