import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const Register = () => {
    const { register, formState: errors, handleSubmit } = useForm();
    const { registerUser, updateProfileInfo } = useAuth()
    const navigator = useNavigate()
    const location = useLocation()
    console.log(location)
    const handleRegister = (data) => {
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(
                res => {
                    // Convert to formdata
                    const formData = new FormData()
                    formData.append('image', profileImg)
                    const imgbbApiKey = import.meta.env.VITE_photo_api_key;

                    // Call imgbb api
                    axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
                        .then(res => {
                            // Update profile
                            const updateInfo = {
                                displayName: data.name,
                                photoURL: res.data.data.url
                            }
                            console.log(updateInfo)
                            updateProfileInfo(updateInfo)
                                .then(()=>{
                                    console.log("Successfully Registered")
                                    navigator(location.state || '/')
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))

                })
            .catch(err => console.log(err))
    }

    return (
        <div className='h-full'>
            <form onSubmit={handleSubmit(handleRegister)} className=' h-full flex items-center'>
                <fieldset className="fieldset w-[50%] mx-auto ">
                    <h1 className='text-3xl font-bold text-center mb-2'>Welcome Back</h1>
                    <h1 className='text-xl font-bold text-center text-primary mb-5'>Create Your Account </h1>

                    <label className="label text-primary">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Your name" />
                    <label className="label text-primary">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input  w-full" placeholder="URL" />

                    {/* Email Field */}
                    <label className="label text-primary">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-800'>email is required</p>
                    }

                    {/* Password Field */}
                    <label className="label text-primary">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z]).+$/
                    })} className="input w-full mb-2" placeholder="Password" />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-800'>Password required minimum 6 digits !</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-800'>An uppercase and a lowercase letter required !</p>
                    }


                    {/* Buttons */}
                    <button className="btn w-full mt-4 bg-primary text-white rounded-xl hover:transition hover:duration-500 hover:ease-in-out hover:scale-103 ">Register</button>


                </fieldset>
            </form>
        </div>
    );
};

export default Register;