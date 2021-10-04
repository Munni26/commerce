import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import PlaceOrderImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    //console.log(cart);

    const [placeOrder, setPlaceOrder] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setPlaceOrder(true);
        processOrder();
        console.log('clicked');
    }

    const handleRemove = (productKey) => {
        //console.log('clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    //cart
    useEffect(() => {
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);

        // console.log(productKeys);
        // const counts = productKeys.map(key =>  savedCart[key]);
        // console.log(counts);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        //console.log(cartProducts);

    }, [])

    let thankYou;
    if (placeOrder) {
        thankYou = <img src={PlaceOrderImage} alt="" />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => {
                        return <ReviewItem handleRemove={handleRemove} product={pd} key={pd.key}></ReviewItem>
                    })
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn btn-outline-warning">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;