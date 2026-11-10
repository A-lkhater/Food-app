import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Reset() {
    const navegate = useNavigate();
    let { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data)
            console.log(response.data.token)
            toast.success(response.data.message || "Success");
            navegate('/login')

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
        console.log(data)
    }
    return (
        <div>
            <div className="title">
                <h5> Reset  Password</h5>
                <span className='text-muted'> Please Enter Your Otp  or Check Your Inbox </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                    <input {...register("email", {
                        required: "Field is required",
                        pattern: {
                            value: /^[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                            message: "Email is not valid"
                        }
                    })} type="email" placeholder='Email' className="form-control" aria-describedby="emailelpBlock" />
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                <div className="input-group mb-3">
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                    <input {...register("seed", {
                        required: "Field is required",
                    })} type="otp" placeholder='OTP' className="form-control" aria-describedby="otpelpBlock" />

                </div>
                {errors.otp && <span className='text-danger'>{errors.otp.message}</span>}
                <div className="input-group mb-3">
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                    <input {...register("password", {
                        required: "Field is required",
                        pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d.*\d).*$/,
                            message: "password is not valid"
                        }
                    })} type="password" placeholder=' New Password' className="form-control" aria-describedby="passwordelpBlock" />

                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                <div className="input-group mb-3">
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                    <input {...register("confirmPassword", {
                        required: "Field is required",
                        pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d.*\d).*$/,
                            message: "password is not valid"
                        }
                    })} type="password" placeholder='Confirm New Password' className="form-control" aria-describedby="passwordelpBlock" />

                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                <button type='submit' className='btn btn-success w-100 mt-4'>Reset Password</button>
            </form>
        </div>
    )
}
