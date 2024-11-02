import React from 'react';

const CocktailsList = ({ results }) => {
    console.log("renderings resultat", results);


    return (
        <div>
            <h2>Results:</h2>
            {typeof results === 'object' ? (
                results.map((result, index) => (
                    <p key={index}>{result.strDrink}</p>  // Display cocktail name
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default CocktailsList;