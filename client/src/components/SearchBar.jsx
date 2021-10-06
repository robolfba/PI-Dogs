import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedByName } from '../actions/';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleOnChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getBreedByName(name));
        setName('');
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Select breed...'
                value={name}
                onChange={(e) => handleOnChange(e)}
            />
            <button type='submit' onClick={e => handleOnSubmit(e)}>Buscar</button>
        </div>
    )
}