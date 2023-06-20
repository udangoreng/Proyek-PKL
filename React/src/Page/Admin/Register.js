import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../App.css";
import { Toast } from 'bootstrap';

export default function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token == null) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    await axios.post(`http://127.0.0.1:8000/api/register`, data)
      .then((res) => {
        navigate('/');
        console.log(res);
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }



  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
        <div className="register p-5">
          <center><h4>Register</h4></center>
          <Form className="mx-4" style={{ width: '500px' }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name : </Form.Label>
              <Form.Control
                type="text"
                placeholder="admin"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email : </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password : </Form.Label>
              <Form.Control
                type="password"
                placeholder="admin"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button className="my-2" style={{ width: '100%' }} onClick={handleSubmit}>Register</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}