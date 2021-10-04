import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    const first20 = fakeData.slice(0, 20)
    const [product, setProduct] = useState(first20);
    //console.log(fakeData);
    const [cart, setCart] = useState([])
    //console.log(cart);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey];
            return product;
            //console.log(existingKey, savedCart[existingKey])
        })
        setCart(previousCart);
        //console.log(previousCart);
    }, [])

    const handleClick = (product) => {



        console.log('clicked', product);
        const toBeAddedKey = product.key;

        const sameProduct = cart.find(pd => pd.key === product.key)
        //console.log(sameProduct);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;

            sameProduct.quantity = count;
            console.log(count)
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            console.log(others)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];

        }

        setCart(newCart);
        addToDatabaseCart(product.key, count)

    }

    return (
        <div className="twin-container">
            <div className="product-container">

                {
                    product.map(pd => {
                        return <Product handleClick={handleClick} showAddToCart={true} product={pd} key={pd.key}></Product>

                    })
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order-review">
                        <button className="btn btn-outline-primary">Review Order</button>
                    </Link>
                </Cart>
            </div >
        </div >
    );
};

export default Shop;