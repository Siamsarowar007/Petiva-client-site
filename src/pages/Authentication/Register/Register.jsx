import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
    const { createUser , googleSignIn } = useAuth();
    const navigate = useNavigate();
    const [previewImg, setPreviewImg] = useState(null);

    console.log(createUser)


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password, photo } = data;
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error.message)
            })

        // try {
        //   const userCredential = await createUser(email, password);
        //   const user = userCredential.user;

        //   let photoURL = "";

        //   // 👉 Show preview locally (you can upload to Firebase Storage here)
        //   if (photo && photo.length > 0) {
        //     const file = photo[0];
        //     photoURL = URL.createObjectURL(file);
        //   }

        //   await updateProfile(user, {
        //     displayName: name,
        //     photoURL: photoURL || null,
        //   });

        //   navigate("/");
        // } catch (error) {
        //   console.error(error);
        // }
    };

    const handleGoogleSignIn = async () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                // navigate("/");
            })
            .catch(error => {
                console.error(error.message);
            })   

        // try {
        //   await googleSignIn();
        //   navigate("/");
        // } catch (err) {
        //   console.error(err.message);
        // }
    };

    // preview image when selected
    const photoFile = watch("photo");
    const showPreview = () => {
        if (photoFile && photoFile.length > 0) {
            const file = photoFile[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewImg(imageUrl);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md shadow-md bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Create An Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="input input-bordered w-full"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Your password"
                                className="input input-bordered w-full"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message:
                                            "Password must include uppercase, lowercase, number & special character",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Upload Profile Photo</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                                {...register("photo")}
                                onChange={showPreview}
                            />
                        </div>

                        {/* Photo Preview */}
                        {previewImg && (
                            <div className="mt-2">
                                <img
                                    src={previewImg}
                                    alt="Preview"
                                    className="w-20 h-20 rounded-full object-cover border"
                                />
                            </div>
                        )}

                        {/* Submit */}
                        <div className="form-control mt-4">
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full flex items-center gap-2"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    {/* Toggle to Login */}
                    <p className="text-center mt-4 text-sm">
                        Already have an account?{" "}
                        {/* <span
                            onClick={() => navigate("/join-us")}
                            className="text-blue-500 font-semibold cursor-pointer hover:underline"
                        >
                            Login
                        </span> */}
                        <Link to='/login'>
                            <span
                                onClick={() => navigate("/join-us")}
                                className="text-blue-500 font-semibold cursor-pointer hover:underline"
                            >
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
