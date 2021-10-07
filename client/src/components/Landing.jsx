import React from "react";
import { Link } from 'react-router-dom';
import logo from './styles/img/otro.png'
import style from './styles/Landing.module.css';


export default function Landing() {
    return (
        <div className={style.general}>
            <div className={style.columna}>
                {/* <h2 className={style.titulo}>BREED GALLERY</h2> */}
                {/* <h4 className={style.subtitulo}>Find your best friend</h4>
                <div className={style.descripcion}>
                    <span>Come and discover all the possible breeds of the most beatifull animal</span>
                    <span>in the world. You will also be able to create your own fantasy breed!</span>
                </div> */}
                {/* <img src={logo} alt='algo' className={style.logo} /> */}
                <Link to='/home'>
                    <button className={style.boton}>View more</button>
                </Link>
            </div>

        </div>
    )
}