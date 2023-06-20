import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        await axios.post(`http://127.0.0.1:8000/api/login`, data)
            .then((res) => {
                navigate('/');
                localStorage.setItem('token', res.data.token);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data)
                console.log(email, password)
            });
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
                <div className="register p-5">
                    <center><h4>Login</h4></center>
                    <Form className="mx-4" style={{ width: '500px' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email : </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div>
                            <Button className="my-2" style={{ width: '100%' }} onClick={handleSubmit}>Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
