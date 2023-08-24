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
                {propertiesCollection.map((propertie) => (
                    <Col style={{marginTop:"20px"}}key={propertie.id} xs={12} md={4}>
                        {propertie.available && (
                            <div>
                                <Card className="card--style" onClick={() => handleDetails(propertie.id)}>
                                    <Card.Img
                                        variant="top"
                                        src={propertie.imageUrl}
                                        style={{ width: "100%", height: "200px" }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{propertie.title}</Card.Title>
                                        <Card.Text>{propertie.description}</Card.Text>

                                        <div className="property-details">
                                            <div className="property-detail">
                                                <FaBed />
                                                <Card.Text className="detail-text">{propertie.rooms}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <FaShower />
                                                <Card.Text className="detail-text">{propertie.bathrooms}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <FaCarAlt />
                                                <Card.Text className="detail-text">{propertie.carSlots}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <Card.Text ><small>{propertie.area}m2</small></Card.Text>
                                            </div>
                                        </div>

                                        <hr className="divider" />
                                        <Card.Text >
                                            {propertie.location}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted price-text">R$ {propertie.price ? propertie.price.toFixed(2) : "Indisponivel"}</small>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )}
                    </Col>
                ))}
            </Row>
        </Container>
    )
}