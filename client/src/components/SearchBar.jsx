import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedByName } from '../actions/';
import style from './styles/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleOnChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        //name.replace(/^\w/, (c) => c.toUpperCase()
        dispatch(getBreedByName(name));
        setName('');
    }

    return (
        <div className={style.contenedor}>
            <input
                className={style.input}
                type="text"
                placeholder='Select breed...'
                value={name}
                onChange={(e) => handleOnChange(e)}
            />
            <button className={style.boton} type='submit' onClick={e => handleOnSubmit(e)}></button>
        </div>
    )
}