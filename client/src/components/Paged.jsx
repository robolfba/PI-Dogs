import React from "react";

export default function Paged({ breedsPerPage, allBreeds, paged }) {
    const pageNumber = [];
    for (let i = 0; i <= Math.ceil(allBreeds / breedsPerPage); i++) { // Define la cantidad de paginas
        pageNumber.push(i + 1);
    }
    return (
        <div>
            <nav>
                <ul>
                    {pageNumber && pageNumber.map(number => {
                        <li key={number}>
                            <a href='' onClick={() => paged(number)}> {number} </a>
                        </li>
                    })}
                </ul>
            </nav> 
        </div>
    )
}