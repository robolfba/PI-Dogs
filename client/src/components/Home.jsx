import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, filterBreeds, orderByName, getTemperaments,filterTemperaments } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Paged from './Paged';

export default function Home() {

    const dispatch = useDispatch(); // Esto es lo mismo que hacer mapDispatchToProps()
    const allBreeds = useSelector((state) => state.breeds); // Esto es lo mismo que hacer el mapStateToProps()
    const allTemperaments = useSelector((state) => state.temperaments); // Esto es lo mismo que hacer el mapStateToProps()

    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Pagina actual, comienza en 1
    const [breedsPerPage, setBreedsPerPage] = useState(8); // Cuantas razas tengo por página, en este caso 8
    const indexOfLastBreed = currentPage * breedsPerPage; // Indice de la ultima raza
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; // Indice de la primer raza
    const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed); // Razas que voy a tener en la pagina actual
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getBreeds());
        dispatch(getTemperaments());
    }, [dispatch])              // Lo que se incluye dentro de [] es basicamente de lo que depende este useEffect en 
    // en el caso de no depender de nada, se lo pasa vacio.

    function handleClick(e) {
        e.preventDefault();
        dispatch(getBreeds()); // Recarga las razas
    }

    function handleFilterBreeds(e) {
        dispatch(filterBreeds(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // Modifico la pagina actual
        setOrden(`Ordenado ${e.target.value}`) // Al modificar el estado local, se vuelve a renderizar
    }

    function handleFilterTemperaments(e) {
        dispatch(filterTemperaments(e.target.value));
    }

    return (
        <div>
            <Nav />
            <button onClick={e => handleClick(e)}>Recargar razas</button>

            {/* //------------------------------------------------------------- Filtrados */}
            {/* // Filtro por raza */}
            <select onChange={e => handleFilterBreeds(e)}>
                <option value='AllBreeds'>All breeds</option>
                <option value='Created'>Created</option>
                <option value='Existing'>Existing</option>
            </select>

            {/* // Filtro por temperamento */}
            <select onChange={e=> handleFilterTemperaments(e)} >
                <option value='AllTemperaments'>All temperaments</option>
                {
                    allTemperaments && allTemperaments.map(e => {
                        return <option value={e.name} key={e.id}>{e.name}</option>
                    })
                }
            </select>

            {/* //------------------------------------------------------------- Ordenados */}
            {/* // Orden alfabetico */}
            <select onChange={e => handleOrderByName(e)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>

            {/* // Orden por peso */}
            <select>
                <option value='MenorMayor'>Menos a mas peso</option>
                <option value='MayorMenor'>Mas a menos peso</option>
            </select>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div>
                {currentBreeds && currentBreeds.map((e) => {
                    if (e.temperament) { // Si es de la API
                        return (<Card name={e.name} image={e.image} temperament={e.temperament} weight={e.weight} key={e.id} />)
                    }
                    else if (e.temperaments) { // Si es de la DB
                        let aux;
                        for (let i = 0; i < e.temperaments.length; i++) {
                            aux = aux + ", " + e.temperaments[i].name;
                        }
                        return (<Card name={e.name} image={e.image} temperament={aux} weight={e.weight} key={e.id} />)
                    }
                    else { // Si es de la API (sin temperamento)
                        return (<Card name={e.name} image={e.image} temperament={'no tengo personalidad'} weight={e.weight} key={e.id} />)
                    }
                })}
            </div>
            <Paged breedsPerPage={breedsPerPage} allBreeds={allBreeds.length} paged={paged} />
        </div>
    )
}