import React from 'react';

const IngredientsList = ({ results }) => {
    return (
        <div>
            <h2>Results:</h2>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <p key={index}>{result.strDrink}</p>  // Display cocktail name
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default IngredientsList;