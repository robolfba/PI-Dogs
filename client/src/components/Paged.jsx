import React from "react";
import style from './styles/Paged.module.css';

export default function Paged({ breedsPerPage, allBreeds, paged }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++) { // Define la cantidad de paginas
        pageNumber.push(i);
    }
    return (
        <div>
            <nav>
                <ul className={style.contenedor} >
                    {pageNumber && pageNumber.map(number => {
                        return <li className={style.elemento} key={number}>
                            <button className={style.boton} key={number} onClick={() => paged(number)}> {number} </button>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    )
}