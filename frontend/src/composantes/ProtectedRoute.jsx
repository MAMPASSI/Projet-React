import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute ()
{
    const { estConnecte, chargement } = useAuth();

    if (chargement)
    {
        return <p>Chargement…</p>;
    }

    if(estConnecte)
    {
        return <Navigate to="/connexion" replace />;

    }

    return(
        <>
        <Outlet />
        
        </>
    )

}

export default ProtectedRoute