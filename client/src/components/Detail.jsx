import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            <Nav/>
            {
                myBreed ?
                    <div>
                        <h3 className={style.nombre}>{myBreed.name}</h3>
                        <img className={style.imagen} src={myBreed.image} alt='una imagen' />
                        <h3>Temperaments: {myBreed.temperament ? myBreed.temperament : false}</h3>
                        <h3>Height: {`${myBreed.height} Cm`}</h3>
                        <h3>Weight: {`${myBreed.weight} Kg`}</h3>
                        <h3>Years span: {myBreed.years}</h3>
                    </div> : <h1>loading...</h1>
            }
        </div>
    )
}