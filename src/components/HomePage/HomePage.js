import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPenFill } from 'react-icons/bs'

const HomePage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const getData = async () => {
        await axios.get("https://63770e2d5c4777651213077e.mockapi.io/users")
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }


    const handleDelete = async (id) => {
        alert('deleting data mock api will take nearly 10 seconds to respond')
        await axios.delete(`https://63770e2d5c4777651213077e.mockapi.io/users/${id}`, { method: 'DELETE' })
            .then(response => {
                getData()
                alert('Deleted')
            }).catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])
    console.log(data);

    return (
        <>
            <button className="btn btn-success" onClick={() => navigate('/action')}>Create a profile</button>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Profession</th>
                        <th scope="col">Place</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item) => {
                        return <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Email}</td>
                                <td>{item.Gender}</td>
                                <td>{item.Profession}</td>
                                <td>{item.Place}</td>
                                <td>{item.Vehicle}</td>
                                <td>
                                    <button className="btn btn-primary" variant='contained' color='secondary' onClick={() => navigate('/action/' + item.id)}><BsFillPenFill /></button>
                                    <button className="btn btn-danger" variant='contained' color='secondary' onClick={() => handleDelete(item.id)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>
        </>
    )
}

export default HomePage