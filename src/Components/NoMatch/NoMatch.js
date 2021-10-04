import React from 'react';

const NoMatch = () => {
    const noMatchStyle = {
        color: 'red',
        textAlign: 'center'
    }
    return (
        <div style={noMatchStyle}>
            <h1>Sorry, page not found!!</h1>
            <h2>404!!!</h2>
        </div>
    );
};

export default NoMatch;