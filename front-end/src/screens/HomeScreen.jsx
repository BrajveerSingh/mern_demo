import { Row , Col } from 'react-bootstrap';
// import products from '../products'
import Product from '../components/Product';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';


const HomeScreen = () => {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, []);

    // const { data: products, isLoading, error } = useGetProductsQuery();

    const { pageNumber } = useParams();

    console.log("pageNumber=" + pageNumber);

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    return (
        // <>
        //   <h1>Latest Products</h1>
        //     <Row>
        //         {products.map((product) => (
        //             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        //                 <Product product={product} />
        //             </Col>
        //         ))}
        //     </Row>
        // </>
        <>
            { isLoading ? (
                <Loader />
            ) : error ? (
                            <Message variant='danger'>
                                { error?.data?.message || error.error }
                            </Message>
                        ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            ) }
        </>
    )
}

export default HomeScreen;