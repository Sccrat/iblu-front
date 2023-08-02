import { useState } from 'react'
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });

            // Assuming the backend responds with a JWT token
            const token = response.data.token;

            history("/listTask");
            console.log('Logged in! Token:', token);

            // Here you can redirect the user to another page or perform other actions
            // after successful login.
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (

        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Iblu</h2>
                                    <p className=" mb-5">Por favor ingrese su usuario y contraseña!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Usuario
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Usuario" id="username"
                                                    value={username}
                                                    onChange={handleUsernameChange} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                            >
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control type="password" placeholder="Contraseña" id="password"
                                                    value={password}
                                                    onChange={handlePasswordChange} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >

                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                No tienes una cuenta?{" "}
                                                <Link to="/register">Registrarse</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login
