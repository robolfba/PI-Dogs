import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed } from '../actions';
import Nav from './Nav';
import style from './styles/BreedCreate.module.css'
const urlValidate = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#()?&//=]*)/);

function validate(input) {
    let errors = {};
    // NAME -----------------------------------------------------------------------------------------------------------------------
    if (!input.name) {
        errors.name = 'A name is required';
    }
    // if (input.name) {
    //     errors.name = '';
    // }
    // IMAGE -----------------------------------------------------------------------------------------------------------------------
    if (input.image && !urlValidate.test(input.image)) {
        errors.image = 'You have to enter a valid URL'
    }
    // if (input.image && urlValidate.test(input.image)) {
    //     errors.image = ''
    // }
    // HEIGHT (10 - 150 cm) -------------------------------------------------------------------------------------------------------
    if (!input.height_min || (input.height_min && parseInt(input.height_min) < 10 || parseInt(input.height_min) > 150)) {
        errors.height_min = 'A numerical value between 10 and 150 is expected';
    }
    if (!input.height_max || input.height_max && parseInt(input.height_max) < 10 || parseInt(input.height_max) > 150) {
        errors.height_max = 'A numerical value between 10 and 150 is expected';
    }
    if (input.height_min && input.height_max && parseInt(input.height_max) < parseInt(input.height_min)) {
        errors.height_max = 'The maximum height is expected to be greater than the minimum';
    }
    // if (input.height_min && input.height_max && parseInt(input.height_max) > parseInt(input.height_min)) {
    //     errors.height_min = '';
    //     errors.height_max = '';
    // }
    // WEIGHT (2 - 100 kg) -------------------------------------------------------------------------------------------------------
    if (!input.weight_min || input.weight_min && parseInt(input.weight_min) < 2 || parseInt(input.weight_min) > 100) {
        errors.weight_min = 'A numerical value between 2 and 100 is expected';
    }
    if (!input.weight_max || input.weight_max && parseInt(input.weight_max) < 2 || parseInt(input.weight_max) > 100) {
        errors.weight_max = 'A numerical value between 2 and 100 is expected';
    }
    if (input.weight_min && input.weight_max && parseInt(input.weight_max) < parseInt(input.weight_min)) {
        errors.weight_max = 'Maximum weight is expected to be greater than minimum';
    }
    // if (input.weight_min && input.weight_max && parseInt(input.weight_max) > parseInt(input.weight_min)) {
    //     errors.weight_min = '';
    //     errors.weight_max = '';
    // }
    // TEMPERAMENTS (se requiere al menos uno)
    if (input.temperaments.length < 1) {
        errors.temperaments = 'Choosing at least one temperament is required';
    }
    // if (input.temperaments.length > 0) {
    //     errors.temperaments = '';
    // }
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
        setErrors(validate(input))
        if (Object.keys(errors).length > 0) {
            alert('Quedan campos por completar!')
        }
        else {
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
            <Nav />
            <h2>Invent your own breed</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.contenedor_mas_grande} >

                    <div className={style.contenedor} >
                        <div className={style.name}>
                            <label >Name: </label>
                            <input
                                type='text'
                                value={input.name}
                                name='name'
                                required
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <span className={style.span_errors} >{errors.name}</span>
                            )}
                        </div>

                        <div className={style.height_min}>
                            <label>Height min (cm.): </label>
                            <input
                                type='number'
                                value={input.height_min}
                                name='height_min'
                                required
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.height_min && (
                                <span className={style.span_errors}>{errors.height_min}</span>
                            )}
                        </div>
                        <div className={style.height_max}>
                            <label>Height max (cm.): </label>
                            <input
                                type='number'
                                value={input.height_max}
                                name='height_max'
                                required
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.height_max && (
                                <span className={style.span_errors}>{errors.height_max}</span>
                            )}
                        </div>
                        <div className={style.weight_min}>
                            <label>Weight min (kg.): </label>
                            <input
                                type='number'
                                value={input.weight_min}
                                name='weight_min'
                                required
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.weight_min && (
                                <span className={style.span_errors}>{errors.weight_min}</span>
                            )}
                        </div>
                        <div className={style.weight_max}>
                            <label>Weight max (kg.): </label>
                            <input
                                type='number'
                                value={input.weight_max}
                                name='weight_max'
                                required
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.weight_max && (
                                <span className={style.span_errors}>{errors.weight_max}</span>
                            )}
                        </div>
                        <div className={style.image}>
                            <label>Url image: </label>
                            <input
                                type='text'
                                value={input.image}
                                name='image'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {errors.image && (
                            <span className={style.span_errors}>{errors.image}</span>
                        )}

                        <div className={style.yearsOfLife}>
                            <label>Years of life: </label>
                            <input
                                type='text'
                                value={input.yearsOfLife}
                                name='yearsOfLife'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {/* {console.log('estado errores',errors)}
                        {Object.keys(errors).length > 0 ? <input disabled value='Create Breeds' className={style.boton} type='submit' />
                            : */}
                            <input value='Create Breeds' className={style.boton} type='submit' /> 
                        {/* } */}
                    </div>

                    {/* //-------------------------------------------------------------------------------------------------------------------- */}
                    <div className={style.contenedor_temperamentos}>
                        <div className={style.select_temperamentos} >
                            <label>Temperaments: </label>
                            <select onChange={e => handleSelect(e)}>
                                {
                                    allTemperaments.map(e => {
                                        return <option className={style.texto_temperamento} key={e.id} value={e.id}>{e.name}</option>
                                    })
                                }
                            </select>
                            {errors.temperaments && (
                                <span className={style.span_errors}>{errors.temperaments}</span>
                            )}
                        </div>
                        {/* Aca se muestran los temperamentos que se van agregando! */}
                        {
                            input.temperaments.map((temp, index) => {
                                let aux = allTemperaments.filter(e => e.id == temp);
                                return <div key={index} className={style.contenedor_final}>
                                    <div className={style.contenedor_temperamento_seleccionado} key={index}>
                                        <h4 className={style.temperamento_seleccionado} >{aux[0].name}</h4>
                                        <button className={style.boton_temperamento_seleccionado} onClick={() => handleDelete(temp)}>x</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </form>

        </div>
    )


}

