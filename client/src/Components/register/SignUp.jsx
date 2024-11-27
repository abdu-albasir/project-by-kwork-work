import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import axios from 'axios'; // Импорт Axios для работы с сервером
import '../styles/style.css';

const SignUp = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmailOrNickname, setLoginEmailOrNickname] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false); // Новая переменная для проверки подтверждения email

    const navigate = useNavigate();

    const handleSignInClick = () => {
        setIsSignUp(false);
        setMessage('');
    };

    const handleSignUpClick = () => {
        setIsSignUp(true);
        setMessage('');
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (nickname && email && password) {
            console.log({ email, password, nickname });  // Логируем данные перед отправкой
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    email,
                    password,
                    nickname,
                });
    
                // Обработка успешной регистрации
                setMessage('Code sent to email! Please check your inbox.');
                setIsVerified(false);
            } catch (error) {
                setMessage('Error during registration');
                console.error(error.response.data);  // Логируем ошибку
            }
        } else {
            alert('Please fill out all fields.');
        }
    };
    

const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/verify', {
            email,
            code: verificationCode,
        });
        if (response.data === 'Email verified') {
            setIsVerified(true);
            setMessage('Email verified successfully!');
            navigate('/main');
        } else {
            setMessage('Invalid code. Please try again.');
        }
    } catch (error) {
        console.error(error);
        setMessage('Error during verification');
    }
};


    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: loginEmailOrNickname,
                password: loginPassword,
            });
            if (response.data.token) {
                // Успешный вход
                localStorage.setItem('token', response.data.token);
                navigate('/main');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error during login');
        }
    };

    return (
        <div className="body">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                {message && <div className="message">{message}</div>}

                {/* Sign Up Form */}
                <div className="container__form container--signup">
                    <form onSubmit={handleSignUpSubmit} className="form" id="form1">
                        <h2 className="form__title">Sign Up</h2>
                        <input
                            type="text"
                            placeholder="Nickname"
                            className="input"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn">Sign Up</button>
                    </form>
                    {!isVerified && (
                        <form onSubmit={handleVerifyEmail} className="form">
                            <h2 className="form__title">Verify Your Email</h2>
                            <input
                                type="text"
                                placeholder="Enter Verification Code"
                                className="input"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button type="submit" className="btn">Verify</button>
                        </form>
                    )}
                </div>

                {/* Sign In Form */}
                <div className="container__form container--signin">
                    <form onSubmit={handleSignInSubmit} className="form" id="form2">
                        <h2 className="form__title">Sign In</h2>
                        <input
                            type="text"
                            placeholder="Email or Nickname"
                            className="input"
                            value={loginEmailOrNickname}
                            onChange={(e) => setLoginEmailOrNickname(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <a href="#" className="link">Forgot your password?</a>
                        <button type="submit" className="btn">Sign In</button>
                    </form>
                </div>

                {/* Overlay Panel */}
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
