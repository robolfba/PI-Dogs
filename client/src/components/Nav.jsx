import React from "react";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import style from './styles/Nav.module.css'
import logo from './styles/img/otro.png'

export default function Nav() {
    return (
        <div className={style.contenedor} >
            <img src={logo} alt='algo' className={style.logo} />
            <SearchBar />
            <div className={style.home_create}>
                <div className={style.home} >
                    <Link className={style.texto_home} to='/home'> <h6>Home</h6> </Link>
                </div>
                <div className={style.create} >
                    <Link className={style.texto_create} to='/create'> <h6>Create</h6> </Link>
                </div>
            </div>
        </div>
    )
}