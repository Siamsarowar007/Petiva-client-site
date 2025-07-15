// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate} from 'react-router';
// import SocialLogin from '../SocialLogin/SocialLogin';
// import useAuth from '../../../hooks/useAuth';

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
//                 navigate(from);
//             })
//             .catch(error => console.log(error))
//     }

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
//                             errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
//                         }

//                         <div><a className="link link-hover">Forgot password?</a></div>

//                         <button className="btn btn-primary text-black mt-4">Login</button>
//                     </fieldset>
//                     <p><small>New to this website? <Link state={{ from }} className="btn btn-link" to="/register">Register</Link></small></p>
//                 </form>
//                 <SocialLogin></SocialLogin>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2'; // ✅ SweetAlert2 import

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                //  SweetAlert2: Success message
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

                //  SweetAlert2: Error message
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
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p>New to this website? <Link state={{ from }} className="btn btn-link" to="/join-us?type=register">Register</Link></p>
                </form>
                
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
