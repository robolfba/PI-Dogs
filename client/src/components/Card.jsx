import React from 'react';
import notfound from '../img/notfound.png';

export default function Card({ name, image, temperament }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image ? image : notfound} alt='not found' width="220px" height="250px" />
            {<span>{temperament}</span>}
        </div>
    )
}