import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/authSlice.js';
import Button from "../Button.jsx";
import Input from '../Input.jsx';
import Logo from "../Logo.jsx"
import { useDispatch } from 'react-redux';
import authServices from '../../appwrite/auth.js';
import { useForm } from 'react-hook-form';

function LoginComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState("");

    const loginHandler = async (data) => {
        setErrors("");
        console.log("data : ", data);
        
        try {
            const session = await authServices.login(data);
            if (session) {
                const userData = await authServices.getUserAccount();
                if (userData) {
                    dispatch(login(userData));
                    console.log("userdata in login : ", userData);

                }
                // navigate("/");
            }
        } catch (error) {
            setErrors(error.message);
        }
    }


    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-2xl text-center font-bold leading-tight"> Sign in to your acount </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
                <form onSubmit={handleSubmit(loginHandler)} className=' mt-8'>
                    <div className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent;
