import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/ui/Loader";
import useAuth from './../hooks/useAuth';
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <Loader />
    }

    if (user && isAdmin) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default AdminRoute