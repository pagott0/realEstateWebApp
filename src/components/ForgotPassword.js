import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";


export default function ForgotPassword() {

    const emailRef = useRef()

   
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const { currentUser, login, resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

       
        
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")

            

        }
        catch(err) {
            setError(`Failed to reset password, ${err}`)
        }

        setLoading(false)
    }



    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}> {/* form is the container of all inputs */}
                        <Form.Group id="email"> {/* form group is the container of one input*/}
                            <Form.Label>Email</Form.Label> {/* form label is the text */}
                            <Form.Control type="email" ref={emailRef} required/> {/* form control is the input */}  {/* ref is to controll the input, required to make require to answer */}
                        </Form.Group>

                        
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-3">
                Ainda não possui uma conta? <Link to="/signup">Registrar</Link>
            </div>
        </>
    )
}