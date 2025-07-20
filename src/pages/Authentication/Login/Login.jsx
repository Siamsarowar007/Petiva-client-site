// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import SocialLogin from '../SocialLogin/SocialLogin';
// import useAuth from '../../../hooks/useAuth';
// import Swal from 'sweetalert2'; // ✅ SweetAlert2 import

// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { signInUser } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from || '/';

//     const onSubmit = data => {
//         signInUser(data.email, data.password)
//             .then(result => {
//                 console.log(result.user);

//                 //  SweetAlert2: Success message
//                 Swal.fire({
//                     title: 'Login Successful!',
//                     text: 'Welcome back!',
//                     icon: 'success',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });

//                 navigate(from);
//             })
//             .catch(error => {
//                 console.error(error);

//                 //  SweetAlert2: Error message
//                 Swal.fire({
//                     title: 'Login Failed!',
//                     text: error.message,
//                     icon: 'error',
//                     confirmButtonText: 'Try Again'
//                 });
//             });
//     };

//     return (
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <div className="card-body">
//                 <h1 className="text-5xl font-bold">Please Login</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <fieldset className="fieldset">

//                         <label className="label">Email</label>
//                         <input
//                             type="email"
//                             {...register('email')}
//                             className="input" placeholder="Email" />

//                         <label className="label">Password</label>
//                         <input
//                             type="password"
//                             {...register('password', {
//                                 required: true,
//                                 minLength: 6
//                             })}
//                             className="input" placeholder="Password" />
//                         {
//                             errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
//                         }
//                         {
//                             errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>
//                         }

//                         <div><a className="link link-hover">Forgot password?</a></div>

//                         <button className="btn  bg-[#4CA3B8] text-white mt-4">Login</button>
//                     </fieldset>
//                     <p>New to this website? <Link state={{ from }} className="btn btn-link text-[#4CA3B8]" to="/join-us?type=register">Register</Link></p>
//                 </form>
                
//                 <SocialLogin />
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Eye icons import

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const onSubmit = data => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                navigate(from);
            })
            .catch(error => {
                console.error(error);

                Swal.fire({
                    title: 'Login Failed!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <title>JoinUs Login || Petiva</title>
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input input-bordered w-full" 
                            placeholder="Email"
                        />

                        <label className="label">Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
                                    required: true,
                                    minLength: 6
                                })}
                                className="input input-bordered w-full pr-10" 
                                placeholder="Password"
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-gray-700" 
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />} 
                            </span>
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-500 mt-1'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500 mt-1'>Password must be at least 6 characters</p>
                        }

                        <div className="label-text-alt link link-hover mt-2">Forgot password?</div> 

                        <button className="btn bg-[#4CA3B8] text-white mt-4 w-full">Login</button> 
                    </fieldset>
                    <p className="text-center mt-4">
                        New to this website? <Link className="btn btn-link text-[#4CA3B8]" to="/join-us?type=register">Register</Link>
                    </p>
                </form>
                
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;