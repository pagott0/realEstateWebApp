import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Properties from './Properties'
import EachPropertie from './EachPropertie';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import PropertieDetail from './PropertieDetail';
import BoughtPage from './BoughtPage';


function App() {

  return (

      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={
                  <PrivateRoute>  
                    <EachPropertie />
                  </PrivateRoute>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/available-prop/:id" element={<PropertieDetail/>} />
                <Route path="/update-profile" element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>} />
                <Route path="/propertie-bought" element={<BoughtPage />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
        <Outlet />
      </Container>

  )
}
export default App;
