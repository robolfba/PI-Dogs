import React from "react";

export default function Paged({ breedsPerPage, allBreeds, paged }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++) { // Define la cantidad de paginas
        pageNumber.push(i);
    }
    return (
        <div>
            <nav>
                <ul>
                    {pageNumber && pageNumber.map(number => {
                        return <li key={number}>
                            <button key={number} onClick={() => paged(number)}> {number} </button>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    )
}