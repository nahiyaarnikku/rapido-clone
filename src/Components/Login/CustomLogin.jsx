import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../App';
import { useNavigate } from 'react-router-dom';

function CustomLogin() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({});

    const navigate = useNavigate();

    // Validate email with regex
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validate password (example: minimum 6 characters)
    function validatePassword(password) {
        return password.length >= 6;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError({});
        if (!validateEmail(loginEmail)) {
            setError((prev) => ({ ...prev, email: 'Invalid email address' }));
            return
        }
        if (!validatePassword(loginPassword)) {
            setError((prev) => ({ ...prev, password: 'Password Should not be less than 5 characters' }));
            return
        }
        // Handle login logic
        try {
            let data = JSON.stringify({
                "email": loginEmail,
                "password": loginPassword
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: BaseUrl + '/api/users/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    if (response.data.result === 'Success') {
                        localStorage.setItem('token', response.data.message.token);
                        navigate('/customerhome');
                    }
                    if(response.data.result == 'Error'){
                        setError((prev) => ({...prev, apiResponse: response.data.message}));
                        return;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <section className="bg-transparent" style={{}}>
            <div className="d-flex flex-column align-items-center justify-content-center px-5 py-4 mx-auto" style={{ width: '500px' }}>
                <div className="w-100 bg-white rounded-3 shadow-sm border">
                    <div className="p-4">
                        <h1 className="fs-3 fw-bold text-dark">
                            Sign in to your account
                        </h1>
                        <form className="mt-4" action="#">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-dark">Your email</label>
                                <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="name@domain.com" required />
                                {error.email && <p className="text-danger">{error.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label text-dark">Password</label>
                                <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="form-control" required />
                                {error.password && <p className="text-danger">{error.password}</p>}
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <input onChange={(e) => setShowPassword(e.target.checked)} id="passwordToggle" type="checkbox" className="form-check-input me-2" style={{ cursor: 'pointer' }} />
                                    <label htmlFor="passwordToggle" className="form-check-label text-dark" style={{ cursor: 'pointer' }}>Show Password</label>
                            </div>
                                {/* <a href="#" className="text-decoration-none text-primary">Forgot password?</a> */}
                            </div>
                            <button onClick={(e) => handleSubmit(e)} type="submit" className="btn btn-primary w-100 mt-3">Sign in</button>
                            {error.apiResponse && <p className="text-danger">{error.apiResponse}</p>}
                            <p className="mt-3 text-center text-muted">
                                Don’t have an account yet? <a href="/customer-signup" className="text-primary">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomLogin