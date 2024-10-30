// src/views/HomePage.js
import React, { useState } from 'react';
import InputForm from '../components/input_form/input_form';
import SubmitButton from '../components/submit_button/submit_button';
import IngredientsList from '../components/ingredients_list/ingredients_list';

const HomePage = () => {
    const [submittedValue, setSubmittedValue] = useState(''); // State to hold the submitted input value

    const handleInputChange = (value) => {
        // This can be used if you want to manage the input value here
    };

    const handleSubmit = (value) => {
        setSubmittedValue(value); // Update the submitted value state
    };

    return (
        <div>
            <h1>Input Form</h1>
            <InputForm onInputChange={handleInputChange} onSubmit={handleSubmit} />
            <IngredientsList inputValue={submittedValue} /> {/* Pass submitted value as prop */}
        </div>
    );
};

export default HomePage;
