import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Paged from './Paged';

export default function Home() {

    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds); // Esto es lo mismo que hacer el mapStateToProps()

    const [currentPage, setCurrentPage] = useState(1); // Pagina actual, comienza en 1
    const [breedsPerPage, setBreedsPerPage] = useState(8); // Cuantas razas tengo por página, en este caso 8
    const indexOfLastBreed = currentPage * breedsPerPage; // Indice de la ultima raza
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; // Indice de la primer raza
    const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed); // Razas que voy a tener en la pagina actual
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getBreeds());  // Hacer este dispatch, es lo mismo que hacer mapDisoatchToProps()
    }, [dispatch])              // Lo que se incluye dentro de [] es basicamente de lo que depende este useEffect en 
    // en el caso de no depender de nada, se lo pasa vacio.

    function handleClick(e) {
        e.preventDefault();
        dispatch(getBreeds()); // Recarga las razas al hacer click
    }
    return (
        <div>
            <Nav />
            <button onClick={(e) => handleClick(e)}>Recargar razas</button>
            <Paged breedsPerPage={breedsPerPage} allBreeds={allBreeds.length} paged={paged} />

            <div>
                {
                    currentBreeds && currentBreeds.map((e) => {
                        // Si es de la API
                        if (e.temperament) {
                            return (<Card name={e.name} image={e.image} temperament={e.temperament} key={e.id} />)
                        }
                        // Si es de la DB
                        else if (e.temperaments) {
                            let aux = e.temperaments[0].name;
                            for (let i = 0; i < e.temperaments.length; i++) {
                                aux = aux + ", " + e.temperaments[i].name;
                            }
                            return (<Card name={e.name} image={e.image} temperament={aux} key={e.id} />)
                        }
                        // Si es de la API sin temperamento
                        else {
                            return (<Card name={e.name} image={e.image} temperament={'no tengo personalidad'} key={e.id} />)
                        }

                    })
                }
            </div>
        </div>
    )
}