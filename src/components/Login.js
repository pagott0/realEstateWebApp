import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";


export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
   
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { currentUser, login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

       
        
        try {
            setLoading(true)
            setError("")
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
            

        }
        catch(err) {
            setError(`Failed to sign in, ${err}`)
        }

        setLoading(false)
    }



    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}> {/* form is the container of all inputs */}
                        <Form.Group id="email"> {/* form group is the container of one input*/}
                            <Form.Label>Email</Form.Label> {/* form label is the text */}
                            <Form.Control type="email" ref={emailRef} required/> {/* form control is the input */}  {/* ref is to controll the input, required to make require to answer */}
                        </Form.Group>

                        <Form.Group className="mb-4" id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-3">
                Ainda não possui uma conta? <Link to="/signup">Registrar</Link>
            </div>
            </div>
        </Container>
    )
}