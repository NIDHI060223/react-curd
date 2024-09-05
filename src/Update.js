import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Update() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        phone:''
    })
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${id}`)
        .then(res =>{
            setValues(res.data)
        })
        .catch(err => console.log(err))
      },[id])

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/user/${id}`, values)
        .then(res => {
            console.log(res);
            nav('/');
        })
        .catch(err => console.log(err))
    }  

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 border bg-white shadow px-5 pb-5 rounded'>
        <h1>Add User</h1>
        <form onSubmit={handleUpdate}>
            <div className='mb-2'>
                <lable htmlFor='name'>Name:</lable>
                <input type='text' name='name' className='form-control' placeholder='Enter Name'
                value={values.name}  onChange={(e)=> setValues({...values, name:e.target.value})}/>
            </div>

            <div className='mb-2'>
                <lable htmlFor='email'>Email:</lable>
                <input type='email' name='email' className='form-control' placeholder='Enter Email'
                value={values.email}  onChange={(e)=> setValues({...values, email:e.target.value})}/>
            </div>

            <div className='mb-3'>
                <lable htmlFor='phone'>Phone:</lable>
                <input type='text' name='phone' className='form-control' placeholder='Enter Phone'
                value={values.phone}  onChange={(e)=> setValues({...values, phone:e.target.value})}/>
            </div>

            <button className='btn btn-success'>Update</button>
            <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
    </div>
</div>
  )
}

export default Update
