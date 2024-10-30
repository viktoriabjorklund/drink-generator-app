// src/views/HomePage.js
import React, { useState } from 'react';
import InputForm from '../components/input_form/input_form';
import SubmitButton from '../components/submit_button/submit_button';
import IngredientsList from '../components/ingredients_list/ingredients_list';

const BASE_URL = "https://the-cocktail-db.p.rapidapi.com";
const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};

const HomePage = () => {
    const [results, setResults] = useState([]);  // State to hold API results

    const handleSubmit = async (value) => {
        const url = `${BASE_URL}/search.php?s=${value}`;
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();  // Assuming API returns JSON
            setResults(data.drinks || []);  // Extract drinks array or set empty array if null
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]);  // Clear results on error
        }
    };

    return (
        <div>
            <h1>Input Form</h1>
            <InputForm onSubmit={handleSubmit} />
            <IngredientsList results={results} />  {/* Pass API results as prop */}
        </div>
    );
};

export default HomePage;
