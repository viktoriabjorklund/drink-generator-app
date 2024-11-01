// src/components/input_form/input_form.js
import React, { useState } from 'react';

const InputForm = ({onSubmitIngredients}) => {
    const [inputValue, setInputValue] = useState(""); // Stores the current input value
    const [ingredientsArray, setIngredientsArray] = useState([]); // Starts with an empty array

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update inputValue with each keystroke
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add the inputValue to ingredientsArray and clear the input
        if (inputValue.trim()) {
            setIngredientsArray((prevArray) => [...prevArray, inputValue]);
            setInputValue("");
        }
    };

    const submitIngredients = () => {
        
        // Call the onSubmitIngredients prop with the ingredientsArray
        if (onSubmitIngredients) {
            onSubmitIngredients(ingredientsArray);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
};

export default InputForm;
