// src/components/input_form/input_form.js
import React, { useState, useEffect } from 'react';
const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};
const InputForm = ({onSubmitIngredients}) => {
    const [inputValue, setInputValue] = useState("");
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);

    };

    const checkDuplicates = (ingredient) => {
        return ingredientsArray.includes(ingredient);
    };

    const addIngredient = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const ingredient_data = await fetch_ingredient(inputValue);

        if (ingredient_data && !checkDuplicates(ingredient_data)) { 
            setIngredientsArray((prevArray) => [...prevArray, ingredient_data]);
            setInputValue("");
        }
        else if (checkDuplicates(ingredient_data)) {
            setErrorMessage("This ingredient already exists in the list.");
        }

        else {
            setErrorMessage("The ingredient is misspelled or does not exist.");
        }
    };

    const removeIngredient = (ingredientToRemove) => {
        setIngredientsArray((prevArray) =>
            prevArray.filter(ingredient => ingredient !== ingredientToRemove)
        );
    };

    const submitIngredients = () => {
        
        if (onSubmitIngredients) {
            onSubmitIngredients(ingredientsArray);
        }
    };

    const fetch_ingredient  = async (ingredient) => {
        const url = `https://the-cocktail-db.p.rapidapi.com/search.php?i=${ingredient}`;
        
        try {
            const response = await fetch(url, options);
            const result = await response.json()

            return result.ingredients[0].strIngredient
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-1/2 mx-auto'>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={addIngredient}>
        <div className="flex flex-col items-center text-center">
            
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange}
                className="border-b border-gray-300 text-2xl text-center bg-transparent focus:outline-none focus:border-gray-500 mb-2" // Add margin-bottom for spacing
                placeholder="Enter ingredient"
            />
            
            <button 
                type="submit" 
                className="mt-4 bg-[#BB3F3F] hover:bg-[#931F1F] text-white font-bold py-2 px-4 rounded"
            >
                Add Ingredient
            </button>
            </div>
            </form>
            <div className='text-2xl'>
                <ul>
                    {ingredientsArray.map((ingredient, index) => (
                        <li key={index} className='text-gray-700'>{ingredient}
                        
                        <button
                            style={{ marginLeft: '10px' }}
                            onClick={() => removeIngredient(ingredient)}>
                            Delete
                        </button>
                        </li>
                    ))}
                </ul>
                </div>
                <button type="button" 
                onClick={submitIngredients}
                className="mt-4 bg-[#BB3F3F] hover:bg-[#931F1F] text-white font-bold py-2 px-4 rounded">
                    Submit Ingredients
                </button>             
            
        </div>
            

    );
};

export default InputForm;
