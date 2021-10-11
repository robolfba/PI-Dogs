import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed } from '../actions';
import Nav from './Nav';
import style from './styles/BreedCreate.module.css'

function validate(input) {
    let errors = {};
    // NAME -----------------------------------------------------------------------------------------------------------------------
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    }
    // HEIGHT (10 - 150 cm) -------------------------------------------------------------------------------------------------------
    if (!input.height_min) {
        // errors.height_min = 'Se requiere una altura minima';
        errors.height_min = 'Se espera un valor numerico entre 10 y 150';
    }
    if (input.height_min && (!/\d/.test(input.height_min) || parseInt(input.height_min) < 10 || parseInt(input.height_min) > 150)) {
        errors.height_min = 'Se espera un valor numerico entre 10 y 150';
    }
    if (!input.height_max) {
        // errors.height_max = 'Se requiere una altura maxima';
        errors.height_max = 'Se espera un valor numerico entre 10 y 150';
    }
    if (input.height_max && (!/\d/.test(input.height_max) || parseInt(input.height_max) < 10 || parseInt(input.height_max) > 150)) {
        errors.height_max = 'Se espera un valor numerico entre 10 y 150';
    }
    if (parseInt(input.height_max) <= parseInt(input.height_min)) {
        errors.height_max = 'Se espera que el valor maximo sea mayor al minimo';
    }
    // WEIGHT (2 - 100 kg) -------------------------------------------------------------------------------------------------------
    if (!input.weight_min) {
        errors.weight_min = 'Se requiere un peso minimo';
    }
    if (input.weight_min && (!/\d/.test(input.weight_min) || parseInt(input.weight_min) < 2 || parseInt(input.weight_min) > 100)) {
        errors.weight_min = 'Se espera un valor numerico entre 2 y 100';
    }
    if (!input.weight_max) {
        errors.weight_max = 'Se requiere un peso maximo';
    }
    if (input.weight_max && (!/\d/.test(input.weight_max) || parseInt(input.weight_max) < 2 || parseInt(input.weight_max) > 100)) {
        errors.weight_max = 'Se espera un valor numerico entre 2 y 100';
    }
    if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
        errors.weight_max = 'Se espera que el valor maximo sea mayor al minimo';
    }
    // TEMPERAMENTS (se requiere al menos uno)
    if (input.temperaments.length === 0) {
        errors.temperaments = 'Se requiere elegir al menos un temperamento';
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
            <h3>BREED CREATE</h3>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        placeholder='Ingrese un name...'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Height min:</label>
                    <input
                        type='text'
                        value={input.height_min}
                        name='height_min'
                        placeholder='Ingrese un valor entre 15 y 100'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.height_min && (
                        <p>{errors.height_min}</p>
                    )}
                </div>
                <div>
                    <label>Height max:</label>
                    <input
                        type='text'
                        value={input.height_max}
                        name='height_max'
                        placeholder='Ingrese un valor mayor que el height min'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.height_max && (
                        <p>{errors.height_max}</p>
                    )}
                </div>
                <div>
                    <label>Weight min:</label>
                    <input
                        type='text'
                        value={input.weight_min}
                        name='weight_min'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.weight_min && (
                        <p>{errors.weight_min}</p>
                    )}
                </div>
                <div>
                    <label>Weight max:</label>
                    <input
                        type='text'
                        value={input.weight_max}
                        name='weight_max'
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.weight_max && (
                        <p>{errors.weight_max}</p>
                    )}
                </div>
                <div>
                    <label>Url image:</label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
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
                <button type='submit'>Breed create!</button>
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

