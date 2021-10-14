import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail, resetDetail } from '../actions';
import Nav from './Nav';
import style from './styles/Detail.module.css'

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
        dispatch(resetDetail());
    }, [dispatch, props.match.params.id])

    const myBreed = useSelector((state) => state.detail);
    return (
        <div>
            <Nav />

            {console.log('---------->', myBreed)}

            <div className={style.contenedor} >
                <img className={style.imagen} src={myBreed.image} alt='una imagen' />
                <div className={style.contenedor_texto}>
                    <div className={style.fila} >
                        <h3 className={style.nombre}>Breed details: {myBreed.name}</h3>
                        <Link to={'/home'}> <button className={style.boton} >x</button> </Link>
                    </div>
                    <div className={style.detalle} >
                        <h3>Origin: {myBreed.origin ? myBreed.origin : ' - '}</h3>
                        <h3>Average height: {`${myBreed.height} Cm`}</h3>
                        <h3>Average weight: {`${myBreed.weight} Kg`}</h3>
                        <h3>Life expectancy: {myBreed.yearsOfLife ? myBreed.yearsOfLife + ' years' : myBreed.years ? myBreed.years : ' - '}</h3>
                        <h3>Features: {myBreed.temperament ? myBreed.temperament : myBreed.temperaments ? myBreed.temperaments.map(e => e.name).join(', ') : false}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}