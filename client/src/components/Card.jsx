import React from 'react';
import notfound from '../img/notfound.png';
import style from './styles/Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ name, id, image, temperament, weight }) {
    return (
        <div className={style.contenedor}>
            <img className={style.imagen} src={image ? image : notfound} alt='not found' />
            <div className={style.columna_texto}>
                <h5 className={style.nombre}>{name}</h5>
                <div className={style.peso}>
                    <h6>Weight:</h6>
                    {<span>{weight ? `${weight} Kg` : false}</span>}
                </div>
                <div className={style.temperamento}>
                    <h6>Temperaments:</h6>
                    {<span>{temperament}</span>}
                </div >
                <div className={style.contenedor_boton}>
                <Link to={`/detail/${id}`} >
                    <button className={style.boton} >View more</button>
                </Link>
                </div>
            </div>

        </div>
    )
}