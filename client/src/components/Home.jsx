import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';

export default function Home() {
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds); // Esto es lo mismo que hacer el mapStateToProps()

    useEffect(() => {
        dispatch(getBreeds()); // Hacer este dispatch, es lo mismo que hacer mapDisoatchToProps()
    }, [dispatch]) // Lo que se incluye dentro de [] es basicamente de lo que depende este useEffect (en este caso es un ComponentDidMount), en 
    // en el caso de no depender de nada, se lo pasa vacio.

    function handleClick(e) {
        e.preventDefault();
        dispatch(getBreeds()); // Recarga las razas al hacer click
    }
    return (
        <div>
            <Nav />
            <button onClick={(e) => handleClick(e)}>Recargar razas</button>
            <div>
                {/* <select>
                    <option value='asc'>Asc</option> 
                    <option value='desc'>Desc</option>
                </select> */}
                {
                    allBreeds && allBreeds.map((e) => {
                        return (
                            // <Link to={'/dogs/' + e.id}>
                            <Card name={e.name} image={e.image} temperaments={e.temperaments} key={e.id} />
                            // </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}