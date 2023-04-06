import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { signUpSchema } from './FormValidation'
import { useFormik } from 'formik'
import axios from 'axios'


const Action = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            Profession: '',
            Place: '',
            Vehicle: '',
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, action) => {
            if (id) {
                await axios.put(`https://63770e2d5c4777651213077e.mockapi.io/users/${id}`, values)
                    .then((res) => {
                        console.log(res.data);
                        alert("Updated user successfully")
                        navigate('/')
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err)
                    })
                console.log(values);
                action.resetForm()
            }
            else {
                await axios.post(`https://63770e2d5c4777651213077e.mockapi.io/users`, values)
                    .then((res) => {
                        console.log(res.data);
                        alert('Added User Succesfully')
                        navigate('/')
                    }).catch((err) => {
                        console.log(err);
                        alert(err)
                    })
                console.log(values);
                action.resetForm()
            }
        }, onChange: (values) => {
            console.log(values);
        }
    })

    useEffect(() => {
        if (id) {
            axios.get(`https://63770e2d5c4777651213077e.mockapi.io/users/${id}`)
                .then((values) => values.data).catch((err) => alert(err))
        }
    }, [id])
    console.log(values);
    return (
        <>
            <div>
                <h1 className="text-center mb-5">{id ? "Update a Profile" : "Create a profile"}</h1>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Name}
                            id='Name'
                            autoFocus
                            class='form-control'
                            type="name"
                            placeholder="Default input" />
                        {errors.Name && touched.Name && <p className="error">{errors.Name}</p>}
                    </div>
                    <div className="form-group">
                        <label for='exampleInputEmail1'>Email address</label>
                        <input onChange={handleChange} onBlur={handleBlur} value={values.Email} id='Email' name='Email' autoFocus type='email' class='form-control' aria-describedby="emailHelp" placeholder="Enter email" />
                        {errors.Email && touched.Email && <p className="error">{errors.Email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Profession</label>
                        <input onChange={handleChange} onBlur={handleBlur} value={values.Profession} id='Profession' name='Profession' autoFocus class='form-control' type="text" placeholder="Default input" />
                    </div>
                    <div class='form-group'>
                        <label>Place</label>
                        <input onChange={handleChange} onBlur={handleBlur} value={values.Place} id='Place' name="Place" autoFocus class='form-control' type="text" placeholder="Default input" />
                        {errors.Place && touched.Place && <p className="error">{errors.Place}</p>}
                    </div>
                    <div class='form-group'>
                        <label>Vehicle</label>
                        <input onChange={handleChange} onBlur={handleBlur} value={values.Vehicle} id='Vehicle' name='Vehicle' autoFocus class='form-control' type='text' placeholder="Default input" />
                        {errors.Vehicle && touched.Vehicle && <p className="error">{errors.Vehicle}</p>}
                    </div>
                    <button type='submit' class='btn btn-primary'>{id?'Edit':'Create'}</button>
                    <button type='submit' class='btn btn-primary' onClick={()=>navigate('/')}>Go Back</button>
                </form>
            </div>
        </>
    )
}

export default Action