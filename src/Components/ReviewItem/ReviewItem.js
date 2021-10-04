import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemove }) => {
    //console.log(product);
    const { name, quantity, key, price } = product;
    return (
        <div className="container review-item">

            <h5>{name}</h5>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br />
            <button onClick={() => handleRemove(key)} className="btn btn-outline-primary ">Remove</button>

        </div>
    );
};

export default ReviewItem;