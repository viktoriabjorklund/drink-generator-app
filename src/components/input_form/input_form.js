// src/components/InputForm.js
import React, { useState } from 'react';

const InputForm = ({ onInputChange, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onInputChange(newValue); // Notify parent of the new input value
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        onSubmit(inputValue); // Pass the input value to the parent on submit
        setInputValue(''); // Optionally clear the input field after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputForm;
