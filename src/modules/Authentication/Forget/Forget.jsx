import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Forget() {
    const navegate = useNavigate();
    let { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            let response = await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data)
            console.log(response.data.token)
            toast.success(response.data.message);
            navegate('/reset-pass')
        } catch (error) {
            console.log("error")
            toast.error(
                error.response?.data?.message || "Something went wrong")
        }
    }
    return (
        <div>
            <div className="title">
                <h5>Forgot Your Password?</h5>
                <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-5 mt-5">
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
                <button type='submit' className='btn btn-success w-100 mt-4'>Submit</button>
            </form>
        </div>
    )
}
