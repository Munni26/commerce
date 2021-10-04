import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = ({ product, handleClick, showAddToCart }) => {
    //console.log(product);
    const { img, name, seller, price, stock, key } = product;



    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-detail">
                <h6 className="product-name"><Link to={`/product/${key}`}>{name}</Link></h6>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p>Only {stock} available in stock</p>
                {showAddToCart === true && <button onClick={() => handleClick(product)} className="btn btn-outline-warning"><FontAwesomeIcon icon={faShoppingCart} />Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;