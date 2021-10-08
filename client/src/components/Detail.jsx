import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';

export default function Detail(props) {
    console.log('estas son las props---->', props);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('props.match.params.id', props.match.params.id)
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myBreed = useSelector((state) => state.detail);
    return (
        <div>
            {
                myBreed.length > 0 ?
                    <div>
                        {console.log(myBreed)}
                        <h1>{myBreed[0].name}</h1>

                    </div> : <h1>loading...</h1>
            }
        </div>
    )
}