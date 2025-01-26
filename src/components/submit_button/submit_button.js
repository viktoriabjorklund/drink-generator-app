import React, { useState, useEffect } from 'react';
import InputForm from '../input_form/input_form';
import CocktailsList from '../cocktails_list/cocktails_list';
import { useNavigate, useLocation } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
};

const SubmitButton = () => {
    const [ingredients, setIngredients] = useState([]);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlIngredients = urlParams.get('ingredients');

        if (urlIngredients) {
            const ingredientsArray = urlIngredients.split(',');
            setIngredients(ingredientsArray);
            fetchDrinks(ingredientsArray);
        } else {
            const savedIngredients = JSON.parse(localStorage.getItem('ingredients')) || [];
            if (savedIngredients.length > 0) {
                setIngredients(savedIngredients);
                fetchDrinks(savedIngredients);
            }
        }
    }, [location.search]);

    const fetchDrinks = async (ingredientsArray) => {
        if (ingredientsArray.length === 0) return;

        const query = ingredientsArray.join(",");
        const url = `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${query}`;
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setResults(data.drinks || []);
        } catch (error) {
            console.error("Error fetching drinks:", error);
        }
    };


    const removeIngredient = (ingredientToRemove) => {
        const newIngredients = ingredients.filter(item => item !== ingredientToRemove);
        setIngredients(newIngredients);
        localStorage.setItem('ingredients', JSON.stringify(newIngredients));
        navigate(`?ingredients=${newIngredients.join(',')}`);
        fetchDrinks(newIngredients);
    };

    return (
        <div>
            <InputForm ingredients={ingredients} removeIngredient={removeIngredient} />
            <CocktailsList results={results} />
        </div>
    );
};

export default SubmitButton;
