import React, { useState, useEffect } from "react";
import { Card, CardGroup, Button, Row, Col, Container } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import '../index.css'
import { FaBed, FaShower, FaCarAlt } from 'react-icons/fa';


//maybe paste this code in the Properties component

export default function EachPropertie() {

    const [propertiesCollection, setPropertiesCollection] = useState([]);
    const propertiesCollectionRef = collection(db, "properties")

    const navigate = useNavigate();

    const getPropertiesList = async() => {
        try {
            const data = await getDocs(propertiesCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log(filteredData)
            setPropertiesCollection(filteredData)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPropertiesList();
    }, [])

    function handleDetails(id) {
        navigate(`/available-prop/${id}`)
    }

    

    return(
        <Container>
            <Row>
                        {propertiesCollection.map((propertie)=>(
                        <Col xs={12} md={4} >
                        {propertie.available && <div>
                            <Card className="card--style" onClick={() => handleDetails(propertie.id)}>
                                <Card.Img variant="top" src={propertie.imageUrl} style={{width: "auto", height: 400}} />
                                <Card.Body>
                                    <Card.Title>{propertie.title}</Card.Title>
                                    <Card.Text>
                                       {propertie.description}
                                    </Card.Text>

                                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                        <div style={{display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center"}}>
                                            <FaBed style={{marginRight: "4px"}}/> 
                                            <Card.Text style={{fontWeight: "bold"}}>
                                            {propertie.rooms}
                                            </Card.Text>

                                        </div>
                                        <div style={{display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center"}}>
                                            <FaShower style={{marginRight: "4px"}}/> 
                                            <Card.Text style={{fontWeight: "bold"}}>
                                            {propertie.bathrooms}
                                            </Card.Text>

                                        </div>

                                        <div style={{display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center"}}>
                                            <FaCarAlt style={{marginRight: "4px"}}/> 
                                            <Card.Text style={{fontWeight: "bold"}}>
                                            {propertie.carSlots}
                                            </Card.Text>

                                        </div>

                                    </div>


                                    <hr style={{width: "100%"}}/>
                                    <Card.Text style={{fontWeight: "bold"}}>
                                       R$ {propertie.price ? propertie.price.toFixed(2) : "Indisponivel"}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </div>}
                    </Col>
                    ))}
                
            </Row>
        </Container>
    )
}