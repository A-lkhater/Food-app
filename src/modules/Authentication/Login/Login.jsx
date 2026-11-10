import { useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login({ SaveLoginData }) {
    const [showPassword, setShowPassword] = useState(false);
    const navegate = useNavigate();
    let { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post("/Users/Login", data)
            // console.log(response.data.token)
            localStorage.setItem("token", response.data.token)
            SaveLoginData();
            toast.success("Login Success")
            navegate('/dashboard')
        } catch (error) {
            const errors = error.response?.data?.additionalInfo?.errors;

            if (errors) {
                Object.values(errors).flat().forEach((message) => {
                    toast.error(message);
                });
            } else {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            }
        }
    }
    return (
        <div>
            <div className="title">
                <h5>Log In</h5>
                <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-2">
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                    <input {...register("email", {
                        required: "Field is required",
                        pattern: {
                            value: /^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                            message: "Email is not valid"
                        }
                    })} type="email" placeholder='enter your email' className="form-control" aria-describedby="emailelpBlock" />
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                <div className="input-group">
                    <span className='input-group-text'>
                        <i className='fa fa-key'></i>
                    </span>
                    <input {...register("password", {
                        required: "Field is required",
                        pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d.*\d).*$/,
                            message: "password is not valid"
                        }
                    })} type={showPassword ? "text" : "password"} placeholder='enter your password' className="form-control" aria-describedby="passwordelpBlock" />
                    {showPassword ? <span className='input-group-text' style={{ cursor: "pointer" }}>
                        <i onClick={() => setShowPassword(false)} className='fa fa-eye text-muted'></i>
                    </span> : <span className='input-group-text'>
                        <i onClick={() => setShowPassword(true)} className='fa fa-eye-slash text-muted'></i>
                    </span>}
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                <div className="links d-flex justify-content-between my-3">
                    <Link to='/register' className='text-muted text-decoration-none'>
                        Register Now?
                    </Link>
                    <Link to='/forget-pass' className='text-success text-decoration-none'>
                        Forget Paasword?
                    </Link>
                </div>
                <button type='submit' className='btn btn-success w-100'>Login</button>
            </form>
        </div>
    )
}
