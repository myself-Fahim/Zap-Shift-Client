import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {

    const { register, handleSubmit, setValue,formState:{errors} } = useForm()

    const handleForm = (data) => {
        console.log('submitted',data)
    }
    const fillAdmin = () => {
        setValue('email','admin123@gmail.com')
        setValue('password','123456Aa')
    }
    const fillRider = () => {
         setValue('email','rider123@gmail.com')
        setValue('password','123456Rr')
    }
    const fillUser = () => {
         setValue('email','user123@gmail.com')
        setValue('password','123456Uu')
    }


    return (
        <div className='h-full'>
            <form onSubmit={handleSubmit(handleForm)} className=' h-full flex items-center'>
                <fieldset className="fieldset w-[50%] mx-auto ">
                    <h1 className='text-3xl font-bold text-center text-primary mb-10'>Login</h1>

                    {/* Email Field */}
                    <label className="label text-primary">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type==='required' && <p className='text-red-800'>email is required</p>
                    }

                    {/* Password Field */}
                    <label className="label text-primary">Password</label>
                    <input type="password" {...register('password',{
                        required:true ,
                        minLength:6,
                        pattern:/^(?=.*[A-Z])(?=.*[a-z]).+$/
                    })} className="input w-full mb-2" placeholder="Password" />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-800'>Password required minimum 6 digits !</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-800'>An uppercase and a lowercase letter required !</p>
                    }
                    {/* Forgot Password field */}
                    <div><a className="link link-hover text-primary">Forgot password?</a></div>
                    {/*Role based automate Id Pass  */}
                    <div className='py-5 flex justify-around'>
                        <button type='button' onClick={fillAdmin} className='shadow-sm px-3 py-1 rounded-sm hover:bg-neutral font-semibold'>Admin</button>
                        <button type='button' onClick={fillRider} className='shadow-sm px-3 py-1 rounded-sm hover:bg-neutral font-semibold'>Rider</button>
                        <button type='button' onClick={fillUser} className='shadow-sm px-3 py-1 rounded-sm hover:bg-neutral font-semibold'>User</button>
                    </div>

                    {/* Buttons */}
                    <button className="btn w-full mt-4 bg-primary text-white">Login</button>
                    <button className="btn bg-white w-full mt-4 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Log in with Google
                    </button>

                    <p className='mt-2 text-center'>Don't have any account? <span className='underline'><Link to='/register'>Register Here</Link></span></p>
                </fieldset>
            </form>


        </div>
    );
};

export default Login;