import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };
    const handleStatusChange = (event: any) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/createTask', {
                username,
                description,
                status
            });

            const token = response.data;
            console.log('Creado:', token);
            history("/listTask");

            // Here you can redirect the user to another page or perform other actions
            // after successful login.
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    return (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Crear Tareas</h2>
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
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control type="text" placeholder="Descripción" id="description"
                                                    value={description}
                                                    onChange={handleDescriptionChange} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                            >
                                                <Form.Label>Estado</Form.Label>
                                                <Form.Control type="text" placeholder="Estado" id="status"
                                                    value={status}
                                                    onChange={handleStatusChange} />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Guardar
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >

        </>
    );
}

export default CreateTask;