import  { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useContext(StoreContext);
    // Still loading user info
    if (loading) {
        return <div>Loading...</div>;
    }

    // Not logged in
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Not an admin
    if (currentUser.role !== "admin") {
        console.log("from admin route",currentUser)
        return <Navigate to="/" replace />;
    }
    console.log("from admin route",currentUser)

    return children;
};

export default AdminRoute;