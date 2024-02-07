import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        img: '',
        city: '',
        phone: '',
        isAdmin: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await axios.post("http://localhost:8000/api/auth/register", formData);
            console.log('New user registered:', newUser.data);
            navigate("/login");
        } catch (err) {
            console.error('Registration failed:', err);
            // Handle error
        }
    };

    return (
        <div className="register">
            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="rContainer">
                    <div className="inputGroup">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="rInput"
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rInput"
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rInput"
                            required
                        />
                    </div>


                    <div className="inputGroup">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            placeholder="Enter your city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="rInput"
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="rInput"
                        />
                    </div>

                    <button type="submit" className="rButton">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};
