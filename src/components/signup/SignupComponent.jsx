import React, { useState } from 'react';
import authServices from '../../appwrite/auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';
import Input from '../Input.jsx';
import Logo from '../Logo.jsx';
import Button from '../Button.jsx';

function SignupComponent() {
    const { register, handleSubmit ,watch , formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [serverErrors, setServerErrors] = useState("");

    const password = watch("password");

    const handleSignup = async (data) => {
            console.log("i am hit",data);
        setServerErrors("");
        try {
            const createAccount = await authServices.createAcount(data);
            if (createAccount) {
                const userData = await authServices.getUserAccount();
                if (userData) dispatch(login(userData));
                navigate("/")

            }
        } catch (error) {
            console.log(error.message);
            
            setServerErrors(error.message)
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


                <h2 className="text-2xl text-center font-bold leading-tight"> sign up to create acount </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                {serverErrors && <p className="text-red-600 mt-8 text-center">{serverErrors}</p>}
                {errors.password && <p className="text-red-600 mt-8 text-center">{errors.password.message}</p>}
                {errors.confirmPassword && <p className="text-red-600 mt-8 text-center">{errors.confirmPassword.message}</p>}



                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="space-y-5">
                        <Input
                        label="Full name: "
                        placeholder="Enter full name"
                        {...register("name",{
                            required:true
                        })}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="Enter email"
                          {...register("email",{
                            required:true,
                          })}
                        />
                        <Input
                        type="password"
                        label="Password: "
                        placeholder="Enter password"
                        {...register("password", {
                            required: true,
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters long",
                            },
                            pattern: {
                              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                              message:
                                "Password must contain at least one number and one special character",
                            },
                          })}
                        />
                        <Input
                        type="password"
                        label="confirm password: "
                        placeholder="confirm password"
                        {
                            ...register('confirmPassword',{
                                required:"please confirm password ",
                                validate:(value)=>{
                                   return  value === password || "password must be same"
                                }
                            })
                        }
                        />
                        <Button
                        type='submit'
                        className='w-full'
                        >Signup</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupComponent
