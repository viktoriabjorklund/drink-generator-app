import React, { useState } from 'react';
import InputForm from '../input_form/input_form';
import CocktailsList from '../cocktails_list/cocktails_list';

const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};

const SubmitButton = () => {
    const [results, setResults] = useState([]);

    const handleSubmit = async (ingredientsArray) => {
        const query = ingredientsArray.join("%2C"); // Join the ingredients with "%2C" as the separator
        const url = `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${query}`;
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setResults(data.drinks);
        } catch (error) {
            console.error("Error fetching data:", error);
            console.log("results", setResults);
        }
    };

    return (
        <div>
            <InputForm onSubmitIngredients={handleSubmit}/>
            <CocktailsList results={results} />
    
        </div>
    );
};

export default SubmitButton;
