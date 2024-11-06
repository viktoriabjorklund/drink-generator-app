import React from 'react';

const CocktailsList = ({ results }) => {
    console.log("reslts", results);

    return (
            <div className='items-center'>
                {typeof results === 'object' && results.length > 0 ? (
                    <>
                        <div className='flex flex-wrap gap-8 ml-20 mt-16 mb-16'>
                            {results.map((result, index) => (
                                <div key={index} className="w-40 flex flex-col items-center transform transition-transform duration-200 hover:scale-110">
                                    <img
                                        src={result.strDrinkThumb}
                                        alt="Drink image"
                                        className="w-40 h-40 rounded-lg border-[#BB3F3F]"
                                    />
                                    <p className="mt-2 text-center text-l text-gray-800 break-words w-full">{result.strDrink}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : results === 'None Found' ? (
                    <p className='text-2xl'>No results found</p>
                ) : null}
            </div>
    );
};

export default CocktailsList;