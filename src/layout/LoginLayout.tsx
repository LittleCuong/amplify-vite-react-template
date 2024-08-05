import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { signIn } from 'aws-amplify/auth';

// Logo & image
import background from '../assets/login-background.jpg';

function LoginLayout() {
    const emailRef = useRef<HTMLInputElement>(null);
    const emailErrorRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordErrorRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnChange = () => {
        if (emailErrorRef.current && passwordErrorRef.current !== null) {
            emailErrorRef.current.value = '';
            emailErrorRef.current.style.display = 'none';

            passwordErrorRef.current.value = '';
            passwordErrorRef.current.style.display = 'none';
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleSignIn();
    };

    // sign in function
    const handleSignIn = async () => {
        setIsLoading(true);
        let response = null;
        try {
            checkFormInput();
            if (emailRef.current?.value && passwordRef.current?.value) {
                response = await signIn({
                    username: emailRef.current.value,
                    password: passwordRef.current?.value,
                });
                response.isSignedIn && navigate('/dashboard/saving-chart');
            }
        } catch (error: any) {
            const trimmedMessage = error.message.trim();
            let errorMessage = 'An unknown error occurred';
            switch (trimmedMessage) {
                case 'Incorrect username or password.':
                    errorMessage = 'Incorrect username or password';
                    break;
                case 'User does not exist.':
                    errorMessage = 'User does not exist';
                    break;
                case 'There is already a signed in user.':
                    errorMessage = 'User already signed in';
                    break;
                case 'User is not confirmed.':
                    errorMessage = 'User is not confirmed';
                    break;
                default:
                    errorMessage = 'An unknown error occurred';
                    break;
            }
            if (passwordErrorRef.current !== null) {
                passwordErrorRef.current.value = errorMessage;
                passwordErrorRef.current.style.display = 'block';
            }
        } finally {
            setIsLoading(false);
        }
    };

    const checkFormInput = () => {
        if (emailErrorRef.current && passwordErrorRef.current !== null) {
            if (!emailRef.current?.value) {
                emailErrorRef.current.value = 'Email is missing';
                emailErrorRef.current.style.display = 'block';
                setIsLoading(false);
            }

            if (!passwordRef.current?.value) {
                passwordErrorRef.current.value = 'Password is missing';
                passwordErrorRef.current.style.display = 'block';
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <div
                className="relative w-1/2 h-full flex flex-col p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="h-2/6 flex flex-col gap-[8px] md:py-[32px] lg:py-[40px] xl:py-[48px] md:pl-[60px] lg:pl-[70px] xl:pl-[80px]">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-white">CNG Store - Gaming For Life</span>
                    </div>
                </div>
                <span className="mt-auto pb-[2%] font-inter font-normal text-center text-[12px] text-[#fff] leading-4">
                    Copyright 2024, CNG Store All Rights Reserved.
                </span>
            </div>
            <div className="w-1/2 h-full bg-white flex flex-col items-center justify-center md:pt-[32px] lg:pt-[40px] xl:pt-[48px] md:px-[90px] lg:px-[110px] xl:px-[130px]">
                <div className="w-full h-full flex flex-col items-center md:gap-[8px] lg:gap-[16px] xl:gap-[32px] 2xl:gap-[32px]">
                    <div className="md:w-[220px] lg:w-[230px] xl:w-[248px] lg:h-[110px] xl:h-[116px] flex flex-col gap-[6px] px-[16px] lg:pb-[20px] xl:pb-[24px] items-center justify-center border-solid border-b-[1px] border-[#E1E7FE]">
                        <span className="md:text-[16px] lg:text-[20px] xl:text-[24px] leading-[30px] font-semibold text-[#0F172A]">
                            CNG Store
                        </span>
                    </div>

                    <div className="w-full md:h-[52px] lg:h-[60px] xl:h-[68px] flex flex-col items-center lg:gap-[10px] xl:gap-[12px]">
                        <span className="font-medium md:text-[16px] lg:text-[20px] xl:text-[24px] leading-[32px] text-center">
                            Sign in
                        </span>
                        <span className="font-inter md:text-[8px] lg:text-[10px] xl:text-[16px] xl:leading-[24px] text-[#68768A]">
                            Sign in to your account to start using CNG Store
                        </span>
                    </div>
                    <form className="w-full flex flex-col items-center md:gap-[16px] lg:gap-[20px] xl:gap-[24px]">
                        <div className="w-full flex flex-col items-start gap-[16px]">
                            <div className="w-full flex flex-col items-start gap-[8px]">
                                <label className="font-inter font-medium md:text-[10px] lg:text-[12px] xl:text-[14px] text-left">
                                    Email
                                </label>
                                <input
                                    ref={emailRef}
                                    onChange={handleOnChange}
                                    className="w-full md:p-[8px] lg:p-[10px] xl:p-[12px] md:text-[10px] xl:text-[14px] border border-background-1 bg-transparent rounded outline-none"
                                    name="email"
                                    type="email"
                                    aria-describedby="email-error"
                                    placeholder="Type your email"
                                />
                                <input
                                    aria-label="email-error"
                                    ref={emailErrorRef}
                                    className="w-full md:text-[10px] xl:text-[14px] text-red-500 border-none bg-transparent outline-none"
                                    name="email-error"
                                    type="text"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="w-full flex flex-col items-start xl:*:gap-[8px]">
                                <label className="font-inter font-medium md:text-[10px] lg:text-[12px] xl:text-[14px] text-left">
                                    Password
                                </label>
                                <input
                                    ref={passwordRef}
                                    onChange={handleOnChange}
                                    className="w-full md:p-[8px] lg:p-[10px] xl:p-[12px] md:text-[10px] xl:text-[14px] border border-background-1 bg-transparent rounded outline-none"
                                    name="password"
                                    type="password"
                                    aria-describedby="password-error"
                                    placeholder="Type your password"
                                />
                                <input
                                    ref={passwordErrorRef}
                                    className="w-full md:text-[10px] xl:text-[14px] text-red-500 border-none bg-transparent outline-none"
                                    name="password-error"
                                    type="text"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="w-full justify-between">
                                <Link to={'/forgot-password'} className="hover:underline">
                                    <span className="block h-full md:text-[10px] lg:text-[12px] xl:text-[14px] font-inter leading-[24px] text-[#1E293B] font-medium">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-3/6 md:h-[28px] lg:h-[38px] xl:h-[48px] bg-primary md:py-2 xl:py-3 md:px-[38px] lg:px-[50px] xl:px-[60x] rounded-md cursor-pointer transition-all duration-300 hover:bg-[#531115]"
                        >
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <span className="block mr-4 h-full font-inter md:text-[10px] xl:text-sm md:leading-[6px] lg:leading-[14px] xl:leading-[24px] text-center text-white">
                                        Please wait
                                    </span>
                                    <span className="loading loading-spinner loading-md bg-white"></span>
                                </div>
                            ) : (
                                <span className="block h-full font-medium font-inter md:text-[10px] xl:text-sm md:leading-[14px] lg:leading-[14px] xl:leading-[24px] text-center text-white">
                                    Sign In
                                </span>
                            )}
                        </button>
                    </form>
                    <div className="w-full flex items-center justify-center">
                        <span className="font-inter md:text-[10px] lg:text-sm xl:text-sm font-normal uppercase">
                            Don't have an account?
                            <Link to="/sign-up">
                                <span className="font-inter md:text-[10px] lg:text-sm xl:text-sm font-medium uppercase">
                                    {' '}
                                    Sign Up
                                </span>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;
