import React from 'react';
import DetailsPage from '../../views/details_page';
import { useState } from 'react';
const API_KEY = process.env.REACT_APP_DRINK_GENERATOR_API_KEY;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY,
		'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
	}
};
const CocktailsList = ({ results }) => {
    const [Drink_details, setDrink_details] = useState([]);

    const inspectDrink = async (idDrink) => {
        console.log("ingredient_id", idDrink);
        const url = `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${idDrink}`;
        try {
            const response = await fetch(url, options);
            console.log("url", url);
            const result = await response.text();
            setDrink_details(result)
        } catch (error) {
            console.error(error);
        }
    };

    return (
            <div className='items-center'>
                {typeof results === 'object' && results.length > 0 ? (
                    <>
                        <div className='flex flex-wrap gap-8 ml-20 mt-16 mb-16'

                        >
                            {results.map((result, index) => (
                                <div key={index} className="w-40 flex flex-col items-center transform transition-transform duration-200 hover:scale-110"
                                onClick={() => inspectDrink(result.idDrink)}
                                >
                                    <img
                                        src={result.strDrinkThumb}
                                        alt="Drink image"
                                        className="w-40 h-40 rounded-lg border-[#BB3F3F]"
                                    />
                                    <p className="mt-2 text-center text-l text-gray-800 break-words w-full">{result.strDrink}</p>
                                </div>
                            ))}
                        </div>

                        <div class="signatur text-center">
                            Developed by Viktoria Björklund
                        </div>
                    </>
                ) : results === 'None Found' ? (
                    <p className='text-2xl'>No results found</p>
                ) : null}
        <div>
            <DetailsPage drink_details={Drink_details}/>
    
        </div>
            </div>
    );
};

export default CocktailsList;