import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import bethmarLogo from '../assets/Logo/bethmar.png';

const Login = () => {
    return (
        <div className="md:h-[calc(100vh-7rem)] h-[calc(100vh-5rem)] w-full relative overflow-hidden bg-[#f9f9f9]">
            <div
                className="absolute inset-0 bg-cover bg-center md:static md:w-1/2"
                style={{ backgroundImage: `url('https://wearepantera.com/cdn/shop/files/Fondo_pantera.png?v=1708085407&width=2000')` }}
            />
            
            <div className="absolute inset-0 bg-black/50 md:hidden z-10" />
            
            <div className="relative z-20 flex flex-col md:flex-row md:h-[calc(100vh-7rem)] h-[calc(100vh-5rem)] w-full md:p-0 p-2">
                <div className="w-full md:w-1/2 h-full flex">
                    <div className="m-auto bg-white p-8 rounded-xl w-full max-w-md shadow-xl">
                        
                        <form className="space-y-5">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <label>
                                    <input type="checkbox" className="mr-2" />
                                    Remember me
                                </label>
                                <a href="#" className="hover:underline">Forgot password</a>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition">
                                    LOGIN
                                </button>
                                <button className="border border-gray-300 px-5 py-2 rounded-md hover:bg-gray-100 transition">
                                    SIGN UP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative"
                    style={{ backgroundImage: `url('https://wearepantera.com/cdn/shop/files/Fondo_pantera.png?v=1708085407&width=2000')` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md flex items-center justify-center flex-col gap-4 px-8 py-4">
                        <img src={bethmarLogo} className="w-48 bg-black p-2 rounded-xl" alt="logo" />
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-800 text-center">welcome back</h2>
                            <p className="text-gray-500 mt-1 text-center">
                                Thank you for getting back, please login to your account by filling this form:
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
