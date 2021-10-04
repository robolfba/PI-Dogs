import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreedByName } from '../actions/';

export default function SearchBar() {
    const dispatch = useDispatch();
  //  const allBreeds = useSelector((state) => state.breeds); // Esto es lo mismo que hacer el mapStateToProps()

    useEffect(() => {
        dispatch(getBreedByName()); // Hacer este dispatch, es lo mismo que hacer mapDispatchToProps()
    }, [dispatch])

    const [name, setName] = useState('');

    const handleOnChange = (e) => {
        setName(
            [e.target.name] = e.target.value
        );
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        dispatch(getBreedByName(name));
        setName('');
    }
    return (
        <div>
            <input
                type="text"
                placeholder='Seleccionar raza'
                name='name'
                value={name}
                onChange={handleOnChange}
            />
            <button onClick={handleOnSubmit}>Buscar</button>
        </div>
    )
}