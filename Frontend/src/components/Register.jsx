import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    // Handle change for form input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);

            // If registration is successful, show success toast
            toast.success('Registration successful!', {
                position: 'top-right',
            });

            // Redirect to Login page after 2 seconds
            setTimeout(() => navigate('/'), 2000); // Wait 2 seconds before redirecting
        } catch (error) {
            // Show error toast if registration fails
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage, {
                position: 'top-right',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 px-4">

        {/* Add ToastContainer here to render toasts */}
        <ToastContainer />
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full">
                <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/" className="text-teal-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
