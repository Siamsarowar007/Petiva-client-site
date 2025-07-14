import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';


import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const [uploading, setUploading] = useState(false);

    const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

    
    const axiosInstance = useAxios();

    const onSubmit = async data => {
        try {
            setUploading(true);
            const image = data.image[0];

            let imageURL = '';

            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const imageRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                    formData
                );

                imageURL = imageRes.data.data.url;
            }

            const result = await createUser(data.email, data.password);
            const user = result.user;

            await updateProfile(user, {
                displayName: data.name,
                photoURL: imageURL
            });

            const userInfo = {
                name: data.name,
                email: data.email,
                photo: imageURL,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            };

            
            await axiosInstance.post('/users', userInfo);

            navigate(from);
        } catch (err) {
            console.error('Registration failed:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="label">Your Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" />
                    {errors.name && <p className="text-red-500">Name is required</p>}

                    <label className="label">Upload Image (optional)</label>
                    <input type="file" {...register('image')} className="file-input" />

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" />
                    {errors.email && <p className="text-red-500">Email is required</p>}

                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" />
                    {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-500">Minimum 6 characters</p>}

                    <button className="btn btn-primary mt-4" disabled={uploading}>
                        {uploading ? 'Registering...' : 'Register'}
                    </button>

                    <p className="mt-2">
                        Already have an account? <Link className="link text-blue-600" to="/login" state={{ from }}>Login</Link>
                    </p>
                </form>

                <div className="divider">OR</div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;

