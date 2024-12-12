import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            
            // Show success toast
            toast.success('Login successful!', {
                position: 'top-right',
            });

            // Log the token
            const token = res.data.token;
            console.log('Token:', token);

            // Store the token in localStorage
            localStorage.setItem('userToken', token);

            // Redirect to Dashboard
            navigate('/dashboard');
        } catch (error) {
            // Show error toast if login fails
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage, {
                position: 'top-right',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">

        {/* Add ToastContainer here to render toast notifications */}
        <ToastContainer />
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
