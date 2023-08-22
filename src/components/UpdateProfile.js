import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const { signup, currentUser, updateUserEmail, updateUserPassword } = useAuth();

    function handleSubmit(e) {
       e.preventDefault();

       if(passwordRef.current.value !== passwordConfirmRef.current.value) {
           return setError("Passwords do not match")
        }
        
        
        const promises = []
        setLoading(true)
        setError("")

        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if(passwordRef.current.value !== currentUser.password) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }
        promises.push(setMessage("Profile updated"))
        Promise.all(promises).then(() => {
            navigate("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(()=>{
            setLoading(false)
        })


    }



    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}> {/* form is the container of all inputs */}
                        <Form.Group id="email"> {/* form group is the container of one input*/}
                            <Form.Label>Email</Form.Label> {/* form label is the text */}
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/> {/* form control is the input */}  {/* ref is to controll the input, required to make require to answer */}
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep the same"/>
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel and go back to dashboard</Link>
            </div>
        </>
    )
}