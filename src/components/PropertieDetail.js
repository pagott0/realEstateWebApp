import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { db } from "../config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { functions } from "../config/firebase";
import firebase from "firebase/compat/app";
import { httpsCallable } from "@firebase/functions";
import { FieldValue, increment } from "firebase/firestore";
import '../index.css'
import { FaBed, FaShower, FaCarAlt } from 'react-icons/fa';



export default function PropertieDetail() {
    const {id} = useParams()

    const navigate = useNavigate();

    function handleBack() {
        navigate("/")
    }

    function handleBuy(propertieId, userInfo) {
        const createOrder = httpsCallable(functions, "createOrder")
        createOrder({userInfo, id}).then(result => {
            console.log(result.data, "result data")
        })
       /*  updateDoc(doc(db, 'properties', propertieId), {
            available: false,
        }) */

        /* console.log("ID:", userInfo.id);
        updateDoc(doc(db, 'users', userInfo.id),{
            orders: increment(1),
        })

        .then(() => {
            console.log('Field updated successfully');
          })
          .catch((error) => {
            console.error('Error updating field:', error);
          });  */
        navigate("/propertie-bought")
    }

    const [userInfo, setUserInfo] = useState({})
    
    const [documentData, setDocumentData] = useState(null);

    React.useEffect( () => {
        async function fetchData() {
            try {

                const collectionRef = collection(db, "properties");
                const docRef = doc(db, "properties", id)
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())

                setUserInfo({
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    id: auth.currentUser.uid,

                }) 

                if(docSnap.exists) {
                    setDocumentData(docSnap.data())
                    console.log(docSnap.data().imageUrl)
                }
                else {
                    console.log("No such document")
                }
            } catch(err) {
                console.error(err)
            }
        }

        fetchData()

    }, [id])

    return(
        <>
            {documentData && <>
                <Image style={{width:"100%", height:"400px"}}fluid src={documentData.imageUrl}/>
                <Container>
                    <Row className="mt-5">
                        <Col>
                          <h1>
                                {documentData.title}
                            </h1>  
                        <p>
                            {documentData.description}
                            <hr />
                            {documentData.location}
                            <br />
                            <strong>
                            R$ {documentData.price ? documentData.price.toFixed(2) : "Indisponivel"}
                            </strong>
                            <div className="property-details">
                                            <div className="property-detail">
                                                <FaBed />
                                                <Card.Text className="detail-text">{documentData.rooms}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <FaShower />
                                                <Card.Text className="detail-text">{documentData.bathrooms}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <FaCarAlt />
                                                <Card.Text className="detail-text">{documentData.carSlots}</Card.Text>
                                            </div>
                                            <div className="property-detail">
                                                <Card.Text ><small>{documentData.area}m2</small></Card.Text>
                                            </div>
                                        </div>
                        </p>
                        </Col>
                    </Row>
                <Button style={{marginRight:"10px"}} type="primary" onClick={handleBack}>Voltar</Button>
                <Button variant="success" onClick={() => handleBuy(id, userInfo)}>Comprar</Button>
                </Container>
            </>}
            
        </>
    )
}