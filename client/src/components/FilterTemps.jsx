import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, filterBreeds, orderByName, getTemperaments, filterTemperaments, orderByWeight } from '../actions';
import style from './styles/Home.module.css';

export default function FilterTemps() {
    const dispatch = useDispatch(); // Esto es lo mismo que hacer mapDispatchToProps()
    const allTemperaments = useSelector((state) => state.temperaments); // Esto es lo mismo que hacer el mapStateToProps()

    useEffect(() => {
        // dispatch(getBreeds());
        dispatch(getTemperaments());
    }, [dispatch])

    function handleFilterTemperaments(e) {
        e.preventDefault();
        console.log('filterTemperaments(e.target.value)-->', e.target.value);
        dispatch(filterTemperaments(e.target.value));
    }

    return (
        <div>
            <select className={style.filtro_temperamento} onChange={e => handleFilterTemperaments(e)} >
                <option value='AllTemperaments'>All temperaments</option>
                {
                    allTemperaments && allTemperaments.map(e => {
                        return <option value={e.name} key={e.id}>{e.name}</option>
                    })
                }
            </select>
        </div>
    )
}