import React from "react";
import { Link } from 'react-router-dom';
import style from './styles/Landing.module.css';


export default function Landing() {
    return (
        <div className={style.general}>
            <div className={style.columna}>
                <Link to='/home'>
                    <button className={style.boton}>View more</button>
                </Link>
            </div>

        </div>
    )
}