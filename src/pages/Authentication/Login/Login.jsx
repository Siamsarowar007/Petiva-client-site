import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider"; // adjust as needed
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
 const { googleSignIn } = useAuth(); // Assuming you have a useAuth hook that provides googleSignIn
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
  };

  //   const onSubmit = async (data) => {
  //     try {
  //       await signIn(data.email, data.password);
  //       navigate("/");
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

    const handleGoogleSignIn = async () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                // navigate("/");
            })
            .catch(error => {
                console.error(error.message);
            })  

  //   const handleGoogleSignIn = async () => {
  //     try {
  //       await googleSignIn();
  //       navigate("/");
  //     } catch (err) {
  //       console.error(err.message);
  //     }
    };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-md  bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Please Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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


            {/* Submit */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary  w-full ">Login</button>
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

          {/* Toggle to Register */}
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            {/* <span
              onClick={() => navigate("/register")}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span> */}
            <Link to='/register'>
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
              >
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
