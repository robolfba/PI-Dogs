import React from 'react';
import notfound from '../img/notfound.png';
import style from './styles/Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ name, image, temperament, weight }) {
    return (
        <div className={style.contenedor}>
            <img className={style.imagen} src={image ? image : notfound} alt='not found' />
            <div className={style.columna_texto}>
                <h5 className={style.nombre}>{name}</h5>
                <div className={style.peso}>
                    <h6>Weight:</h6>
                    {<span>{weight ? weight : false}</span>}
                </div>
                <div className={style.temperamento}>
                    <h6>Temperaments:</h6>
                    {<span>{temperament}</span>}
                </div>
                <Link to='/detail'>
                    <button className={style.boton} >View more</button>
                </Link>
            </div>

        </div>
    )
}