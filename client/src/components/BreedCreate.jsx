import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed } from '../actions';
import Nav from './Nav';
import style from './styles/BreedCreate.module.css'

function validate(input) {
    let errors = {};
    let urlValidate = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#()?&//=]*)/);
    // NAME -----------------------------------------------------------------------------------------------------------------------
    if (!input.name) {
        errors.name = 'A name is required';
    }
    // IMAGE -----------------------------------------------------------------------------------------------------------------------
    else if (input.image && !urlValidate.test(input.image)) {
        errors.image = 'You have to enter a valid URL'
    }
    // HEIGHT (10 - 150 cm) -------------------------------------------------------------------------------------------------------
    else if (!input.height_min) {
        // errors.height_min = 'Se requiere una altura minima';
        errors.height_min = 'A numerical value between 10 and 150 is expected';
    }
    else if (input.height_min && (!/\d/.test(input.height_min) || parseInt(input.height_min) < 10 || parseInt(input.height_min) > 150)) {
        errors.height_min = 'A numerical value between 10 and 150 is expected';
    }
    else if (!input.height_max) {
        // errors.height_max = 'Se requiere una altura maxima';
        errors.height_max = 'A numerical value between 10 and 150 is expected';
    }
    else if (input.height_max && (!/\d/.test(input.height_max) || parseInt(input.height_max) < 10 || parseInt(input.height_max) > 150)) {
        errors.height_max = 'A numerical value between 10 and 150 is expected';
    }
    else if (parseInt(input.height_max) <= parseInt(input.height_min)) {
        errors.height_max = 'The maximum height is expected to be greater than the minimum';
    }
    // WEIGHT (2 - 100 kg) -------------------------------------------------------------------------------------------------------
    else if (!input.weight_min) {
        errors.weight_min = 'A numerical value between 2 and 100 is expected';
    }
    else if (input.weight_min && (!/\d/.test(input.weight_min) || parseInt(input.weight_min) < 2 || parseInt(input.weight_min) > 100)) {
        errors.weight_min = 'A numerical value between 2 and 100 is expected';
    }
    else if (!input.weight_max) {
        errors.weight_max = 'A numerical value between 2 and 100 is expected';
    }
    else if (input.weight_max && (!/\d/.test(input.weight_max) || parseInt(input.weight_max) < 2 || parseInt(input.weight_max) > 100)) {
        errors.weight_max = 'A numerical value between 2 and 100 is expected';
    }
    else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
        errors.weight_max = 'Maximum weight is expected to be greater than minimum';
    }
    // TEMPERAMENTS (se requiere al menos uno)
    else if (input.temperaments.length === 0) {
        errors.temperaments = 'Choosing at least one temperament is required';
    }
    else {
        errors.temperaments = '';
    }
    return errors;
}

export default function BreedCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        image: '',
        yearsOfLife: '',
        temperaments: []
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        });
        setErrors(validate({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]: e.target.value
        // }))
        dispatch(postBreed(input));
        alert('Raza creada con exito!');
        setInput({
            name: '',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            image: '',
            yearsOfLife: '',
            temperaments: []
        })
        history.push('/home');
    }

    function handleDelete(temp) {
        setInput({
            ...input,
            temperaments: [...input.temperaments.filter(element => element !== temp)]
        })
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    return (
        <div>
            {/* <Link to='/home'>
                <span>HOME</span>
            </Link> */}
            <Nav />
            <h3>Invent your own breed</h3>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div className={style.contenedor} >
                    <div className={style.name}>
                        <label >Name:</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
                            // placeholder='breed name'
                            required
                            onChange={(e) => handleChange(e)}
                        // className={style.input}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>

                    <div className={style.height_min}>
                        <label>Height min:</label>
                        <input
                            type='text'
                            value={input.height_min}
                            name='height_min'
                            // placeholder='number between 15 and 100'
                            required
                            onChange={(e) => handleChange(e)}
                        // className={style.input}
                        />
                        {errors.height_min && (
                            <p>{errors.height_min}</p>
                        )}
                    </div>
                    <div className={style.height_max}>
                        <label>Height max:</label>
                        <input
                            type='text'
                            value={input.height_max}
                            name='height_max'
                            // placeholder='number between 15 and 100'
                            required
                            onChange={(e) => handleChange(e)}
                        // className={style.input}
                        />
                        {errors.height_max && (
                            <p>{errors.height_max}</p>
                        )}
                    </div>
                    <div className={style.weight_min}>
                        <label>Weight min:</label>
                        <input
                            type='text'
                            value={input.weight_min}
                            name='weight_min'
                            required
                            onChange={(e) => handleChange(e)}
                        // className={style.input}
                        />
                        {errors.weight_min && (
                            <p>{errors.weight_min}</p>
                        )}
                    </div>
                    <div className={style.weight_max}>
                        <label>Weight max:</label>
                        <input
                            type='text'
                            value={input.weight_max}
                            name='weight_max'
                            required
                            onChange={(e) => handleChange(e)}
                        // className={style.input}
                        />
                        {errors.weight_max && (
                            <p>{errors.weight_max}</p>
                        )}
                    </div>
                    <div className={style.image}>
                        <label>Url image:</label>
                        <input
                            type='text'
                            value={input.image}
                            name='image'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={style.yearsOfLife}>
                        <label>Years of life:</label>
                        <input
                            type='text'
                            value={input.yearsOfLife}
                            name='yearsOfLife'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Temperaments:</label>
                        <select onChange={e => handleSelect(e)}>
                            {
                                allTemperaments.map(e => {
                                    return <option key={e.id} value={e.id}>{e.name}</option>
                                })
                            }
                        </select>
                        {errors.temperaments && (
                            <p>{errors.temperaments}</p>
                        )}
                    </div>
                    <button className={style.boton} type='submit'>Breed create!</button>
                </div>
            </form>
            {/* Aca se muestran los temperamentos que se van agregando! */}
            {
                input.temperaments.map((temp, index) => {
                    let aux = allTemperaments.filter(e => e.id == temp);
                    return <div key={index}>
                        <p>{aux[0].name}</p>
                        <button onClick={() => handleDelete(temp)}>x</button>
                    </div>
                })
            }
        </div>
    )


}

