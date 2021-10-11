import React from "react";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
import style from './styles/Nav.module.css'
import logo from './styles/img/breedsgallery.png'

export default function Nav() {
    return (
        <div className={style.contenedor} >
            <h1 className={style.logo} >Breeds APP</h1>
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