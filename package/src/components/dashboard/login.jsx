import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Check token

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        
      
        const response = await fetch(`${process.env.REACT_APP_API_URL}login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
      
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token); // Save the token in localStorage
          setIsAuthenticated(true); // Update authentication status
          window.location.href = '/'; // Redirect to home page after login
        } else {
          alert("Invalid credentials"); // Show error if login fails
        }
      };
    const loginContainerStyle = {
        width: '700px',
        margin: '0 auto',
        marginTop: '100px',
        padding: '150px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    };

    const headingStyle = {
        textAlign: 'center',
    };



    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const buttonDisabledStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#ccc',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'not-allowed',
    };

    const errorMessageStyle = {
        color: 'red',
        fontSize: '14px',
    };

    return (
        <div style={loginContainerStyle}>
            <h2 style={headingStyle}>Login to Admin Panel</h2>
            {error && <p style={errorMessageStyle}>{error}</p>}
            <form onSubmit={handleLogin} style={formStyle}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={loading ? buttonDisabledStyle : buttonStyle}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login