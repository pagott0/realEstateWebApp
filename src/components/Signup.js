import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
//import { getFunctions, httpsCalable} from "../firebase";
//import { httpsCalable, functions } from "../firebase";
import { httpsCallable } from "@firebase/functions";
import { functions } from "../config/firebase";
import { auth } from "../config/firebase";





export default function Signup() {
    const [nameState, setNameState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [passwordConfirmState, setConfirmPasswordState] = useState("");
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef = useRef()
    
    const navigate = useNavigate();
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(verification())
    
    
    const { signup, currentUser } = useAuth();
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        

        try {
            setLoading(true)
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value)
            console.log(currentUser, currentUser.displayName)

            await updateProfile(auth.currentUser, { displayName: nameRef.current.value })

            const createUserDocumentCall = httpsCallable(functions, "createUserDocumentCall")
            await createUserDocumentCall({email: emailRef.current.value, name: nameState, uid: auth.currentUser.uid}).then(result => {
                console.log(result.data, "result data new user")
            })
            navigate("/")

        }
        catch(err) {
            setError(`Failed to create an account, ${err}`)
        }
        

        setLoading(false)
    }

    function verification(){
        if(emailState && passwordState && passwordConfirmState && nameState)
            return false
        return true
    }

    useEffect(() => {
        setButtonStatus(verification())
    }, [emailRef.value, passwordRef.value, passwordConfirmRef.value, nameRef.value])
    

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Registrar</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}> {/* form is the container of all inputs */}
                        <Form.Group id="email"> {/* form group is the container of one input*/}
                            <Form.Label>Email</Form.Label> {/* form label is the text */}
                            <Form.Control type="email" value={emailState} onChange={e => setEmailState(e.target.value)} ref={emailRef} required/> {/* form control is the input */}  {/* ref is to controll the input, required to make require to answer */}
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control  value={passwordState} onChange={e => setPasswordState(e.target.value)} type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control value={passwordConfirmState} onChange={e => setConfirmPasswordState(e.target.value)} type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Form.Group id="name" className="mb-4">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" ref={nameRef} required onChange={(e) => (setNameState(e.target.value))}/>
                        </Form.Group>

                        <Button disabled={loading || verification()} className="w-100" type="submit">
                            Registrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Já possui uma conta? <Link to="/login">Log in</Link>
            </div>
            </div>
        </Container>
    )
}