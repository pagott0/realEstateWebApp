import React from "react";

import { Navigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({children}) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />

} 