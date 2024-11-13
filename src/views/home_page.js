// src/views/HomePage.js
import React, { useState } from 'react';
import InputForm from '../components/input_form/input_form';
import SubmitButton from '../components/submit_button/submit_button';
import '../style.css';

const HomePage = () => {

    return (
        <div class="italiana-regular">
            <div class='italiana-regular_h text-center mt-16 text-[#BB3F3F]'>
            <h1>Cocktail Generator</h1>
            </div>
            <SubmitButton/>
            
        </div>
    );
};

export default HomePage;
