import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};

const InputForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [inputValue, setInputValue] = useState("");
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [results, setResults] = useState([]);

    // Load ingredients from URL when the component mounts
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ingredientsParam = urlParams.get("ingredients");
    
        if (ingredientsParam) {
            // Parse the ingredients from the URL
            const ingredientsArray = ingredientsParam.split(",");
            setIngredientsArray(ingredientsArray); // Set the ingredients state
    
            if (ingredientsArray.length > 0) {
                // Only fetch drinks if there are ingredients in the URL
                const query = ingredientsArray.join("%2C");
                const url = `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${query}`;
    
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        setResults(data.drinks || []); // If no drinks found, set to empty array
                    })
                    .catch(error => {
                        console.error("Error fetching drinks:", error);
                        setResults([]); // Set empty if error occurs
                    });
            } else {
                setResults([]); // Clear results if there are no ingredients
            }
        } else {
            setResults([]); // Clear results if there's no ingredients in the URL
        }
    }, [window.location.search]);

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
            const updatedIngredients = [...ingredientsArray, ingredient_data];
            setIngredientsArray(updatedIngredients);
            setInputValue("");

            // Update URL with new ingredients
            updateURL(updatedIngredients);
        } else if (checkDuplicates(ingredient_data)) {
            setErrorMessage("This ingredient already exists in the list.");
        } else {
            setErrorMessage("The ingredient is misspelled or does not exist.");
        }
    };



    const removeIngredient = (ingredientToRemove) => {
        const updatedIngredients = ingredientsArray.filter(ingredient => ingredient !== ingredientToRemove);
        setIngredientsArray(updatedIngredients);
    
        updateURL(updatedIngredients);
    
        if (updatedIngredients.length === 0) {
            setResults([]); 
            updateURL([]);
        }
    };

    const fetch_ingredient = async (ingredient) => {
        const url = `https://the-cocktail-db.p.rapidapi.com/search.php?i=${ingredient}`;
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result.ingredients ? result.ingredients[0].strIngredient : null;
        } catch (error) {
            console.error(error);
        }
    };

    const updateURL = (ingredients) => {
        const queryParams = new URLSearchParams();
        if (ingredients.length > 0) {
            queryParams.set("ingredients", ingredients.join(","));
        } else {
            queryParams.delete("ingredients");
        }
    
        navigate(`?${queryParams.toString()}`, { replace: true });
    };

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={addIngredient}>
                <div className="w-80 flex flex-col items-center text-center mx-auto mt-14">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleChange}
                        className="border-b border-gray-300 text-2xl text-center bg-transparent focus:outline-none focus:border-gray-500 mb-2"
                        placeholder="Enter ingredient"
                    />
                    <button 
                        type="submit" 
                        className="text-l mt-4 bg-[#BB3F3F] hover:bg-[#931F1F] text-white font-bold py-2 px-4 rounded"
                    >
                        Add Ingredient
                    </button>
                </div>
            </form>
            <div className='w-72 text-2xl flex flex-col mx-auto text-[rgb(76,75,68)]' style={{ marginTop: '35px' }}>
                <ul>
                    {ingredientsArray.map((ingredient, index) => (
                        <li key={index} className='mb-5 flex justify-between items-center w-full'>{ingredient}
                            <button 
                                onClick={() => removeIngredient(ingredient)}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            >
                                <svg className="svg-icon"  
                                    style={{
                                        width: '1em', 
                                        height: '1em',
                                        verticalAlign: 'middle',
                                        fill: '#4C4B44', 
                                        overflow: 'hidden'
                                    }}
                                    viewBox="0 0 1024 1024" 
                                    version="1.1" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M262.2 304.9h-4.8c0.8-0.1 1.6-0.1 2.4-0.1 0.8 0 1.6 0 2.4 0.1z" />
                                    <path d="M589.4 358.4c0 15.2 12.3 27.5 27.4 27.5h25.8c15.2 0 27.5-12.3 27.5-27.4 0-15.2-12.3-27.4-27.5-27.4h-25.8c-15.1-0.1-27.4 12.2-27.4 27.3zM616.3 850.4c15.2 0.6 27.9-11.3 28.4-26.4l0.9-351c0.6-15.2-11.3-27.9-26.4-28.4-15.2-0.6-27.9 11.3-28.4 26.4l-0.9 351c-0.6 15.1 11.3 27.9 26.4 28.4zM457.1 822l-0.9-351c-0.6-15.2-13.3-27-28.4-26.4-15.1 0.6-27 13.3-26.4 28.4l0.9 351c0.6 15.1 13.3 27 28.4 26.4 15.1-0.5 27-13.3 26.4-28.4z" />
                                    <path d="M826.5 358.3l-1.7 27.6-27.9 502.4-0.4 6.9c0 24.5-19.6 44.4-43.9 45H272.1c-24.3-0.6-43.9-20.6-43.9-45l-0.4-6.8L200 385.9l-1.7-27.6v-0.3c0.2-14.2 11.1-25.8 25.1-27H518c15.2 0 27.5 12.3 27.5 27.4 0 15.2-12.3 27.4-27.5 27.4H255l22.5 405.8 4.9 79.3 0.5 7.9 0.4 6.7h458.4l0.4-6.7 0.5-7.9 4.9-79.3L770 385.8h-28.3c-15.2 0-27.4-12.3-27.4-27.4 0-15.2 12.3-27.4 27.4-27.4h59.8c14 1.2 25 12.9 25.1 27.1-0.1 0.1-0.1 0.1-0.1 0.2zM475.2 143.2l-4.6-27c-2.5-14.9 7.5-29.1 22.5-31.7C508 82 522.2 92 524.8 107l4.6 27c2.5 14.9-7.5 29.1-22.5 31.7-15 2.5-29.2-7.5-31.7-22.5z" />
                                    <path d="M792.6 150.4l-560.5 95.4c-14.9 2.5-29.1-7.5-31.7-22.5-2.5-14.9 7.5-29.1 22.5-31.7l560.5-95.4c14.9-2.5 29.1 7.5 31.7 22.5 2.5 14.9-7.5 29.1-22.5 31.7z" />
                        
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>            
        </div>
    );
};

export default InputForm;
