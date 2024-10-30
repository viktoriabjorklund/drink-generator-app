// src/components/input_form/input_form.js
import React, { useState } from 'react';

const InputForm = ({ onInputChange, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onInputChange && onInputChange(e.target.value);  // Call onInputChange if provided
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit(inputValue);  // Call onSubmit if provided
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a cocktail name"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default InputForm;
