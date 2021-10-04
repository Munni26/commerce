import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import "./ProductDetail.css";

const ProductDetail = () => {
    const { key } = useParams();
    const product = fakeData.find(product => product.key === key)
    //console.log(product);

    const history = useHistory();

    const handleClick = () => {
        history.push("/shop")
    }


    return (
        <div className="twin-container">
            <div className="product-container">
                <h1>KEY:{key}</h1>

                <Product showAddTocart={false} product={product}></Product>

            </div>
            <div className="cart-container">
                <button className="btn btn-outline-primary pdButton" onClick={handleClick}>Back to Shop</button>
            </div>
        </div>
    );
};

export default ProductDetail;