// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import { ToastContainer } from 'react-toastify';
import './components/styles.css';
import VideosPage from './components/VideosPage';


const App = () => {
    return (
        <div>
        <ToastContainer /> {/* Move ToastContainer here for global access */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videos" element={<VideosPage />} />
            </Routes>
        </div>
    );
};

export default App;
