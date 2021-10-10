import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, filterBreeds, orderByName, getTemperaments, filterTemperaments, orderByWeight } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Paged from './Paged';
import style from './styles/Home.module.css';

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
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getBreeds()); // Recarga las razas
    }

    function handleFilterBreeds(e) {
        e.preventDefault();
        dispatch(filterBreeds(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // Modifico la pagina actual
        setOrden(`Ordenado ${e.target.value}`) // Al modificar el estado local, se vuelve a renderizar
    }

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1); // Modifico la pagina actual
        setOrden(`Ordenado2 ${e.target.value}`) // Al modificar el estado local, se vuelve a renderizar
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        console.log('filterTemperaments(e.target.value)-->', e.target.value);
        dispatch(filterTemperaments(e.target.value));
    }

    return (
        <div className={style.contenedor_general} >
            <Nav />
            <div className={style.contenedor_filtros_ordenadores} >
                {/* //------------------------------------------------------------- Filtrados */}
                <div className={style.contenedor_filtros} >
                    <button className={style.boton_razas} onClick={e => handleClick(e)}>Reload breeds</button>
                    {/* // Filtro por raza */}
                    <select className={style.filtro_razas} onChange={e => handleFilterBreeds(e)}>
                        <option value='AllBreeds'>All breeds</option>
                        <option value='Created'>Created</option>
                        <option value='Existing'>Existing</option>
                    </select>

                    {/* // Filtro por temperamento */}
                    <select className={style.filtro_temperamento} onChange={e => handleFilterTemperaments(e)} >
                        <option value='AllTemperaments'>All temperaments</option>
                        {
                            allTemperaments && allTemperaments.map(e => {
                                return <option value={e.name} key={e.id}>{e.name}</option>
                            })
                        }
                    </select>
                </div>
                {/* //------------------------------------------------------------- Ordenados */}
                <div className={style.contenedor_ordenadores} >
                    {/* // Orden alfabetico */}
                    <select className={style.orden_alfabetico} onChange={e => handleOrderByName(e)}>
                        <option value='asc'>A to Z</option>
                        <option value='desc'>Z to A</option>
                    </select>

                    {/* // Orden por peso */}
                    <select className={style.orden_peso} onChange={e => handleOrderByWeight(e)} >
                        <option value='menor'>Less weight</option>
                        <option value='mayor'>Greater weight</option>
                    </select>
                </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className={style.contenedor_cards}>
                {currentBreeds && currentBreeds.map((e) => {
                    if (e.temperament) { // Si es de la API
                        return (<Card name={e.name} image={e.image} temperament={e.temperament} weight={e.weight} key={e.id} id={e.id} />)
                    }
                    else if (e.temperaments) { // Si es de la DB
                        let aux = e.temperaments[0].name;
                        for (let i = 1; i < e.temperaments.length; i++) {
                            aux = aux + ', ' + e.temperaments[i].name;
                        }
                        return (<Card name={e.name} image={e.image} temperament={aux} weight={e.weight} key={e.id} id={e.id} />)
                    }
                    else { // Si es de la API (sin temperamento)
                        return (<Card name={e.name} image={e.image} temperament={'no tengo personalidad'} weight={e.weight} key={e.id} id={e.id} />)
                    }
                })}
            </div>
            <div className={style.contenedor_paginado}>
                <Paged breedsPerPage={breedsPerPage} allBreeds={allBreeds.length} paged={paged} />
            </div>
        </div>
    )
}