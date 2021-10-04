import React from 'react';
import { Link } from 'react-router-dom';
import HomePic from '../../images/ecommerce-websites-in-Bangladesh.jpg';
import './Home.css';

const Home = () => {

    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-8 pt-5 ">
                    <img className="img-fluid" src={HomePic} alt="" />
                </div>
                <div className="col-md-4">
                    <Link to="/shop">
                        <button className="btn btn-outline-primary button">Go For Shopping</button>
                    </Link>
                </div>
            </div>
        </div>
    );


};

export default Home;