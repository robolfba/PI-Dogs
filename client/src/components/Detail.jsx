import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('props.match.params.id-->', props.match.params.id)
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myBreed = useSelector((state) => state.detail);
    return (
        <div>
            {
                myBreed ?
                    <div>
                        <h3>Name: {myBreed.name}</h3>
                        <img src={myBreed.image} />
                        <h3>Temperaments: {myBreed.temperament ? myBreed.temperament :false}</h3>
                        <h3>Height: {`${myBreed.height} Cm`}</h3>
                        <h3>Weight: {`${myBreed.weight} Kg`}</h3>
                        <h3>Years span: {myBreed.years}</h3>
                    </div> : <h1>loading...</h1>

                // {name: 'Afghan Hound', 
                // image: 'https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg', 
                // temperament: 'Aloof, Clownish, Dignified, Independent, Happy', 
                // height: '64 - 69', 
                // weight: '23 - 27', 
                // years: "10 - 13 years"}
            }
        </div>
    )
}