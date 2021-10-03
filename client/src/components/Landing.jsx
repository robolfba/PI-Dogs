import React from "react";
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div>
            <h1>Que lindo que te toque la app de perritoss</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}