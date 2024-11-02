// src/components/input_form/input_form.js
import React, { useState } from 'react';
const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};
const InputForm = ({onSubmitIngredients}) => {
    const [inputValue, setInputValue] = useState(""); // Stores the current input value
    const [ingredientsArray, setIngredientsArray] = useState([]); // Starts with an empty array
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update inputValue with each keystroke

    };

    const addIngredient = async (e) => {
        //console.log("input ingredient inputValue", inputValue); 
        e.preventDefault();
        setErrorMessage("");
        const ingredient_data = await fetch_ingredient(inputValue);

        if (ingredient_data) {  // Ingredient exists
            setIngredientsArray((prevArray) => [...prevArray, ingredient_data]);
            setInputValue("");  // Clear the input
        }

        else {
            setErrorMessage("The ingredient is misspelled or does not exist.");
        }
    };

    const submitIngredients = () => {
        
        // Call the onSubmitIngredients prop with the ingredientsArray
        if (onSubmitIngredients) {
            onSubmitIngredients(ingredientsArray);
        }
    };

    const fetch_ingredient  = async (ingredient) => {
        const url = `https://the-cocktail-db.p.rapidapi.com/search.php?i=${ingredient}`;
        //const url = `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${ingredient}`;

        
        try {
            const response = await fetch(url, options);
            const result = await response.json()

            return result.ingredients[0].strIngredient
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={addIngredient}>
            <input type="text" value={inputValue} onChange={handleChange}/>
            <button type="submit">Add Ingredient</button>
            <div>
                <h3>Ingredients List:</h3>
                <ul>
                    {ingredientsArray.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <button type="button" onClick={submitIngredients}>
                    Submit Ingredients
                </button>             
            </div>
        </form>
        </div>
    );
};

export default InputForm;
