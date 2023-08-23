import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
//import { getFunctions, httpsCalable} from "../firebase";
//import { httpsCalable, functions } from "../firebase";
import { httpsCallable } from "@firebase/functions";
import { functions } from "../config/firebase";




export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()

    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { signup, currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const createUserDocumentCall = httpsCallable(functions, "createUserDocumentCall")
        try {
            setLoading(true)
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value)
            console.log(currentUser, currentUser.displayName)
            await updateProfile(currentUser, { displayName: nameRef.current.value })
            navigate("/")
            await createUserDocumentCall({email: emailRef.current.value, name: nameRef.current.value, uid: currentUser.uid}).then(result => {
                console.log(result.data, "result data new user")
            })

        }
        catch(err) {
            setError(`Failed to create an account, ${err}`)
        }

        setLoading(false)
    }

    

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}> {/* form is the container of all inputs */}
                        <Form.Group id="email"> {/* form group is the container of one input*/}
                            <Form.Label>Email</Form.Label> {/* form label is the text */}
                            <Form.Control type="email" ref={emailRef} required/> {/* form control is the input */}  {/* ref is to controll the input, required to make require to answer */}
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Form.Group id="name" className="mb-4">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </>
    )
}