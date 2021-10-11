import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed } from '../actions';

function validate(input) {
    let errors = {};
    
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    }
    if (!input.height_min){
        errors.height_min = 'Se requiere una altura minima';
    }
    if (input.height_min && !/\d/.test(input.height_min)) {
        errors.height_min = 'Se espera un valor numerico';
    }
    if (!input.height_max){
        errors.height_max = 'Se requiere una altura maxima';
    }
    if (input.height_max && !/\d/.test(input.height_max)) {
        errors.height_max = 'Se espera un valor numerico';
    }
    if (parseInt(input.height_max) <= parseInt(input.height_min)) {
        errors.height_max = 'Se espera que el valor maximo sea mayor al minimo';
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
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        dispatch(postBreed(input));
        console.log('input.temperaments (handleSubmit)--->', input.temperaments);

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
            <Link to='/home'>
                <span>HOME</span>
            </Link>

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
                    <select required onChange={e => handleSelect(e)}>
                        {
                            allTemperaments.map(e => {
                                return <option key={e.id} value={e.id}>{e.name}</option>
                            })
                        }
                    </select>
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

