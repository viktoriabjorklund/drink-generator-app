// src/components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ onSubmit }) => {
    return (
        <button type="button" onClick={onSubmit}>
            Submit
        </button>
    );
};

export default SubmitButton;
