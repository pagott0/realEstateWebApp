import React, { useState, useEffect } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

//maybe paste this code in the Properties component

export default function EachPropertie() {

    const [propertiesCollection, setPropertiesCollection] = useState([]);
    const propertiesCollectionRef = collection(db, "properties")

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

    return(
        <div>
            {propertiesCollection.map((propertie)=>(
                <CardGroup>
                    <Link to={`bruno/${propertie.id}`}>
                     <Card >
                        <Card.Img variant="top" src="holder.js/100px160" />
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
                        <Button type="primary">Comprar</Button>
                    </Card>
                    </Link>
                </CardGroup>
            ))}
        </div>
    )
}