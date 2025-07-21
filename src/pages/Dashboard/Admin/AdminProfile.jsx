import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { FaUserCircle, FaEnvelope, FaTag, FaAward, FaCalendarAlt, FaLock, FaImage, FaEdit, FaCheckCircle, FaTimesCircle, FaSpinner, FaSignOutAlt, FaInfoCircle, FaCog } from 'react-icons/fa'; // Added FaInfoCircle, FaCog for default view
import moment from 'moment';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecureFile';

const AdminProfile = () => {
    const { user, auth, signOutUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, getValues, reset } = useForm(); 
    const axiosInstance = useAxiosSecure();
    const [adminInfo, setAdminInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

    useEffect(() => {
        const fetchAdminProfile = async () => {
            if (user?.email) {
                try {
                    const res = await axiosInstance.get(`/users/${user.email}`);
                    const fetchedAdminInfo = res.data;

                   
                    if (fetchedAdminInfo.role === 'admin') {
                        setAdminInfo(fetchedAdminInfo);
                        setValue('name', fetchedAdminInfo.name || user.displayName);
                        setValue('email', fetchedAdminInfo.email || user.email);
                    } else {
                       
                        Swal.fire({
                            icon: 'error',
                            title: 'Access Denied',
                            text: 'You do not have administrative privileges to view this page.',
                            confirmButtonText: 'Go to Home'
                        }).then(() => {
                            navigate('/'); 
                        });
                        setAdminInfo(null); 
                    }
                } catch (error) {
                    console.error("Failed to fetch admin profile:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load profile data. Please try again later.',
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                
                Swal.fire({
                    icon: 'warning',
                    title: 'Authentication Required',
                    text: 'Please log in to view this page.',
                    confirmButtonText: 'Go to Login'
                }).then(() => {
                    navigate('/join-us?type=login');
                });
            }
        };

        fetchAdminProfile();
    }, [user, axiosInstance, setValue, navigate]);

    
    const handleProfileUpdate = async (data) => {
        setUploadingImage(true);
        let photoURL = adminInfo?.photo || user?.photoURL;

        try {
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);
                const imageRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                    formData
                );
                photoURL = imageRes.data.data.url;
            }

       
            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: photoURL,
            });

         
            await axiosInstance.put(`/users/${user.email}`, {
                name: data.name,
                photo: photoURL,
            });

            setAdminInfo(prev => ({ ...prev, name: data.name, photo: photoURL }));

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been successfully updated.',
            });
            setIsEditingProfile(false);
            reset({ name: data.name, email: user.email, image: null }); 
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error.message || 'There was an error updating your profile.',
            });
        } finally {
            setUploadingImage(false);
        }
    };

    // --- পাসওয়ার্ড পরিবর্তন হ্যান্ডলিং ---
    const handleChangePassword = async (data) => {
        const { currentPassword, newPassword } = data;

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);

            Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                text: 'Your password has been successfully updated.',
            });
            setIsChangingPassword(false);
            reset({ currentPassword: '', newPassword: '', confirmPassword: '' }); 
        } catch (error) {
            console.error("Password change failed:", error);
            let errorMessage = error.message;
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'The current password you entered is incorrect.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The new password is too weak. Please use a stronger password.';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage = 'Please log out and log in again to change your password.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Password Change Failed!',
                text: errorMessage,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-[#4CA3B8]"></span>
            </div>
        );
    }

    if (!adminInfo) {
        return null; 
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <title>Admin Profile || Petiva</title>
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Profile</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={adminInfo.photo || user.photoURL || "/default-avatar.png"}
                            alt="Admin Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#4CA3B8] shadow-md"
                        />
                        <h3 className="text-2xl font-bold mt-4 text-gray-800">{adminInfo.name || user.displayName || "Admin User"}</h3>
                        <p className={`badge ${adminInfo.role === 'admin' ? 'badge-primary' : 'badge-info'} text-white mt-2 px-3 py-1 text-sm`}>
                            <FaTag className="inline-block mr-1" /> {adminInfo.role ? adminInfo.role.toUpperCase() : "USER"}
                        </p>
                        <p className={`badge ${adminInfo.badge === 'Bronze' ? 'bg-amber-700' : adminInfo.badge === 'Silver' ? 'bg-slate-400' : adminInfo.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-white mt-2 px-3 py-1 text-sm`}> {/* ✅ Added Gold badge and default gray */}
                           <FaAward className="inline-block mr-1" /> {adminInfo.badge || "No Badge"}
                        </p>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p className="flex items-center gap-2"><FaEnvelope className="text-[#4CA3B8]" /> <strong>Email:</strong> {adminInfo.email || user.email}</p>
                        <p className="flex items-center gap-2"><FaCalendarAlt className="text-[#4CA3B8]" /> <strong>Joined:</strong> {moment(adminInfo.created_at).format('MMMM D, YYYY')}</p>
                    </div>

                    <div className="mt-8 flex flex-col space-y-4">
                        <button
                            onClick={() => { setIsEditingProfile(!isEditingProfile); setIsChangingPassword(false); }} 
                            className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e] w-full"
                        >
                            <FaEdit /> {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
                        </button>
                        <button
                            onClick={() => { setIsChangingPassword(!isChangingPassword); setIsEditingProfile(false); reset(); }} 
                            className="btn btn-outline btn-info hover:bg-[#4CA3B8] hover:text-white w-full"
                        >
                            <FaLock /> {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
                        </button>
                        <button
                            onClick={signOutUser}
                            className="btn btn-error text-white hover:bg-red-700 w-full"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

              
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
                    {isEditingProfile && (
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-3">Edit Profile</h3>
                            <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        {...register('name', { required: "Name is required" })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                                    <input
                                        type="file"
                                        {...register('image')}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    {uploadingImage && <p className="text-blue-500 text-xs mt-1"><FaSpinner className="animate-spin inline-block mr-1" /> Uploading image...</p>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditingProfile(false); reset({ name: adminInfo.name, email: user.email, image: null }); }} 
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e]"
                                        disabled={uploadingImage}
                                    >
                                        <FaCheckCircle /> Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isChangingPassword && (
                        <div>
                            <h3 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-3">Change Password</h3>
                            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        {...register('currentPassword', { required: "Current password is required" })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">New Password</label>
                                    <input
                                        type="password"
                                        {...register('newPassword', {
                                            required: "New password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                                message: "Password must have uppercase, lowercase, number and special character."
                                            }
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
                                </div>
                                <div>
                                    <label className="label block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        {...register('confirmPassword', {
                                            required: "Confirm password is required",
                                            validate: value => value === getValues('newPassword') || "Passwords do not match" 
                                        })}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => { setIsChangingPassword(false); reset(); }} 
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn bg-[#4CA3B8] text-white hover:bg-[#3b889e]"
                                    >
                                        <FaCheckCircle /> Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

              
                    {!isEditingProfile && !isChangingPassword && (
                        <div className="text-center py-12">
                            <FaCog className="text-6xl text-gray-400 mb-4 mx-auto" /> 
                            <h3 className="text-xl font-semibold text-gray-600 mb-4">
                                <FaInfoCircle className="inline-block mr-2 text-[#4CA3B8]" /> Manage Your Administrative Profile Settings
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Here you can **update your personal information**, **change your profile picture**, or **securely modify your password**. Utilize the options on the left to ensure your administrator account details are always current and protected.
                            </p>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                For security, remember to use a strong, unique password and consider updating it regularly.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;