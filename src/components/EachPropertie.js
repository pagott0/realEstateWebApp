import React, { useState, useEffect } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

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
        navigate(`/bruno/${id}`)
    }

    

    return(
        <div>
            <CardGroup>
            {propertiesCollection.map((propertie)=>(
                propertie.available && <div>
                     <Card onClick={() => handleDetails(propertie.id)}>
                        <Card.Img variant="top" src={propertie.imageUrl} style={{width: 400, height: 400}} />
                        <Card.Body>
                            <Card.Title>{propertie.title}</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </div>
            ))}
            </CardGroup>
        </div>
    )
}