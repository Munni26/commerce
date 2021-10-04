import React from 'react';
import { Link } from 'react-router-dom';


const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);

    // const productPrice = cart.reduce((sum, cart) => sum + cart.price, 0)

    let productPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        productPrice = productPrice + product.price * product.quantity
    }

    // const shipping = cart.reduce((sum, cart) => sum + cart.shipping, 0)

    let shipping = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        shipping = shipping + product.shipping
    }
    const tax = (productPrice / 10).toFixed(2)

    const totalPrice = (productPrice + shipping + Number(tax)).toFixed(2);

    const formatNumber = (num) => {
        const pricision = num.toFixed(2);
        return Number(pricision);
    }
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(productPrice)}</p>
            <p>Shipping Cost:{formatNumber(shipping)} </p>
            <p>Tax: {tax}</p>
            <p>Total: {totalPrice}</p>
            {
                props.children
            }
            {/* <Link to="/order-review">
                <button className="btn btn-outline-primary">Review Order</button>
            </Link> */}
        </div>
    );
};

export default Cart;