// src/views/HomePage.js
import React, { useState } from 'react';
import InputForm from '../components/input_form/input_form';
import SubmitButton from '../components/submit_button/submit_button';

const HomePage = () => {


    return (
        <div class="italiana-regular">
            <div class='text-7xl text-center'>
            <h1>Cocktail Generator</h1>
            </div>
            <SubmitButton/>
            
        </div>
    );
};

export default HomePage;
