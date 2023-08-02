import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const initState = { username: "", description: "", status: "" };

function UpdateTask() {
    const { taskId } = useParams();
    console.log(taskId);

    const [data, setData] = useState(initState);

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        const response = await axios.get(`http://localhost:3000/api/getTaskById/${taskId}`)
        console.log(response);
        const { data } = response;
        const { username, description, status } = data;
        setData((prevState) => ({ ...prevState, username, description, status }))
    }



    const history = useNavigate();

    const handleUsernameChange = (event: any) => {
        setData((prevState) => ({ ...prevState, username: event.target.value }))
    };

    const handleDescriptionChange = (event: any) => {
        setData((prevState) => ({ ...prevState, description: event.target.value }))
    };
    const handleStatusChange = (event: any) => {
        setData((prevState) => ({ ...prevState, status: event.target.value }))
    };

    const { username, description, status } = data;

    const handleSubmit = async (event: any) => {
        event.preventDefault();


        try {
            const response = await axios.put(`http://localhost:3000/api/updateTask/${taskId}`, {
                username,
                description,
                status
            });
            console.log(response.data);
            history("/listTask");
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">Actualizar Tareas</h2>
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
                                                    Actualizar
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

export default UpdateTask;