import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { db } from "../config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { functions } from "../config/firebase";
import firebase from "firebase/compat/app";
import { httpsCallable } from "@firebase/functions";
import { FieldValue, increment } from "firebase/firestore";



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
        <div>
            <h1>{id}</h1>
            {documentData && <>
                <Card>
                    <Card.Img variant="top" src={documentData.imageUrl} />
                    <Card.Body>
                            <Card.Title>{documentData.title}</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                        
                    </Card.Body>
                </Card>
            </>}
            
            <Button type="primary" onClick={handleBack}>Voltar</Button>
            <Button type="primary" onClick={() => handleBuy(id, userInfo)}>Comprar</Button>
        </div>
    )
}